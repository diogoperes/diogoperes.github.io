$(document).ready(function() {

  var elementWithScroll = '#sections';

  if (Math.round($(elementWithScroll).scrollTop()) > 100) {
    $('.nav').addClass('scrolled');
  }

  //verify section selected and update underline accordingly
  $(elementWithScroll).on('scroll', function() {
    checkSectionSelected();
    if (Math.round($(elementWithScroll).scrollTop()) > 100) {
      $('.nav').addClass('scrolled');
    } else {
      $('.nav').removeClass('scrolled');
    }
  });

  $("#nav-btn").click(clickHandler);

  var isMenuOpen = false;
  function clickHandler() {
    isMenuOpen = !isMenuOpen;
    if (isMenuOpen) {
      $('#nav').addClass('opened');
    } else {
      $('#nav').removeClass('opened');
    }

  }

  $(".nav-links   a").click(clickHandler);


  //   UNDELINE
  //nav underline
  var materialNav = $('.nav-inner');

  $(elementWithScroll).on('resize', function() {
    checkSectionSelected();
  });

  function setBorderWidth() {
    var itemWidth = materialNav.find('.active').width();
    $(".section-selected-border").css('width', itemWidth + 20);
  }

  function setLeftPosition() {
    // Calculate left position...
    var leftPosition = $(this).position().left;

    // And apply it as a translate function
    $(this)
      .parents('.nav-inner')
      .find(".section-selected-border")
      .css('left', leftPosition + 'px');
  }

  function checkSectionSelected() {
    if(window.innerWidth < 600) {
      return;
    }

    let sections = $('section');
    let previousSelected = $("a.active");

    for (var i = 0; i < sections.length; i++) {
      let sectionTop = $(sections[i]).position().top;
      let sectionBottom = sectionTop + $(sections[i]).height();
      // let userLookingPosition = $(elementWithScroll).scrollTop() + window.innerHeight / 2;
      // let userLookingPosition = (window.innerHeight * 2) / 3 ;
      let userLookingPosition = window.innerHeight / 2 + 50;
      //section with focus
      if (userLookingPosition >= sectionTop && userLookingPosition <= sectionBottom) {
        let aSelected = $("a[href='#" + $(sections[i])[0].id + "']");
        if (previousSelected !== aSelected) {
          previousSelected.removeClass('active');
          aSelected.addClass('active');
          setLeftPosition.apply(aSelected);
          setBorderWidth();
        }

      }

    }
  }

  // Initial setup

  checkSectionSelected();


});
