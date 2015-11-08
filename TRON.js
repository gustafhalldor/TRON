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
    if (eatKey(KEY_RETURN)) newTronGame();

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
    entityManager.resetBikes();
    util.setUpCanvas(ctx);
};



// =================
// RENDER SIMULATION
// =================

// GAME-SPECIFIC RENDERING

function renderSimulation(ctx) {

    if (gamestart !=true) {
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
        ctx.fillText("lives * * *", 550, 50);
        ctx.fillText("level : 1", 50, 50);
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
}

// Kick it off
requestPreloads();
