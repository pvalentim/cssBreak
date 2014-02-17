cssBreak.js
=======

A little script that runs in tandem with Modernizr to fire events
when certain media queries are entered and exited due to a window resize.

## Example
http://nicholasjohn.github.io/cssBreak/example/

## Dependencies:

This module depends on Modernizr **>=v2.6** (Media query test) and should use the [matchMedia](https://github.com/paulirish/matchMedia.js/) polyfill for IE9 support.

It is up to you to ensure this dependency exists. In the example, a
custom build of Modernizr only containing `mq()` is used.
You should do something better in production.

# Usage:

```js
// Initialise your breakpoints
breakCss.add('small', '(min-width: 500px)')
breakCss.add('medium', '(min-width: 800px)', true) // The third paramater here calls on IE

// Call your listeners
breakCss.on('enter:small', function () {
  // Do something for small screens here
})

breakCss.on('exit:small', function () {
  // Undo the setup for small screens here
})
```

# Licence
Licenced under the [New BSD License](http://opensource.org/licenses/bsd-license.php)
