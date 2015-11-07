// ==========
// BIKE STUFF
// ==========

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


// A generic contructor which accepts an arbitrary descriptor object
function Bike(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);

    this.rememberResets();
};

Bike.prototype = new Entity();

Bike.prototype.bikeSize = 4;
Bike.prototype.speed = 1;
Bike.prototype.speedBoost = 1;
Bike.prototype.lives = 3;

Bike.prototype.rememberResets = function () {
    // Remember my reset positions
    this.reset_cx = this.cx;
    this.reset_cy = this.cy;
};

// HACKED-IN AUDIO (no preloading)
//Ship.prototype.warpSound = new Audio(
//    "sounds/WarpDriveActive.ogg"
//);


Bike.prototype._updateWarp = function (du) {

    var SHRINK_RATE = 3 / SECS_TO_NOMINALS;
    this._scale += this._scaleDirn * SHRINK_RATE * du;

    if (this._scale < 0.2) {

        this._moveToASafePlace();
        this.halt();
        this._scaleDirn = 1;

    } else if (this._scale > 1) {

        this._scale = 1;
        this._isWarping = false;

        // Reregister me from my old posistion
        // ...so that I can be collided with again
        spatialManager.register(this);

    }
};

Bike.prototype.update = function (du) {

    var speed = this.speed;

    // Check collisions
    if(this.isColliding(this.cx, this.cy)) {
      this.lives -= 1;
      TRON.resetGame(g_ctx);

      //End game if either players' lives reach 0
      if(this.lives === 0) main.gameOver();
    }

    if(eatKey(this.GO_UP) && this.yVel != speed) {
      this.xVel = 0;
      this.yVel = -speed;
    }

    if(eatKey(this.GO_DOWN) && this.yVel != -speed) {
      this.xVel = 0;
      this.yVel = speed;
    }

    if (keys[this.GO_LEFT] && this.xVel != speed) {
      this.xVel = -speed;
      this.yVel = 0;
    }

    if (keys[this.GO_RIGHT] && this.xVel != -speed) {
      this.xVel = speed;
      this.yVel = 0;
    }

    this.cx += this.xVel;
    this.cy += this.yVel;

};

Bike.prototype.computeThrustMag = function () {

    var thrust = 0;

    if (keys[this.KEY_THRUST]) {
        thrust += NOMINAL_THRUST;
    }
    if (keys[this.KEY_RETRO]) {
        thrust += NOMINAL_RETRO;
    }

    return thrust;
};

Bike.prototype.reset = function () {
    this.setPos(this.reset_cx, this.reset_cy);
    this.rotation = this.reset_rotation;

    this.halt();
};

Bike.prototype.halt = function () {
    this.velX = 0;
    this.velY = 0;
};

Bike.prototype.render = function (ctx) {
    ctx.fillStyle = this.Color;
    ctx.fillRect(this.cx, this.cy, this.bikeSize, this.bikeSize);  //Skoða halfwidth og halfheight hérna
};

// BIKE 1

var KEY_W = 'W'.charCodeAt(0);
var KEY_S = 'S'.charCodeAt(0);
var KEY_A = 'A'.charCodeAt(0);
var KEY_D = 'D'.charCodeAt(0);

var bike1 = new Bike({
    cx : 400,
    cy : 250,
    score : 0,
    xVel : -1,
    yVel : 0,
    Color : "#FF69B4",
    GO_UP   : KEY_W,
    GO_DOWN : KEY_S,
    GO_LEFT : KEY_A,
    GO_RIGHT : KEY_D
});

// BIKE 2

var KEY_I = 'I'.charCodeAt(0);
var KEY_K = 'K'.charCodeAt(0);
var KEY_J = 'J'.charCodeAt(0);
var KEY_L = 'L'.charCodeAt(0);

var bike2 = new Bike({
    cx : 200,
    cy : 250,
    score : 0,
    xVel : 1,
    yVel : 0,
    Color : "#00FFFF",
    GO_UP   : KEY_I,
    GO_DOWN : KEY_K,
    GO_LEFT : KEY_J,
    GO_RIGHT : KEY_L
});
