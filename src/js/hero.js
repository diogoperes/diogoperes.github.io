$(document).ready(function() {
  var speed = 70;
  var pausebetweenWords = 500;

  new Typewriter('welcomePhrase', {
    words: 'Hello World',
    speed : speed
  });

  setTimeout(() => new Typewriter('myName', {
    words: 'I\'m Diogo Peres',
    speed : speed
  }), (speed * 10) + pausebetweenWords)

  setTimeout(() => new Typewriter('myFunction', {
    words: ['Web Developer', 'Game Enthusiast', 'Music Lover'],
    speed : 100,
    loop  : true,
    delay_at_end : 3000,
    delete_type_diff : 70,
    pause_between_words_speed: 1500
  }), (speed * 23) + pausebetweenWords * 2)

  $('[data-toggle="popover"]').each(function () {
    var e = "";
    $(this).data("color") && (e = "popover-" + $(this).data("color")), $(this).popover({
      trigger: "focus",
      template: '<div class="popover ' + e + '" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
    })
  });
  $('[data-toggle="tooltip"]').tooltip();

});