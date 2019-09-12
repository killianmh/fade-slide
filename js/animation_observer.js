// EXPLANATION:
// 1. load anime library in document head: <script src="js/anime.min.js"></script>
// 2. load intersection observer api polyfill: <script type="text/javascript" src="js/intersectionobserver.js"></script>
// 3. load this script <script type="text/javascript" src="js/animation_observer.js"></script>
// 4. use correct data attributes on element triggers; add content in child node which has data-animated attribute
// 5. data attributes and explanations:
//      * data-anim: this attribute marks an element as a trigger for intersection observer; this element wraps the element which is actually animated
//      * data-animated: child node that is being animated
//      * data-threshold: threshold for intersection observer options (decimal b/t 0.0 and 1.0); this determines the percentage of the trigger that must be visible before the animation is triggered; if not specified, this script will use a default value
//      * data-stagger: tells script that children of this node will stagger their animations (ms); use if all siblings will have same fade/animations; for siblings with different animations or fades to stagger, animate them separately
//      * data-anim-infinite: not yet implemented
// 6. Add one animations array inside this script for each data-anim DOM node
//      -this array contains one or more objects which controls the animation of each data-animated DOM node; this object is passed to the anime function; for formatting, see https://animejs.com/documentation/#specificPropParameters
// 7. see https://animejs.com/ and https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API for more documentation
// ==========================================================================


// variables
var animNodes;
var observers = [];

var defaultDuration = 3000;
var defaultDelay = 0;


// <!---- EDIT THIS ARRAY ----!>
// array for holding anime settings for each animated element
var animationHolder = [{
    animations: [
        {
            duration: defaultDuration,
            delay: defaultDelay,
            opacity: {
                value: 1,
                easing: "linear"
            },
            translateX: {
                value: -500,
                duration: 2000
            }
        }
    ]
}, {
    animations: [
        {
            duration: defaultDuration,
            delay: defaultDelay,
            opacity: {
                value: 1,
                easing: "linear"
            },
            translateY: {
                value: -500,
                duration: 2000
            }
        }
    ]
}, {
    animations: [
        {
            duration: defaultDuration,
            delay: 0,
            opacity: {
                value: 1,
                easing: "linear"
            },
            translateY: {
                value: 200,
                duration: 2000
            }
        },
        {
            duration: defaultDuration,
            delay: 100,
            opacity: {
                value: 1,
                easing: "linear"
            },
            translateY: {
                value: 200,
                duration: 2000
            }
        },
        {
            duration: defaultDuration,
            delay: 200,
            opacity: {
                value: 1,
                easing: "linear"
            },
            translateY: {
                value: 200,
                duration: 2000
            }
        }
    ]
}, {
    animations: [
        {
            duration: defaultDuration,
            delay: anime.stagger(100),
            opacity: {
                value: 1,
                easing: "linear"
            },
            translateY: {
                value: -500,
                duration: 2000
            }
        }
    ]
},

];


// intersection observer settings
// default threshold set so 40% of element must be in viewport
// before element animates
var defaultThreshold = 0.4;

var observerOptions = {
    rootMargin: '0px',
    threshold: defaultThreshold
}

// init function
function init() {

    // find all animated element wrappers with data-anim attribute
    animNodes = document.querySelectorAll("[data-anim]");

    // For each animated element, set initial state based on animation object in animations array
    Array.prototype.forEach.call(animNodes, function (element, index) {
        // Add each child element as target for respective animation object
        var animated = element.querySelectorAll("[data-animated]");

        Array.prototype.forEach.call(animated, function(el, i){
            var animObj = animationHolder[index].animations[i];

            // check if using anime.js stagger functionality 
            var stagger = el.getAttribute("data-anim-stagger");
            
            if(stagger){
                // if using anime stagger, anime.js targets are grandchildren, not children of data-anim nodes
                var staggerItems = el.querySelectorAll("[data-anim-stagger-child]");
                animObj.targets = staggerItems;
            } else {
                // anime.js targets are children of data-anim nodes
                animObj.targets = el;
            }

            // set initial opacity
            if(animObj.hasOwnProperty("opacity")){
                if(stagger){
                    Array.prototype.forEach.call(staggerItems, function(item, num){
                        item.style.opacity = "0"
                    })
                } else {
                    el.style.opacity = "0";
                }
            }

            // set initial right/top properties (if more animations are desired, add the code to set initial states here)
            if(animObj.hasOwnProperty("translateX")) {
                var val = (-1 * animObj.translateX.value);

                if(stagger){
                    Array.prototype.forEach.call(staggerItems, function(item, num){
                        item.style.left = val + "px";
                    })
                } else {
                    el.style.left = val + "px";
                }
            }

            if(animObj.hasOwnProperty("translateY")) {
                var val = (-1 * animObj.translateY.value);

                if(stagger){
                    Array.prototype.forEach.call(staggerItems, function(item, num){
                        item.style.top = val + "px";
                    })
                } else {
                    el.style.top = val + "px";
                }
            }
        })
        console.log(animationHolder)

        // Used in intersection observer to determine which animation object from animations array to do
        element.setAttribute("data-anim-num", index)


        // Get threshold settings from data-attributes
        var threshold = element.getAttribute("data-threshold");

        if(threshold) {           
            var num = parseFloat(threshold);
            observerOptions.threshold = num;
        } else {
            observerOptions.threshold = defaultThreshold;
        }

        // initialize intersection observer
        observers[index] = new IntersectionObserver(observerCallback, observerOptions);

        // observe wrapper element
        observers[index].observe(element);
        
    })

    console.log(observers)

}

function observerCallback(entries, observer) {
    entries.forEach(function (entry) {
        var element = entry.target;

        // To be implemented later:
        var infinite = element.hasAttribute("data-anim-infinite") ? true : false;


        if (entry.isIntersecting) {
            console.log("in viewport")

            // get index of animation in animations array
            var index = parseInt(element.getAttribute("data-anim-num"));
            console.log(index)

            // run animation from corresponding animation objects in animations array
            var animArray = animationHolder[index].animations;
            Array.prototype.forEach.call(animArray, function (animation, i){
                anime(animation)
            })

            // unobserve element since animation is not infinite
            observer.unobserve(element);

        }
        else {
            if (infinite) {

            }
        }
    })
}



init();

