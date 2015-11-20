// ============
// POWRUP STUFF
// ============

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

// A generic contructor which accepts an arbitrary descriptor object
function Powerup(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);

    this.rememberResets();
};

Powerup.prototype = new Entity();

Powerup.prototype.size = g_bikeWidthHeight;
Powerup.prototype.gridPos = null;
Powerup.prototype.id = "powerup";
Powerup.prototype.color = "#008000";
Powerup.prototype.lifespan = 3000 / NOMINAL_UPDATE_INTERVAL;

Powerup.prototype.update = function(du) {
	this.lifespan -= du;
	if (this.lifespan <= 0) return entityManager.KILL_ME_NOW;
};

Powerup.prototype.render = function(ctx) {
	if(this.gridPos === null || this.gridPos === undefined) {
		return;
	}
	var x = this.gridPos.x;
	var y = this.gridPos.y;
	ctx.fillStyle = this.color;
	ctx.fillRect(x,y,this.size,this.size);
}