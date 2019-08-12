"use strict";

(function(){

  var Typewriter = function(el, opts) {

    this.element = document.getElementById(el);

    //default vars
    this.config = {
      words : '',
      loop  : false,
      speed : 50,
      delay_at_end     : 0,
      delete_type_diff : 0,
      pause_between_words_speed : 1000,
      //default vars
      loop_words : 0,
      txt : '',
      delete : false,
      deleted_word : false,
      end_of_words : false,
      pause_between_words : false
    };

    // initialize user input variables
    if( typeof opts !== 'undefined' || typeof opts != null) {

      for( var key in opts) {
        if(this.config.hasOwnProperty(key)){
          if (opts[key] !== undefined || opts[key] !== '') {

            if(opts[key] instanceof Array) {
              this.config[key] = opts[key];
            } else if(key === 'words' && typeof opts[key] === 'string' || opts[key] instanceof String) {
              this.config[key] = opts[key].split(",");
            } else {
              this.config[key] = opts[key];
            }
          }

          if(opts[key] === '') {
            this.config[key] = this.config[key];
          }
        }
      }
    }

    // start tick
    this.tick();
  };

  Typewriter.prototype.tick = function(){

    var i = this.config.loop_words % this.config.words.length;
    var full_word = this.config.words[i];

    //type or delete chars and check end cases
    typeChars(this, full_word);

    //call next tick
    next(this);

    //if end is reached and loop is disabled remove cursor
    removeCursor(this);

  };

  // typing/deleting chars
  function typeChars(self, word) {

    _updateText(self, word);

    _checkFullWordTyped(self, word);

    _checkDeletedWord(self);
  }

  // call next tick
  function next(self){
    // if the end of the word is not reached
    if ( !self.config.end_of_words && !self.config.pause_between_words ) {

      _nextTick(self);

    }

    // wait a bit before starting new word
    if( self.config.pause_between_words && self.config.loop_words !== self.config.words.length - 1 ) {

      setTimeout( function() {
        self.config.pause_between_words = false;

        _nextTick(self);

      }, self.config.pause_between_words_speed );

    }

    //if end of array is reached and loop is enabled and the last word is deleted
    if( self.config.end_of_words && self.config.loop && self.config.deleted_word ) {

      setTimeout( function () {
        self.config.end_of_words = false;
        self.config.pause_between_words = false;

        _delayEnd(self, true);

        _nextTick(self);

      }, self.config.pause_between_words_speed );
    }

  }

  // next tick
  function _nextTick(self) {
    setTimeout(function(){
      self.tick();
    }, self.config.speed);
  }

  // check if typing or deleting and update text
  function _updateText(self, word) {
    if(self.config.delete) {
      self.config.deleted_word = false;
      self.config.txt = word.substring(0, self.config.txt.length - 1); //delete chars
    } else {
      self.config.txt = word.substring(0, self.config.txt.length + 1); //add chars
    }
    self.element.innerHTML = self.config.txt; //add text to html element
  }

  // if typing word and the word is full
  function _checkFullWordTyped(self, word) {
    if(!self.config.delete && self.config.txt === word) {

      self.config.delete = true; //start deleting on next tick

      //faster when deleting
      _fasterDeleteThanType(self, true);

      self.config.pause_between_words = true; //pause before starting to delete on next tick

      // reach the last word
      if(word === self.config.words[self.config.words.length - 1]) {

        self.config.end_of_words = true;

        // if delay at end set true, return speed on typing
        _delayEnd(self, false);

      }
    }
  }

  //if it is deleting and it has deleted the last char
  function _checkDeletedWord(self) {

    if ( self.config.delete && self.config.txt === '' ) {

      self.config.delete = false; //start typing on next tick

      //slower when typing
      _fasterDeleteThanType(self, false);

      self.config.loop_words++; //count which word is the active one

      // reset loop_words if the last word is deleted
      _resetIfLastWord(self);

      self.config.deleted_word = true;
    }
  }

  //delay at end before starting again
  function _delayEnd(self, delay) {
    if ( delay ) {
      self.config.pause_between_words_speed -= self.config.delay_at_end;
    } else {
      self.config.pause_between_words_speed += self.config.delay_at_end;
    }
  }

  // if deleting increase speed, else decrease speed
  function _fasterDeleteThanType(self, op) {
    if ( op ) {
      self.config.speed -= self.config.delete_type_diff;
    } else {
      self.config.speed += self.config.delete_type_diff;
    }
  }

  // reset loop_words if the last word is deleted
  function _resetIfLastWord(self) {

    if(self.config.loop_words > self.config.words.length - 1) {
      self.config.loop_words = 0;
    }
  }

  // remove typewriter cursor if removeAtEnd class is added and the end of the words is reached
  function removeCursor(self) {
    if (self.config.end_of_words && !self.config.loop) {
      if(self.element.classList.contains('removeAtEnd')) {
        self.element.classList.remove('typewriter-cursor');
      }
    }
  }


  window.Typewriter = Typewriter;

})();