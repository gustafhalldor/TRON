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

Bike.prototype.bikeSize = g_bikeWidthHeight;
Bike.prototype.speed = 1;
Bike.prototype.speedBoost = 1;
Bike.prototype.lives = 3;
Bike.prototype.tail = [];


Bike.prototype.rememberResets = function () {
    // Remember my reset positions
    this.reset_x = this.x;
    this.reset_y = this.y;
};


Bike.prototype.update = function (du) {

    var speed = this.speed;

    /*
    // Check collisions
    if(this.isColliding(this.x, this.y)) {
      this.lives -= 1;
      TRON.resetGame(g_ctx);

      //End game if either players' lives reach 0
      if(this.lives === 0) main.gameOver();
    }
    */

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


    var nextGX = this.gridPos.x + this.xVel;
    var nextGY = this.gridPos.y + this.yVel;

    var nextX = spatialManager.getPosInPixels(nextGX,nextGY).x;
    var nextY = spatialManager.getPosInPixels(nextGX,nextGY).y;

    if (!spatialManager.isAvailable(nextGX,nextGY)) {
        return this.crash();
    };

    this.tail.push(this.gridPos);

    this.gridPos = spatialManager.getReserveGridPos(this.id,nextX,nextY);

    this.x = nextX;
    this.y = nextY;

};

Bike.prototype.reset = function () {
    this.setPos(this.reset_x, this.reset_y);
    this.rotation = this.reset_rotation;

    this.halt();
};

Bike.prototype.halt = function () {
    this.velX = 0;
    this.velY = 0;
};

Bike.prototype.render = function (ctx) {
    ctx.fillStyle = this.Color;

    var x, y;

    /*
    // Draws the tail
    if (this.tail.length !== 0) {
        for(var i = 0; i < this.tail.length; ++i) {
            x = spatialManager.getPosInPixels(this.tail[i].x,this.tail[i].y).x;
            y = spatialManager.getPosInPixels(this.tail[i].x,this.tail[i].y).y;

            ctx.fillRect(x, y, this.bikeSize, this.bikeSize);
        }
    }
    */

    x = spatialManager.getPosInPixels(this.gridPos.x,this.gridPos.y).x;
    y = spatialManager.getPosInPixels(this.gridPos.x,this.gridPos.y).y;
    ctx.fillRect(x, y, this.bikeSize, this.bikeSize);  //Skoða halfwidth og halfheight hérna
};

Bike.prototype.isColliding = function(nextX,nextY) {
    return !spatialManager.isAvailable(nextX,nextY);
};

Bike.prototype.crash = function() {
    return entityManager.KILL_ME_NOW;
};
