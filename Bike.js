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
    { x : 0, y : -1}, // UP
    { x : 0, y : 1}, // DOWN
    { x : -1, y : 0}, // LEFT
    { x : 1, y : 0} // RIGHT
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
        if(spatialManager.isAvailable(dirX + currX, dirY + currY)) {
            this.xVel = dirX;
            this.yVel = dirY;
            break;
        }
    }
},

Bike.prototype.updateBot = function(du, currX, currY) {
    if(!this.bot)
        return;

    var nextGX = currX + this.xVel;
    var nextGY = currY + this.yVel;

    // If current direction is not available, find other direction
    if(!spatialManager.isAvailable(nextGX, nextGY)) {
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

    if (this.isColliding(nextGX,nextGY))
    {
        this.lives -= 1;

  			fx("boom");
  			var tems = "player numer "+ this.id + " lost";
  			gametextcolector.push(tems);

        if(this.lives === 0)
        {
            g_startNewGame = true;

			      if(playmode!=4){
			          round12=1;
		            main.gameOver(this.id);
	          }

            //if this is "level play" mode
				    else
            {
                if(this.id!=1)
                {	//check if player 1 lost or won
            				levelnow++;
  				          if(levelnow!=(maxlevel+1))
                    {
                        textlevel = levelnow;
                        entityManager.resetBikes();
  				          }

                    else
                    {  //player has won the the game in gamemode 4
  				             //add some code here
  				          }
  				      }

                else
                {
  				            //player has lost in gamemode 4
                      levelnow = 1;
  				            main.gameOver(this.id);
  				      //      alert(scorecalculate(levelnow));//tímabundið þanngatill verður búin til kóði til að birta
  				      }
				    }
        }

        else
        {
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
