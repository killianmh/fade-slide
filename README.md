# fade-slide
Simple fade/slide animations using intersection observer API.

## About
This uses [anime.js](https://animejs.com/) and the [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) to animate elements when scrolled into the viewport. Currently, only translating and fading are supported, but it can easily be expanded to include other animation types.

## Usage
1. load anime library in document head: `<script src="js/anime.min.js"></script>`
2. load intersection observer api polyfill for IE support: `<script type="text/javascript" src="js/intersectionobserver.js"></script>`
3. load this script `<script src="js/animation_observer.js"></script>`
4. use correct data attributes on element triggers; add content in children nodes which have data-animated attribute

##  data attributes and explanations:
* data-anim: script selects all elements with this attribute and uses them as triggers for intersection observer
* data-animated: child node that is being animated
* data-delay: duration of animation delay (ms)
* data-fade: duration of fade (ms)
* data-slide-from: direction element slides FROM
* data-slide-amount: how much element is offset (pixels)
* data-slide-speed: duration of slide (ms)
* data-threshold: custom threshold for intersection observer options (decimal b/t 0.0 and 1.0)
* data-anim-infinite: to be implemented later
