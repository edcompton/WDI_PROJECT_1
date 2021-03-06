/*
PHASE 1 SCOPE

1. Create a game board with placeholder divs for the character, floor, underfloor and object. Game board needs to be smaller than the screen as created objects will be hidden to the right hand side of the screen. They can then be 'scrolled' into the game div.
- the game div will be smaller than the game content div to allow for images to be scrolled from one right hand margin to the left hand margin.

2. Get objects moving across the screen from right to left.
- There is a method of randomly assigning objects to 'show' based on a random number to travel from right to left at a set pace across the background div.
- You can increment the position of a div 'cactus' object a tiny amount every time, which when sped up will give a smooth movement effect. You can then perform the collision check function after every incremented move of the object on the right hand side.
- yet to decide on the best method of moving objects along the bottom of a div...margin?

ANIMATE({top: 0, left: -1000}, {5000, step: function(){}});

For the jump

ANIMATE({arguments for where it's going to}, {5000, complete: function(){}});

3. Get character to jump up on key up
- The character belongs to the background div, allowing you to assign it a value of 0 on the y axis of where it is. On the key down for the up arrow the character will travel a certain number of pixels up the y axis before returning for the same amount of time.

4. When character hits one of the oncoming objects get the game to reset.
- create divs which are rectangles that will enclose the character and the objects
- Then based on the respective positioning of the top, bottom, right and left sides of each div, you will be able to work out if they do NOT touch.
- THIS FUNCTION WILL BE THE BASIS ON WHICH THE REST OF THE GAME'S FUNCTIONALITY RUNS.
- As long as the collision function returns false after every increment of the object across the screen, the game will continue to run, else it will cause game over.


5. Create a method of randomising which sequence objects appear in from the right hand side of the screen

6. Build into the function that randomises the sequence of the objects a method of incrementing the speed with which the objects appear and travel

7. Find an 8bit character animation for the character, along with an 8bit background gif and floor items that can be moved to give the illusion of animation.

8. Create start button that is clicked to kick off the game

9. Create a score counter and a way of logging high scrores

10. On collision with an object, create a number of overlayed items that specify that the game has ended, what the score of the player was, and what the high score was

11. Add a backing track and html5 sounds for when certain scores are reached

12. Create a way of pausing the game

END OF PHASE 1 SCOPE



PHASE 2 (ADDITIONAL) SCOPE

1. Create new, more difficult objects for the character to beat after a certain high score is reached.
- These will appear in sequence with the original items but will be birds that appear at different heights to keep the player on their toes

2. Create a break in the game when the above level is reached, with a flashing notification to let the player know when this is.

3. Create a way of incrementing the player jump size based on how long the up key is pressed for.
*/
//

//


var Game = Game || {};

Game.init = function init() {
  this.$character   = $('#character');
  this.$board       = $('.gameBoard');
  this.$body        = $('body');
  this.$startButton = $('#start');
  Game.$scoreBoard  = $('#scoreBoard');
  Game.$highScore   = $('#highScore');
  Game.scoreCounter = 0;
  Game.gameOver     = false;
  Game.difficulty   = 0;
  Game.$overlays    = $('.images');
  Game.$preGame     = $('#pregameText');

  Game.startGame();
};

Game.startGame = function() {
  this.characterJump();
  this.$startButton.on('click', this.start.bind(this));
};



Game.start = function start() {
  Game.gameOver = false;
  this.$board.css('background-image', 'url("http://68.media.tumblr.com/297bca135cc211b869c1a659664e46b9/tumblr_nsqazrgxAY1rnfgtmo4_500.gif")');
  Game.$preGame.fadeOut(1000);
  this.$startButton.hide();
  Game.$overlays.attr('src', '');
  this.$character.attr('src', 'http://rs535.pbsrc.com/albums/ee355/Fikriy/megaman1.gif~c200');
  console.log('clicked');
  Game.$scoreBoard = $('#scoreBoard');
  Game.scoreInterval = setInterval(function() {
    Game.$scoreBoard.text(Game.scoreCounter++);
  }, 100);
  Game.seconds = 2000;
  Game.levelsInterval = setInterval(this.whichLevel.bind(this), 3000);
};

