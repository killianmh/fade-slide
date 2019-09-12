# Fade-slide
Simple fade/slide animations using anime.js library and intersection observer API.

## About
This uses [anime.js](https://animejs.com/) and the [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) to animate elements when scrolled into the viewport. Currently, only translating and fading are supported, but it can easily be expanded to include other animation types.

## Usage
1. load anime library in document head: `<script src="js/anime.min.js"></script>`
2. load intersection observer api polyfill for IE support: `<script type="text/javascript" src="js/intersectionobserver.js"></script>`
3. load animation_observer script `<script src="js/animation_observer.js"></script>`
4. use correct data attributes on element triggers; add content in children nodes which have data-animated attribute
5. see https://animejs.com/ and https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API for documentation on these topics

##  Data attributes and explanations:
* data-anim: this attribute marks an element as a trigger for intersection observer; this element wraps the element which is actually animated
* data-animated: child node that is being animated
* data-delay: duration of animation delay (ms)
* data-fade: duration of fade (ms)
* data-slide-from: direction element translates FROM
* data-slide-amount: how much element is initially offset (pixels)
* data-slide-speed: duration of translation (ms)
* data-threshold: threshold for intersection observer options (decimal b/t 0.0 and 1.0); this determines the percentage of the trigger that must be visible before the animation is triggered
* data-stagger: delay between sibling animated elements (ms); use if all siblings will have same fade/animations; to stagger siblings with different animations or fades, use the data-delay attribute
* data-anim-infinite: not yet implemented
