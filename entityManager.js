/*

entityManager.js

We create this module as a single global object, and initialise it
with suitable 'data' and 'methods'.

"Private" properties are denoted by an underscore prefix convention.

*/


"use strict";


// Tell jslint not to complain about my use of underscore prefixes (nomen),
// my flattening of some indentation (white), or my use of incr/decr ops
// (plusplus).
//
/*jslint nomen: true, white: true, plusplus: true*/


var entityManager = {

// "PRIVATE" DATA

_bikes  : [],
_powerups : [],

// "PRIVATE" METHODS

_forEachOf: function(aCategory, fn) {
    for (var i = 0; i < aCategory.length; ++i) {
        fn.call(aCategory[i]);
    }
},

// PUBLIC METHODS

// A special return value, used by other objects,
// to request the blessed release of death!
//
KILL_ME_NOW : -1,

// Some things must be deferred until after initial construction
// i.e. thing which need `this` to be defined.
//
deferredSetup : function () {
    this._categories = [this._bikes,this._powerups];
},

init: function() {

    if(playmode === 4)
    {
        var genbott = false;

        var nextlv = getnextlv();
        var i=0;

        while(i!=nextlv[0].level.numerofplayer)
        {
            i++;
            if(i === 2)
            {
                genbott=true;
            }

            this.generateBike({
                id : i,
                x : nextlv[0].xy[(i-1)].x,
                y : nextlv[0].xy[(i-1)].y,
                gridPos : spatialManager.getReserveGridPos(1,nextlv[0].xy[(i-1)].x,nextlv[0].xy[(i-1)].y),
                score : 0,
                xVel : 1,
                yVel : 0,
                oldDir : "R",
                dir : "R",
                resetDir : "R",
                tail : [],
          		livePos : 15*i,
                Color :  nextlv[0].color[(i-1)].cl,
                GO_UP    : util.keyCode("W"),
                GO_DOWN  : util.keyCode("S"),
                GO_LEFT  : util.keyCode("A"),
                GO_RIGHT : util.keyCode("D"),
                bot: genbott
            });
        }
    }

	if(playmode === 1){
        this.generateBike({
            id : 1,
            x : 200,
            y : 250,
            gridPos : spatialManager.getReserveGridPos(1,200,250),
            livePos : 20,
            score : 0,
            xVel : 1,
            yVel : 0,
            oldDir : "R",
            dir : "R",
            resetDir : "R",
            tail : [],
            Color : "#FF69B4",
            GO_UP    : util.keyCode("W"),
            GO_DOWN  : util.keyCode("S"),
            GO_LEFT  : util.keyCode("A"),
            GO_RIGHT : util.keyCode("D"),
            bot: false
        });

        this.generateBike({
            id : 2,
            x : 400,
            y : 250,
            gridPos : spatialManager.getReserveGridPos(2,400,250),
            livePos : 40,
            score : 0,
            xVel : -1,
            yVel : 0,
            oldDir : "L",
            dir : "L",
            resetDir : "L",
            tail : [],
            Color : "#00FFFF",
            GO_UP    : util.keyCode("I"),
            GO_DOWN  : util.keyCode("K"),
            GO_LEFT  : util.keyCode("J"),
            GO_RIGHT : util.keyCode("L"),
            bot: false
        });

	}

	if(playmode === 2){
        this.generateBike({
            id : 1,
            x : 200,
            y : 250,
            gridPos : spatialManager.getReserveGridPos(1,200,250),
            livePos : 20,
            score : 0,
            xVel : 1,
            yVel : 0,
            oldDir : "R",
            dir : "R",
            resetDir : "R",
            tail : [],
            Color : "#FF69B4",
            GO_UP    : util.keyCode("W"),
            GO_DOWN  : util.keyCode("S"),
            GO_LEFT  : util.keyCode("A"),
            GO_RIGHT : util.keyCode("D"),
            bot: false
        });

        this.generateBike({
            id : 2,
            x : 400,
            y : 250,
            gridPos : spatialManager.getReserveGridPos(2,400,250),
            livePos : 40,
            score : 0,
            xVel : -1,
            yVel : 0,
            oldDir : "L",
            dir : "L",
            resetDir : "L",
            tail : [],
            Color : "#00FFFF",
            GO_UP    : util.keyCode("I"),
            GO_DOWN  : util.keyCode("K"),
            GO_LEFT  : util.keyCode("J"),
            GO_RIGHT : util.keyCode("L"),
            bot: true
        });
	}
	if(playmode === 3){
        this.generateBike({
            id : 1,
            x : 200,
            y : 250,
            gridPos : spatialManager.getReserveGridPos(1,200,250),
            livePos : 20,
            score : 0,
            xVel : 1,
            yVel : 0,
            Color : "#FF69B4",
            GO_UP    : util.keyCode("W"),
            GO_DOWN  : util.keyCode("S"),
            GO_LEFT  : util.keyCode("A"),
            GO_RIGHT : util.keyCode("D"),
            bot: false
        });

        this.generatePowerup({
            id : 20,
            gridPos : spatialManager.getReserveRandAvailablePos(20)
        });
	}
	
},

generateBike : function(descr) {
    this._bikes.push(new Bike(descr));
},

resetBikes : function() {
    this._forEachOf(this._bikes, Bike.prototype.reset);
},

resetLives : function() {
    this._forEachOf(this._bikes, Bike.prototype.resetLives);
},

haltBikes : function() {
    this._forEachOf(this._bikes, Bike.prototype.halt);
},

generatePowerup : function(descr) {
    this._powerups.push(new Powerup(descr));
},

killBikes : function() {
    this._bikes = [];
},

update: function(du) {
    for (var j = 0; j < this._categories.length; ++j) {

        var aCategory = this._categories[j];
        var i = 0;

        while (i < aCategory.length) {

            if (aCategory[i].isABike && playmode === 3) {
                var bike = aCategory[i];
                spatialManager.freePos(bike.gridPos.x,bike.gridPos.y);
            }
            var status = aCategory[i].update(du);

            if (status === this.KILL_ME_NOW) {
                // remove the dead guy, and shuffle the others down to
                // prevent a confusing gap from appearing in the array
                aCategory.splice(i,1);
            }
            else {
                ++i;
            }
        }
    }
},

render: function(ctx) {

    for (var j = 0; j < this._categories.length; ++j) {
        var aCategory = this._categories[j];
        for (var i = 0; i < aCategory.length; ++i) {
            aCategory[i].render(ctx);
        }
    }
}

};
