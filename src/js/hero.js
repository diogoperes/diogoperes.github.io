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

});