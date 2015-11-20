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
Bike.prototype.oldDir = undefined;
Bike.prototype.dir = undefined;
Bike.prototype.resetDir = undefined;
Bike.prototype.isABike = true;

// All possible directions
Bike.prototype.directions = [
    { x : 0, y : -1, dir : "U"}, // UP
    { x : 0, y : 1, dir : "D"}, // DOWN
    { x : -1, y : 0, dir : "L"}, // LEFT
    { x : 1, y : 0, dir : "R"} // RIGHT
];

Bike.prototype.rememberResets = function () {
    // Remember my reset positions
    this.reset_x = this.x;
    this.reset_y = this.y;
    this.reset_velX = this.xVel;
    this.reset_velY = this.yVel;
    this.reset_gridPos = this.gridPos;
};

// Set next random direction which is available
Bike.prototype.randomDirection = function(currX, currY) {
    // Shuffle directions array to get more random choices of direction
    this.directions = util.shuffle(this.directions);

    for(var direction in this.directions) {
        var dirX = this.directions[direction].x;
        var dirY = this.directions[direction].y;
        if(!this.isColliding(dirX + currX, dirY + currY)) {
            this.xVel = dirX;
            this.yVel = dirY;
            this.dir = this.directions[direction].dir;
            return;
        }
    }
},

Bike.prototype.updateBot = function(du, currX, currY) {
    if(!this.bot)
        return;

    var nextGX = currX + this.xVel;
    var nextGY = currY + this.yVel;

    // If current direction is not available, find other direction
    if(this.isColliding(nextGX, nextGY)) {
        this.randomDirection(currX, currY);
    }
    else {
        // At certain odds set random direction
        if(Math.random() < 0.005) {
            this.randomDirection(currX, currY);
        }
    }
};

Bike.prototype.update = function (du) {

    if(g_haltBikes) return;

    if (this.tail === [] && playmode !== 3) {
        this.appendTail(this.gridPos);
        spatialManager.getReserveGridPos(this.id,this.x,this.y);
    }

    this.oldDir = this.dir;  // Current direction is now old direction
    var oldGridPos;
    var speed = this.speed;

    if (this.bot) oldGridPos = this.gridPos;
    this.updateBot(du, this.gridPos.x, this.gridPos.y);

    var curr_yVel = this.yVel;
    var curr_xVel = this.xVel;

    // if(eatKey(this.GO_UP) && curr_yVel != speed && !this.bot) {
    //   this.xVel = 0;
    //   this.yVel = -speed;
    //   this.dir = "U";
    // }

    // else if(eatKey(this.GO_DOWN) && curr_yVel != -speed && !this.bot) {
    //   this.xVel = 0;
    //   this.yVel = speed;
    //   this.dir = "D";
    // }

    if(keys[this.GO_UP] && curr_yVel != speed && !this.bot) {
      this.xVel = 0;
      this.yVel = -speed;
      this.dir = "U";
    }

    if(keys[this.GO_DOWN] && curr_yVel != -speed && !this.bot) {
      this.xVel = 0;
      this.yVel = speed;
      this.dir = "D";
    }

    if (keys[this.GO_LEFT] && curr_xVel != speed && !this.bot) {
      this.xVel = -speed;
      this.yVel = 0;
      this.dir = "L";
    }

    if (keys[this.GO_RIGHT] && curr_xVel != -speed && !this.bot) {
      this.xVel = speed;
      this.yVel = 0;
      this.dir = "R";
    }

    var nextGX = this.gridPos.x + this.xVel;
    var nextGY = this.gridPos.y + this.yVel;

    var nextX = spatialManager.getPosInPixels(nextGX,nextGY).x;
    var nextY = spatialManager.getPosInPixels(nextGX,nextGY).y;

    if (this.isColliding(nextGX,nextGY))
    {
        this.lives -= 1;

    	fx("boom");
		var tems = "player numer "+ this.id + " lost";
		gametextcolector.push(tems);

        if(this.lives === 0) {
            g_startNewGame = true;

			if ( playmode !=4 ) {
                round12=1;
	            main.gameOver(this.id);
            }
            else {
                if(this.id!=1)
                {
                	//check if player 1 lost or won
                    levelnow++;

                    if(levelnow!=(maxlevel+1)) {
                        textlevel = levelnow;
                        entityManager.resetBikes();
                    }
                    else {
                        //player has won the the game in gamemode 4
                        //add some code here
                    }
                }
                else {
                    //player has lost in gamemode 4
                    levelnow = 1;
                    textlevel = 1;
                    main.gameOver(this.id);
                    g_scoreInput = true;
                }
            }
        }
        else {
            round12++;
            g_continueGame = true;
            return resetGame(g_ctx);
        }
        return;
    };

    if (!this.bot) oldGridPos = this.gridPos;  // I'm not a bot, really!
    this.gridPos = spatialManager.getReserveGridPos(this.id,nextX,nextY);
    if (playmode !== 3) {
        this.appendTail(oldGridPos);
    }

    this.x = nextX;
    this.y = nextY;

};

