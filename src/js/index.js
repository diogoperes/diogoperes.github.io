$(document).ready(function() {
  $('[data-toggle="popover"]').each(function () {
    var e = "";
    $(this).data("color") && (e = "popover-" + $(this).data("color")), $(this).popover({
      trigger: "focus",
      template: '<div class="popover ' + e + '" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
    })
  });
  $('[data-toggle="tooltip"]').tooltip();

  // Add smooth scrolling to all links
  $(".nav a").on('click', function(event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;
      var positionToScrollTo = ($('#sections').scrollTop() + $(hash).offset().top) - 50;
      if(positionToScrollTo < 0) positionToScrollTo = 0;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('#sections').animate({
        scrollTop: positionToScrollTo
      }, 800);
    } // End if
  });

});