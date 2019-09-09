// EXPLANATION:
// 1. load anime library in document head: <script src="js/anime.min.js"></script>
// 1. load anime library in document head
// 2. load intersection observer api polyfill: <script type="text/javascript" src="js/intersectionobserver.js"></script>
// 3. load this script (animation_observer.js)
// 4. use correct data attributes on element triggers; add content in child nodes
// 5. data attributes and explanations:
//      -data-anim: script selects all elements with this attribute and uses them as triggers for intersection observer
//      -data-fade: duration of fade
//      -data-slide-from: direction element slides FROM
//      -data-slide-amount: how much element is offset (pixels)
//      -data-slide-speed: duration of slide
//      -data-anim-infinite: to be implemented later
// ==========================================================================


// variables
var animNodes;
var observer;

// array for holding anime settings for each animated element
var animations = [];

// intersection observer settings
// threshold set so 40% of element must be in viewport
// before element animates
var observerOptions = {
    rootMargin: '0px',
    threshold: 0.4
}

// init function
function init() {
    // initialize intersection observer
    observer = new IntersectionObserver(observerCallback, observerOptions);

    // find all animated element wrappers with data-anim attribute
    animNodes = document.querySelectorAll("[data-anim]");

    // For each animated element, set initial state and add an animation object to the animations array
    Array.prototype.forEach.call(animNodes, function (element, index) {
        // create anime object which holds settings for animations to be called later in animate function; if wrapper element is a slide-in element, set initial state of child

        var animated = element.getElementsByClassName("content")[0];

        var animation = {
            targets: animated,
        }

        // Used in intersection observer to determine which animation object from animations array to do
        element.setAttribute("data-anim-num", index)

        // Get animation/fade settings from HTML data attributes
        var fade = element.getAttribute("data-fade");

        var slideDir = element.getAttribute("data-slide-from");
        var slideAmount = element.getAttribute("data-slide-amount");
        var slideDuration = element.getAttribute("data-slide-speed");

        console.log(animated)

        if (fade) {
            animation.opacity = {
                value: 1,
                easing: "linear",
                duration: fade
            }
        }


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

        // observe wrapper element
        observer.observe(element);
    })

    console.log(animations)
}

function observerCallback(entries, observer) {
    entries.forEach(function (entry) {
        var element = entry.target;

        console.log(element)

        // To be implemented later:
        var infinite = element.hasAttribute("data-anim-infinite") ? true : false;


        if (entry.isIntersecting && entry.intersectionRatio >= 0.4) {
            console.log("in viewport")

            // get index of animation in animations array
            var index = parseInt(element.getAttribute("data-anim-num"));
            console.log(index)

            // run animation from corresponding animation objects in animations array
            anime(animations[index]);

        }
        else {
            if (infinite) {

            }
        }
    })
}



init();