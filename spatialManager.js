/*

spatialManager.js

A module which handles spatial lookup, as required for...
e.g. general collision detection.

*/

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

var spatialManager = {

// "PRIVATE" DATA

_nextSpatialID : 1, // make all valid IDs non-falsey (i.e. don't start at 0)

_entities : [],

// "PRIVATE" METHODS
//
// <none yet>


// PUBLIC METHODS

getNewSpatialID : function() {

    // TODO: YOUR STUFF HERE!

    return this._nextSpatialID++;
},

register: function(entity) {
    var pos = entity.getPos();
    var spatialID = entity.getSpatialID();

    // TODO: YOUR STUFF HERE!
    entity.setPos(pos.posX, pos.posY);
    this._entities[spatialID] = {posX: pos.posX, posY: pos.posY, radius: entity.getRadius(), entity: entity};

},

unregister: function(entity) {
    var spatialID = entity.getSpatialID();

    // TODO: YOUR STUFF HERE!
    this._entities[spatialID] = {posX: null, posY: null, radius: null};
},

findEntityInRange: function(posX, posY, radius) {

    // TODO: YOUR STUFF HERE!

    var e, diffRadiiSq, sumRadiiSq, circleDist;

    for(var i = 1; i < this._entities.length; i++) {
      e = this._entities[i];

      diffRadiiSq = util.square(e.radius - radius);
      sumRadiiSq = util.square(e.radius + radius);
      circleDist = util.distSq(e.posX, e.posY, posX, posY);

      if(diffRadiiSq <= circleDist && circleDist <= sumRadiiSq) {
        return e.entity;
      }
    }

},

render: function(ctx) {
    var oldStyle = ctx.strokeStyle;
    ctx.strokeStyle = "red";

    for (var ID in this._entities) {
        var e = this._entities[ID];
        util.strokeCircle(ctx, e.posX, e.posY, e.radius);
    }

    ctx.strokeStyle = oldStyle;
}

}
