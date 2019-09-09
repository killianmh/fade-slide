// EXPLANATION:
// 1. load anime library in document head: <script src="js/anime.min.js"></script>
// 1. load anime library in document head
// 2. load intersection observer api polyfill: <script type="text/javascript" src="js/intersectionobserver.js"></script>
// 3. load this script (animation_observer.js)
// 4. use correct data attributes on element triggers; add content in child node which has data-animated attribute
// 5. data attributes and explanations:
//      -data-anim: script selects all elements with this attribute and uses them as triggers for intersection observer
//      -data-animated: child node that is being animated
//      -data-fade: duration of fade
//      -data-slide-from: direction element slides FROM
//      -data-slide-amount: how much element is offset (pixels)
//      -data-slide-speed: duration of slide
//      -data-threshold: custom threshold for intersection observer options
//      -data-anim-infinite: to be implemented later
// ==========================================================================


// variables
var animNodes;
var observers = [];

// array for holding anime settings for each animated element
var animations = [];

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

    // For each animated element, set initial state and add an animation object to the animations array
    Array.prototype.forEach.call(animNodes, function (element, index) {
        // create anime object which holds settings for animations to be called later in animate function; if wrapper element is a slide-in element, set initial state of child

        var animated = element.querySelectorAll("[data-animated]")[0];

        // hide elements first
        animated.style.opacity = "0";

        var animation = {
            targets: animated,
        }

        // Used in intersection observer to determine which animation object from animations array to do
        element.setAttribute("data-anim-num", index)

        // Get animation/fade settings from HTML data attributes
        var fade = element.getAttribute("data-fade");

        var delay = element.getAttribute("data-delay");

        var slideDir = element.getAttribute("data-slide-from");
        var slideAmount = element.getAttribute("data-slide-amount");
        var slideDuration = element.getAttribute("data-slide-speed");


        // Get threshold settings from data-attributes
        var threshold = element.getAttribute("data-threshold");


        if (fade) {
            animation.opacity = {
                value: 1,
                easing: "linear",
                duration: fade
            }
        }

        if (delay) {
            animation.delay = delay
        } else {
            animation.delay = "0"
        }

        if(threshold) {           
            var num = parseFloat(threshold);
            observerOptions.threshold = num;
        } else {
            observerOptions.threshold = defaultThreshold;
        }

        console.log(observerOptions)


        switch (slideDir) {
            case "top":
                // set initial state of child
                animated.style.transform = "translateY(" + (-1 * slideAmount) + "px)";

                // Set animation object
                animation.translateY = {
                    value: 0,
                    duration: slideDuration
                }

                break;
            case "right":
                // set initial state of child
                animated.style.transform = "translateX(" + slideAmount + "px)";

                // Set animation object
                animation.translateX = {
                    value: 0,
                    duration: slideDuration
                }

                break;
            case "bottom":
                // set initial state of child
                animated.style.transform = "translateY(" + slideAmount + "px)";

                // Set animation object
                animation.translateY = {
                    value: 0,
                    duration: slideDuration
                }

                break;
            case "left":
                // set initial state of child
                animated.style.transform = "translateX(" + (-1 * slideAmount) + "px)";

                // Set animation object
                animation.translateX = {
                    value: 0,
                    duration: slideDuration
                }

                break;
            default:
                // no slide animation so do not set animation object or initial state
                break;
        }

        // add animation object to array of animations
        animations.push(animation);

        // initialize intersection observer
        observers[index] = new IntersectionObserver(observerCallback, observerOptions);

        // observe wrapper element
        observers[index].observe(element);
    })

    console.log(animations)
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
            anime(animations[index]);

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