Bike.prototype.reset = function () {
    this.setPos(this.reset_x, this.reset_y);
    this.setVel(this.reset_velX, this.reset_velY);
    this.resetGridPos(this.reset_gridPos);
    this.oldDir = this.resetDir;
    this.dir = this.resetDir;
    this.tail = [];
};

Bike.prototype.resetLives = function () {
    this.lives = 3;
};

Bike.prototype.halt = function () {
    this.velX = 0;
    this.velY = 0;
};

Bike.prototype.appendTail = function (oldPos) {
    var lineBX = oldPos.x,
        lineBY = oldPos.y,
        lineEX = this.gridPos.x,
        lineEY = this.gridPos.y;

    if (this.tail.length === 0) {
        this.tail.push({begX : lineBX, begY : lineBY,
                        endX : lineEX, endY : lineEY, dir : this.oldDir});
    } else {
        if (this.oldDir === this.dir) {
            this.tail[this.tail.length-1].endX = this.gridPos.x;
            this.tail[this.tail.length-1].endY = this.gridPos.y;
        } else {
            this.tail.push({begX : this.gridPos.x, begY : this.gridPos.y,
                            endX : this.gridPos.x, endY : this.gridPos.y,
                            dir : this.dir});
        }
    }
};

Bike.prototype.render = function (ctx) {
    ctx.fillStyle = this.Color;

    drawlives(this.lives, this.livePos, this.Color);

    var x, y;

    // Draws the tail
    if (this.tail.length !== 0) {
        var bx, by, ex, ey;  // Beginnings and ends of lines
        var len, height;
        var T;
        for(var i = 0; i < this.tail.length; ++i) {
            T = this.tail[i];

            bx = spatialManager.getPosInPixels(T.begX,T.begY).x;
            by = spatialManager.getPosInPixels(T.begX,T.begY).y;

            ex = spatialManager.getPosInPixels(T.endX,T.endY).x;
            ey = spatialManager.getPosInPixels(T.endX,T.endY).y;

            if (T.dir === "L" || T.dir === "U") {
                bx = bx + g_bikeWidthHeight;
                by = by + g_bikeWidthHeight;
            } else {
                ex = ex + g_bikeWidthHeight;
                ey = ey + g_bikeWidthHeight;
            }

            len = ex - bx;
            height = ey - by;

            ctx.fillRect(bx, by, len, height);

        }
    }

    x = spatialManager.getPosInPixels(this.gridPos.x,this.gridPos.y).x;
    y = spatialManager.getPosInPixels(this.gridPos.x,this.gridPos.y).y;
    ctx.fillRect(x, y, this.bikeSize, this.bikeSize);
};

Bike.prototype.isColliding = function(nextX,nextY) {
    return !spatialManager.isAvailable(nextX,nextY);
};
