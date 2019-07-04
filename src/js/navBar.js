$(document).ready(function() {
  if (Math.round($(window).scrollTop()) > 100) {
    $('.nav').addClass('scrolled');
  }

  //verify section selected and update underline accordingly
  $(window).on('scroll', function() {
    checkSectionSelected();
    if (Math.round($(window).scrollTop()) > 100) {
      $('.nav').addClass('scrolled');
    } else {
      $('.nav').removeClass('scrolled');
    }
  });

  $(window).on('resize', function() {
    checkSectionSelected();
  });


  //nav underline
  var materialNav = $('.nav-inner');

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

  materialNav.find('a').click(function(e) {
    if($('#nav-check').is(":checked")) {
      $('#nav-check').prop( "checked", false );
    }
  });

  function checkSectionSelected() {
    let sections = $('section');
    let previousSelected = $("a.active");

    for (var i = 0; i < sections.length; i++) {
      let sectionTop = $(sections[i]).position().top;
      let sectionBottom = sectionTop + $(sections[i]).height();
      let userLookingPosition = $(window).scrollTop() + window.innerHeight / 2;
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
