/*
 * Author: Nick Price & Ben Gourley
 * Build date: 17/2/14
 * Repository: http://github.com/nicholasjohn/break
 * Origin: http://github.com/bengourley/break
 */
(function () {

  var matchMedia = window.Modernizr.mq

  function cssBreak () {

    // Cache the window object and create
    // an empty list of breakpoints
    var $this = this
    this.breakPoints = []

    /*
     * Check if the breakpoints
     * match on window#resize
     */
    function checkActive() {
      for (var i = $this.breakPoints.length - 1; i >= 0; i--) {
        $this.breakPoints[i].check()
      }
    }

    /*
     * Setup window resize listener
     */
    window.onresize = checkActive
    setTimeout(checkActive,0)

  }






  /*
   * Construct a BreakPoint, given a name
   * and a media query.
   */
  function BreakPoint(name, media, isIe) {
    this.name = name
    this.media = media
    this.isIe = isIe
    this.matches = null
    this.init = false
    this.enterFn = []
    this.exitFn = []
  }

  /*
   * Runs through all functions associated
   * with a breakpoint#enter
   */
  BreakPoint.prototype.enter = function () {
    for (var i = 0; i < this.enterFn.length; i++) {
      this.enterFn[i]()
    }
  }

  /*
   * Runs through all functions associated
   * with a breakpoint#exit
   */
  BreakPoint.prototype.exit = function () {
    for (var i = 0; i < this.exitFn.length; i++) {
      this.exitFn[i]()
    }
  }

  /*
   * Check if the breakpoint's media query
   * matches the window's current state.
   * Trigger events on the window accordingly.
   */
  BreakPoint.prototype.check = function () {

    // Only run in browsers that support MQ
    if(!window.Modernizr.mq('only all')) return this
    if (!this.init && matchMedia(this.media)) {
      this.init = true
      this.enter()
    } else {

      if (this.matches === null) {
        if (matchMedia(this.media)) {
          this.enter()
          this.matches = true
        } else {
          this.exit()
          this.matches = false
        }
        return this

      } else if (matchMedia(this.media) && !this.matches) {
        this.enter()
        this.matches = true
        return this

      } else if (!matchMedia(this.media) && this.matches) {
        this.exit()
        this.matches = false
        return this
      }
    }

    return this

  }

  /*
   * Add a breakpoint
   */
  cssBreak.prototype.add = function(name, media, isIe) {
    this.breakPoints.push(new BreakPoint(name, media, isIe).check())
  }

  /*
   * Add function to correct media
   */
  cssBreak.prototype.on = function( media, fn ) {

    var mediaType = media.split(':')[0]
      , mediaName = media.split(':')[1]

    for (var i = this.breakPoints.length - 1; i >= 0; i--) {
      if (this.breakPoints[i].name === mediaName) {

        if ( !window.Modernizr.mq('only all') && this.breakPoints[i].isIe && mediaType === 'enter') {
          fn()
          return
        }
        this.breakPoints[i][mediaType+'Fn'].push(fn)

      }
    }
  }


  /*
   * Make public
   */
  window.cssBreak = new cssBreak()

}())