# Fade-slide
Simple fade/slide animations using anime.js library and intersection observer API.

## About
This uses [anime.js](https://animejs.com/) and the [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) to animate elements when scrolled into the viewport. Currently, only translating and fading are implemented, but it can easily be expanded to include other animation types.

## Usage
1. load anime library in document head: `<script src="js/anime.min.js"></script>`
2. load intersection observer api polyfill for IE support: `<script type="text/javascript" src="js/intersectionobserver.js"></script>`
3. load animation_observer script `<script src="js/animation_observer.js"></script>`
4. use correct data attributes on element triggers and animated children
5. content should be placed inside elements with data-animated attributes
6. add one animations array inside animationHolder array for each data-anim DOM node (each animations array contains one or more objects which controls the animation of each data-animated DOM node; this object is passed to the anime function; for formatting, see https://animejs.com/documentation/#specificPropParameters )
7. see https://animejs.com/ and https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API for documentation on these topics

##  Data attributes and explanations:
* data-anim: this attribute marks an element as a trigger for intersection observer; this element wraps the element which is actually animated
* data-animated: child node that is being animated
* data-threshold: threshold for intersection observer options (decimal b/t 0.0 and 1.0); this determines the percentage of the trigger that must be visible before the animation is triggered; if not specified, this script will use a default value
* data-anim-stagger: tells script that children of this node will stagger their animations (measured in milliseconds); use this if all animated children will have same fade/animations; for children with different animations or fades to stagger, animate them separately and specify delays in the animations array
* data-anim-infinite: not yet implemented
