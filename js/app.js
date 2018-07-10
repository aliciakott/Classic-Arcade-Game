
// Elements of our winner's modal window
const popUp = document.querySelector('.container');
const button = document.querySelector('#reset');

// Enemies our player must avoid
var Enemy = function(x, y, dx) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
// You should multiply any movement by the dt parameter
// which will ensure the game runs at the same speed for
// all computers
Enemy.prototype.update = function(dt) {
// When the enemy vehicles reach the end of the canvas
// They are recycled back into the canvas with a new y-coordinate
  if (this.x < canvas.width) {
      this.x += this.dx * dt;
    } else if (this.x >= canvas.width) {
      this.x = 0;
      this.y = 63 + (Math.floor(Math.random() * 3) * 83);
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
  Enemy.call(this, x, y);
  this.xMove = 101;
  this.yMove = 83;
  this.sprite = 'images/char-boy.png'
};

// This Object method moves the player back to starting position
Player.prototype.reset = function() {
  this.x = playerStartX;
  this.y = playerStartY;
}

// This Object method checks for collisions using the Pythagorean Theorem
// Once the distance between player and enemy objects is less than set value
// Player is moved back to starting point
// If player reaches water, winner screen is revealed
Player.prototype.update = function() {
  for (enemy of allEnemies) {
    const collisionCheck = Math.sqrt(Math.pow((player.x - enemy.x), 2) + Math.pow((player.y - enemy.y), 2));
    if (collisionCheck <= 75) {
      this.reset();
    }
  }

  if (this.y <= 25) {
    popUp.classList.remove('no-show');
  }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Object method handles the movement of player sprite
// With adjustments made for sprite dimensions
Player.prototype.handleInput = function(key) {
  if (key === "left" && this.x > 0) {
    this.x -= this.xMove;
  } else if (key === "up" && this.y > 25) {
    this.y -= this.yMove;
  } else if (key === "right" && this.x < (canvas.width - 150)) {
    this.x += this.xMove;
  } else if (key === "down" && this.y < (canvas.height - 225)) {
    this.y += this.yMove;
  }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const playerStartX = 202;
const playerStartY = 395;
const player = new Player(playerStartX, playerStartY);
const allEnemies = [];

// This function creates a set number of enemy vehicles (three)
// Generates a random y-coordinate and speed within a range, and
// Pushes them into the allEnemies array
function generateEnemies() {
  for (let i = 0; i < 3; i++) {
    let y = 63 + (Math.floor(Math.random() * 3) * 83);
    let dx = Math.floor((Math.random() * 300) + 200);
    allEnemies.push(new Enemy(0, y, dx));
  }
}

generateEnemies();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});

// This listens for button click on winner modal window and resets the game
button.addEventListener('click', function() {
  popUp.classList.add('no-show');
  player.reset();
  for (enemy of allEnemies) {
    enemy.x = 0;
    enemy.y = 63 + (Math.floor(Math.random() * 3) * 83);
  }
});

// Please note that the equation "63 + (Math.floor(Math.random() * 3) * 83)"
// is used several times in this file. It is not saved to a variable because
// a NEW random number is necessary each time, not the same random number
// saved to a variable.