Game.whichLevel = function() {
  clearInterval(Game.objectsInterval);
  if (Game.scoreCounter < 200 && Game.gameOver === false) {
    console.log('level1');
    Game.objectsInterval = setInterval(this.createRandObject.bind(this), Game.seconds);
  } else if (Game.scoreCounter > 200 && Game.scoreCounter < 250){
    Game.nextLevel();
    setTimeout(function(){
      Game.$board.css('background-image', 'url("http://i.imgur.com/pnztT1T.gif")');
    }, 3000);
  } else if (Game.scoreCounter > 200 && Game.scoreCounter < 400) {
    Game.seconds = 1750;
    Game.objectsInterval = setInterval(this.createRandObject.bind(this), Game.seconds);
    console.log('level2');
  } else if (Game.scoreCounter > 400 && Game.scoreCounter < 450) {
    Game.nextLevel();
    setTimeout(function(){
      Game.$board.css('background-image', 'url("https://i2.wp.com/33.media.tumblr.com/91268f51edbe017edac635157a1c333d/tumblr_nlaq8aGXw61qze3hdo1_500.gif?zoom=2&resize=500%2C291")');
    }, 3000);
  } else if (Game.scoreCounter > 400 && Game.scoreCounter < 600) {
    Game.seconds = 1500;
    Game.objectsInterval = setInterval(this.createRandObject.bind(this), Game.seconds);
    console.log('level3');
  } else if (Game.scoreCounter > 600 && Game.scoreCounter < 650) {
    Game.nextLevel();
    setTimeout(function(){
      Game.$board.css('background-image', 'url("https://s-media-cache-ak0.pinimg.com/originals/7b/46/64/7b4664b2578397f260b13cf6a2d63743.gif")');
    }, 3000);
  } else if (Game.scoreCounter > 600 && Game.scoreCounter < 800) {
    Game.seconds = 1250;
    Game.objectsInterval = setInterval(this.createRandObject.bind(this), Game.seconds);
    console.log('level4');
  } else if (Game.scoreCounter > 800 && Game.scoreCounter < 850) {
    Game.nextLevel();
    setTimeout(function(){
      Game.$board.css('background-image', 'url("http://66.media.tumblr.com/74453230389e099d7d3f38f38efc643b/tumblr_o7mcf1ecFk1unbtf2o1_500.gif")');
    }, 3000);
  } else if (Game.scoreCounter > 800) {
    Game.seconds = 1250;
    Game.objectsInterval = setInterval(this.createRandObject.bind(this), Game.seconds);
    console.log('level5');
  }
};

Game.nextLevel = function() {
  this.$board.css('background-image', 'url("http://68.media.tumblr.com/c27cccacc0d0da6ecf3058bfda281d31/tumblr_ni1df4G2CW1s4fz4bo1_r4_500.gif")');
  setTimeout(function(){
    Game.$overlays.attr('src', 'https://static1.squarespace.com/static/52057cf8e4b00fb5186eec70/t/5519f9fee4b0972a5616c3b8/1427765760440/level-up.gif?format=1000w');
  }, 1000);
  Game.$overlays.attr('id', 'levelUp');
  setTimeout(Game.clearImg, 2000);
};

Game.clearImg = function() {
  Game.$overlays.attr('src', '');
  Game.$overlays.attr('id', '');
};

Game.characterJump = function () {
  this.$body.keydown(function(e){
    if (e.keyCode === 38) return Game.jumpAction();
  });
};

