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

// All possible directions
Bike.prototype.directions = [
    { x : 0, y : -1},
    { x : 0, y : 1},
    { x : -1, y : 0},
    { x : 1, y : 0}
];

Bike.prototype.rememberResets = function () {
    // Remember my reset positions
    this.reset_x = this.x;
    this.reset_y = this.y;
    this.reset_velX = this.xVel;
    this.reset_velY = this.yVel;
    this.reset_gridPos = this.gridPos;
};

Bike.prototype.updateBot = function(du, currX, currY) {
    if(!this.bot)
        return;

    // Shuffle directions array to get more random choices of direction
    this.directions = util.shuffle(this.directions);

    var nextGX = currX + this.xVel;
    var nextGY = currY + this.yVel;

    // If current direction is not available, find other direction
    if(!spatialManager.isAvailable(nextGX, nextGY)) {
        for(var direction in this.directions) {
            var dirX = this.directions[direction].x;
            var dirY = this.directions[direction].y;

            // Find next available direction from the directions array
            if(spatialManager.isAvailable(dirX + currX, dirY + currY)) {
                this.xVel = dirX;
                this.yVel = dirY;
                break;
            }
        }
    }
};

Bike.prototype.update = function (du) {

    if(g_haltBikes) return;

    this.updateBot(du, this.gridPos.x, this.gridPos.y);

    var speed = this.speed;

    if(eatKey(this.GO_UP) && this.yVel != speed && !this.bot) {
      this.xVel = 0;
      this.yVel = -speed;
    }

    if(eatKey(this.GO_DOWN) && this.yVel != -speed && !this.bot) {
      this.xVel = 0;
      this.yVel = speed;
    }

    if (keys[this.GO_LEFT] && this.xVel != speed && !this.bot) {
      this.xVel = -speed;
      this.yVel = 0;
    }

    if (keys[this.GO_RIGHT] && this.xVel != -speed && !this.bot) {
      this.xVel = speed;
      this.yVel = 0;
    }


    var nextGX = this.gridPos.x + this.xVel;
    var nextGY = this.gridPos.y + this.yVel;

    var nextX = spatialManager.getPosInPixels(nextGX,nextGY).x;
    var nextY = spatialManager.getPosInPixels(nextGX,nextGY).y;

    if (this.isColliding(nextGX,nextGY)) {
        this.lives -= 1;

		  //  alert(this.id + " "+this.lives);
			fx("boom");
			var tems = "player numer "+ this.id + " lost";
			gametextcolector.push(tems);

        if(this.lives === 0) {
            g_startNewGame = true;
			      round12=1;
		        main.gameOver(this.id);
        }
		    else {
			      round12++;
            g_continueGame = true;
            return resetGame(g_ctx);
        }
    };

    this.tail.push(this.gridPos);

    this.gridPos = spatialManager.getReserveGridPos(this.id,nextX,nextY);

    this.x = nextX;
    this.y = nextY;

};

Bike.prototype.reset = function () {
    this.setPos(this.reset_x, this.reset_y);
    this.setVel(this.reset_velX, this.reset_velY);
    this.resetGridPos(this.reset_gridPos);
    this.tail = [];
};

Bike.prototype.resetLives = function () {
    this.lives = 3;
};

Bike.prototype.halt = function () {
    this.velX = 0;
    this.velY = 0;
};

Bike.prototype.render = function (ctx) {
    ctx.fillStyle = this.Color;

    drawlives(this.lives, this.livePos, this.Color);

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
