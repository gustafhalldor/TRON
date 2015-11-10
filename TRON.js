// =====
// TRON
// =====

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

// =============
// GATHER INPUTS
// =============

function gatherInputs() {
    // Nothing to do here!
    // The event handlers do everything we need for now.
}


// =================
// UPDATE SIMULATION
// =================

// GAME-SPECIFIC UPDATE LOGIC

function updateSimulation(du) {

    processDiagnostics();

    if(gamestart == true){
        entityManager.update(du);
    }

}

// GAME-SPECIFIC DIAGNOSTICS

var KEY_HALT  = keyCode('H');
var KEY_RESET = keyCode('R');

var KEY_RETURN = 13;

function processDiagnostics() {
    if (eatKey(KEY_RETURN) &&gamestart == false) newTronGame();

    if (eatKey(KEY_HALT)) entityManager.haltBikes();

    if (eatKey(KEY_RESET)) entityManager.resetBikes();
}

//�arf svo a� f�ra �etta � r�ttan sta�
var gamestart = false;

function newTronGame(ctx) {

    util.setUpCanvas(g_ctx);
    //music play
    bgplay();
    gamestart = true;

};

function resetGame(ctx) {
    spatialManager.resetArray();
    entityManager.resetBikes();
    util.setUpCanvas(ctx);
};



// =================
// RENDER SIMULATION
// =================

// GAME-SPECIFIC RENDERING

function renderSimulation(ctx) {

    if (gamestart !=true) {
	    drawscore();
        ctx.save();
        ctx.font = "120px serif";
        ctx.fillText("TRON", 200, 200);
        ctx.fillStyle ="green";
        ctx.fillText("TRON", 210, 200);
        ctx.restore();
        ctx.fillText("controls", 300, 300);
        ctx.fillText("w", 300, 320);
        ctx.fillText("a", 290, 330);
        ctx.fillText("d", 310, 330);
        ctx.fillText("s", 300, 340);

        ctx.fillText("press enter to start the game ",300 ,400);

    } else {
        entityManager.render(ctx);

        //status update
		// fansytext(); will be used to anocae the level at start
       drawlives();
	   drawlevel();
    }
}

function drawscore() {
	var a=1;
	var l;
	while(a  < 11){
	l= scoreload(a);
	ctx.fillText(a+".", 50, (a*20)+200);
	ctx.fillText(l.name, 100, (a*20)+200,40);
	ctx.fillText(l.score, 150, (a*20)+200);
	a++;
	}

}



// =============
// PRELOAD STUFF
// =============

var g_images = {};

function requestPreloads() {

    var requiredImages = {
        bike   : ""
    };

    imagesPreload(requiredImages, g_images, preloadDone);
}

var g_sprites = {};

function preloadDone() {

    entityManager.init();

    main.init();

	scoreint();
}

// Kick it off
requestPreloads();
