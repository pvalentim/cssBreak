cssBreak.js
=======

A little script that runs in tandem with Modernizr to fire events
when certain media queries are entered and exited due to a window resize.

## Example
http://nicholasjohn.github.io/cssBreak/example/

## Dependencies:

This module depends on a [matchMedia polyfill](https://github.com/paulirish/matchMedia.js/) for IE9 support.
It is up to you to ensure this dependency exists. In the example, the script is contained within a IE9 conditional.

# Usage:

Initialise breakpoints using `cssBreak.add( '#mq', 'cssMediaQuery' /*, isIe */ )` :
```js
cssBreak.add('small', '(min-width: 500px)')
cssBreak.add('medium', '(min-width: 800px)', true)
```

Call listeners using `cssBreak.on( 'enter:#mq', callback )` or `cssBreak.on( 'exit:#mq', callback )` :
```js
cssBreak.on('enter:small', function () {
  // Do something for small screens here
})

cssBreak.on('exit:small', function () {
  // Undo the setup for small screens here
})
```

# Licence
Licenced under the [New BSD License](http://opensource.org/licenses/bsd-license.php)
