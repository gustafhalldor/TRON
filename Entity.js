// ======
// ENTITY
// ======
/*

Provides a set of common functions which can be "inherited" by all other
game Entities.

JavaScript's prototype-based inheritance system is unusual, and requires
some care in use. In particular, this "base" should only provide shared
functions... shared data properties are potentially quite confusing.

*/

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


function Entity() {

};

Entity.prototype.setup = function (descr) {

    // Apply all setup properies from the (optional) descriptor
    for (var property in descr) {
        this[property] = descr[property];
    }

    // I am not dead yet!
  //  this._isDeadNow = false;
};

Entity.prototype.setPos = function (x, y) {
    this.x = x;
    this.y = y;
};

Entity.prototype.getPos = function () {
    return {posX : this.x, posY : this.y};
};

Entity.prototype.setVel = function (xvel, yvel) {
    this.xVel = xvel;
    this.yVel = yvel;
};

Entity.prototype.resetGridPos = function (pos) {
    this.gridPos = pos;
};

Entity.prototype.kill = function () {
    this._isDeadNow = true;
};

Entity.prototype.isColliding = function (x, y) {
  //  return this.findHitEntity();
  if(x < 0 || x > g_canvas.width || y < 0 || y > g_canvas.height)
    return true;

};

Entity.prototype.wrapPosition = function () {
    this.x = util.wrapRange(this.x, 0, g_canvas.width);
    this.y = util.wrapRange(this.y, 0, g_canvas.height);
};
