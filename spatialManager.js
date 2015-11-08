/*

spatialManager.js

A module which handles spatial lookup for collision.

*/

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

var spatialManager = {
  _gridArray : [],
  _columns   : (Math.floor(g_canvas.width/g_bikeWidthHeight) + 2),
  _rows      : (Math.floor(g_canvas.height/g_bikeWidthHeight) + 2),

  NotAvailable : -1,


  resetArray : function() {
    for (var j = 0; j < this._rows; j++) {
      this._gridArray[j] = [];
      for (var i = 0; i < this._columns; i++) {
        if (i === 0 || i === this._columns - 1 || 
          j === 0 || j === this._rows - 1) {
          this._gridArray[j][i] = "outofbounds";
        } else {
          this._gridArray[j][i] = 0;
        }
      }
    }
  },

  getReserveGridPos : function(id,x,y) {
    var i = this.getPosInArray(x,y).x;
    var j = this.getPosInArray(x,y).y;
    
    if (j < 0 || j >= this._rows || i < 0 || i >= this._columns ||
      this._gridArray[j][i] !== 0 ) return this.NotAvailable;

    this._gridArray[j][i] = id;

    return {x : i, y : j};
  },

  isAvailable : function(x,y) {
    var i = this.getPosInArray(x,y).x;
    var j = this.getPosInArray(x,y).y;
    return 0 === this._gridArray[j][i];
  },

  getPosInArray : function(x,y) {
    var j = Math.floor((y/g_canvas.height)*this._gridArray.length) + 1;
    var i = Math.floor((x/g_canvas.width)*this._gridArray[j].length) + 1;
    return {x : i, y : j};
  },

  getPosInPixels : function (i,j) {
    var x = (i - 1) / (this._gridArray[j].length - 1) * g_canvas.width;
    var y = (j - 1) / (this._gridArray.length - 1) * g_canvas.height;
    return {x : x, y : y};
  }

};

spatialManager.resetArray();