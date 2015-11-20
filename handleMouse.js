// ==============
// MOUSE HANDLING
// ==============

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

var g_mouseX = 0,
    g_mouseY = 0;

function handleMouse(evt) {

    var rect = g_canvas.getBoundingClientRect();

    g_mouseX = Math.round((evt.clientX - rect.left) / (rect.right - rect.left) * g_canvas.width);
    g_mouseY = Math.round((evt.clientY - rect.top) / (rect.bottom - rect.top) * g_canvas.height);

    // If no button is being pressed, then bail
//    var button = evt.buttons === undefined ? evt.which : evt.buttons;
//    if (!button) return;

    // Mouse clicking normal play
    if(g_mouseX > 112 && g_mouseX < 231 && g_mouseY > 454 && g_mouseY < 489) {
        playmode = 1;
    }

    // Mouse clicking PvP
    if(g_mouseX > 239 && g_mouseX < 359 && g_mouseY > 454 && g_mouseY < 489) {
        playmode = 2;
    }

    // Mouse clicking level play
    if(g_mouseX > 369 && g_mouseX < 488 && g_mouseY > 454 && g_mouseY < 489) {
        playmode = 3;
    }
}

// Handle "down" and "move" events the same way.
window.addEventListener("mousedown", handleMouse);
//window.addEventListener("mousemove", handleMouse);
