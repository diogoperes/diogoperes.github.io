jQuery(function($) {

  var supportsTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints;

  if(!!supportsTouch) {
    var $removeAnimations = $('.dontAnimateOnTouch');
    $removeAnimations.css("animation", "none");
    $removeAnimations.removeClass('animatable').addClass('animated');
    console.log('oiadosaid')

    $('body').addClass('touchDevice');

  }

  // Function which adds the 'animated' class to any '.animatable' in view
  var doAnimations = function() {

    // Calc current offset and get all animatables
    var offset = $(window).scrollTop() + $(window).height(),
        $animatables = $('.animatable');

    // Unbind scroll handler if we have no animatables
    if ($animatables.length == 0) {
      $(window).off('scroll', doAnimations);
    }

    // Check all animatables and animate them if necessary
		$animatables.each(function(i) {
		  var $animatable = $(this);
		  var innerWidth = window.innerWidth;
      var heightToAppear;
		  if(innerWidth < 770) {
        heightToAppear = $animatable.height() / 2;
      }else {
        heightToAppear = $animatable.height();
      }

			if (($animatable.offset().top + heightToAppear - 20) < offset) {
        $animatable.removeClass('animatable').addClass('animated');
			}
    });

	};

  // Hook doAnimations on scroll, and trigger a scroll
	$(window).on('scroll', doAnimations);

  //optimize scroll
  // var waiting = false, endScrollHandle;
  // $(window).scroll(function () {
  //   if (waiting) {
  //     return;
  //   }
  //   waiting = true;
  //
  //   // clear previous scheduled endScrollHandle
  //   clearTimeout(endScrollHandle);
  //
  //   doAnimations();
  //
  //   setTimeout(function () {
  //     waiting = false;
  //   }, 100);
  //
  //   // schedule an extra execution of scroll() after 200ms
  //   // in case the scrolling stops in next 100ms
  //   endScrollHandle = setTimeout(function () {
  //     doAnimations();
  //   }, 200);
  // });


  $(window).trigger('scroll');

});
