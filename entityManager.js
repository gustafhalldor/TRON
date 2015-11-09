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
    this._categories = [this._bikes];
},

init: function() {
    this.generateBike({
        id : 1,
        x : 200,
        y : 250,
        gridPos : spatialManager.getReserveGridPos(1,200,250),
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

    this.generateBike({
        id : 2,
        x : 400,
        y : 250,
        gridPos : spatialManager.getReserveGridPos(2,400,250),
        score : 0,
        xVel : -1,
        yVel : 0,
        Color : "#00FFFF",
        GO_UP    : util.keyCode("I"),
        GO_DOWN  : util.keyCode("K"),
        GO_LEFT  : util.keyCode("J"),
        GO_RIGHT : util.keyCode("L"),
        bot: true
    });
},

generateBike : function(descr) {
    this._bikes.push(new Bike(descr));
},

resetBikes : function() {
    this._forEachOf(this._bikes, Bike.prototype.reset);
},

haltBikes : function() {
    this._forEachOf(this._bikes, Bike.prototype.halt);
},

generateGrid : function(descr) {
    this._grid = new Grid(descr);
    this._grid.resetArray(g_bikeWidthHeight);
},

update: function(du) {
    for (var j = 0; j < this._categories.length; ++j) {

        var aCategory = this._categories[j];
        var i = 0;

        while (i < aCategory.length) {

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

// Some deferred setup which needs the object to have been created first
entityManager.deferredSetup();