Game.jumpAction = function () {
  setTimeout(($('#character').attr('src', 'http://i42.tinypic.com/hrd3bc.png'), 2000));
  var audio = new Audio('../Audio/jump.wav');
  audio.play();
  Game.$character.animate({ bottom: '180px' }, {
    duration: 300,
    complete: function() {
      Game.$character.animate({ bottom: '0px' }, { duration: 400 });
      setTimeout(($('#character').attr('src', 'http://rs535.pbsrc.com/albums/ee355/Fikriy/megaman1.gif~c200'), 2000));
    }
  });

};

Game.chooseObjectType = function chooseObjectType() {
  var objectTypes = {
    box: {
      width: '100px',
      height: '70px',
      id: 'box',
      class: 'object'
    },
    wall: {
      width: '70px',
      height: '100px',
      id: 'wall',
      class: 'object'
    },
    mushroom: {
      width: '60px',
      height: '60px',
      id: 'mushroom',
      class: 'object'
    },
    bear: {
      width: '90px',
      height: '60px',
      id: 'bear',
      class: 'object'
    },
    owl: {
      width: '100px',
      height: '100px',
      id: 'owl',
      class: 'flying'
    },
    jetpack: {
      width: '100px',
      height: '100px',
      id: 'jetpack',
      class: 'flying'
    }
  };
  var randomIndex = Math.floor(Math.random() * Object.keys(objectTypes).length);
  var randomKey   = Object.keys(objectTypes)[randomIndex];
  return objectTypes[randomKey];
};


Game.createRandObject = function () {
  if (Game.gameOver === false) {
    var $object = $('<div></div>');
    var objectType = this.chooseObjectType();
    $object.css('height', objectType.height);
    $object.css('width', objectType.width);
    $object.addClass(objectType.class);
    $object.attr('id', objectType.id);
    this.$board.append($object);
    if ($object.hasClass('object')) {
      $object.animate({ bottom: '0px', left: '-200px'}, {
        duration: Game.seconds,
        step: Game.collisionCheck,
        complete: function () {
          this.remove();
        }
      });
    } else if ($object.hasClass('flying')) {
      $object.animate({ bottom: '100px', left: '-200px'}, {
        duration: Game.seconds,
        step: Game.collisionCheck,
        complete: function () {
          this.remove();
        }
      });
    }
  }
};

Game.collisionCheck = function () {
  var obstacle  = Game.getPositions($(this));
  var character = Game.getPositions(Game.$character);

  if (obstacle.right > character.left && obstacle.left < character.right && obstacle.top < character.bottom && obstacle.bottom > character.top) {
    $(this).remove();
    clearInterval(Game.objectsInterval);
    clearInterval(Game.levelsInterval);
    clearInterval(Game.scoreInterval);
    Game.over();
    Game.gameOverAudio();
    Game.gameOver = true;
  }
};

Game.gameOverAudio = function() {
  document.getElementById('soundTrack').pause();
  $('#wapWap').on('ended', function(){
    document.getElementById('soundTrack').play();
  });
  document.getElementById('wapWap').play();
};

Game.getPositions = function getPositions($elem) {
  return {
    top: $elem.offset().top,
    left: $elem.offset().left,
    right: Number($elem.offset().left) + Number($elem.width()),
    bottom: Number($elem.offset().top) + Number($elem.height())
  };
};

Game.over = function() {
  console.log('game over');
  if ((parseFloat(Game.$scoreBoard.text())) > (parseFloat(Game.$highScore.text()))) {
    Game.$highScore.html(Game.$scoreBoard.text());
  }
  console.log(Game.$highScore.html());
  Game.$scoreBoard.html('0');
  Game.scoreCounter = 0;
  Game.$overlays.attr('src', 'http://vignette4.wikia.nocookie.net/fnaf-world-rpg/images/f/f5/GameOver.gif/revision/latest?cb=20160124234844');
  this.$character.attr('src', 'http://giffiles.alphacoders.com/124/12434.gif');
  this.$board.css('background-image', 'url("http://68.media.tumblr.com/297bca135cc211b869c1a659664e46b9/tumblr_nsqazrgxAY1rnfgtmo4_500.gif")');
  this.$startButton.show();
};

$(Game.init.bind(Game));
