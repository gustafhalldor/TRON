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

    if(gamestart == true && g_gameOver == false && g_continueGame == false && g_startNewGame == false){
        entityManager.update(du);
    }
}

// GAME-SPECIFIC DIAGNOSTICS AND USEFUL KEYS
var KEY_CHANGEGAMEMODE  = keyCode('M');
var KEY_HALT  = keyCode('H');
var KEY_RESET = keyCode('R');
var KEY_CONTINUE = 32; //keycode for SPACEBAR
var KEY_STOPPAUSESC = keyCode('U');
var KEY_RETURN = 13;

function processDiagnostics() {
    if (eatKey(KEY_RETURN)) {
	    if (gamestart == false) {newTronGame();}
	}

	if (eatKey(KEY_CHANGEGAMEMODE)) gamemodechange();

  if (eatKey(KEY_HALT)) g_haltBikes = !g_haltBikes;

  if (eatKey(KEY_CONTINUE)) {
    if (g_continueGame == true) g_continueGame = false;
    if (g_startNewGame == true) {
        util.clearBackground(g_ctxbg);
        util.setUpCanvas(g_ctx);
        g_continueGame = false;
        g_gameOver = false;
        gamestart = false;
        spatialManager.resetArray();
        entityManager.killBikes();
    }
  }

  if (eatKey(KEY_RESET)) entityManager.resetBikes();

	if (eatKey(KEY_STOPPAUSESC)) notshowpausescreen=!notshowpausescreen;

}

//�arf svo a� f�ra �etta � r�ttan sta�
var gamestart = false;
//say what type of play it will be
var playmode =2;

function newTronGame(ctx) {
    entityManager.deferredSetup();
    entityManager.init();

    spatialManager.resetArray();
    util.setUpCanvas(g_ctx);
    //music play
    bgplay();
    gamestart = !gamestart;
    g_startNewGame = false;
};

function resetGame(ctx) {
    spatialManager.resetArray();
    entityManager.resetBikes();
    util.setUpCanvas(ctx);
    g_haltBikes = false;
};

function gamemodechange() {

   playmode=playmode+1;

   if(playmode==5)playmode=1;
};


// =================
// RENDER SIMULATION
// =================

// GAME-SPECIFIC RENDERING

function renderSimulation(ctx) {

    if (gamestart == false) {
	      drawscore();
        drawintroscreen();
    }

    else if(g_continueGame == true) {
        util.clearBackground(g_ctxbg);

        g_ctxbg.save();
        g_ctxbg.font = "16px serif";
        g_ctxbg.fillStyle = "white";
        g_ctxbg.fillText("PRESS SPACEBAR TO CONTINUE", 220, 30);
        g_ctxbg.restore();
        entityManager.render(ctx);
        drawlevel();

    }

    else if(g_startNewGame == true) {
        util.clearBackground(g_ctxbg);
        fansytext();
        g_ctxbg.save();
        g_ctxbg.font = "16px serif";
        g_ctxbg.fillStyle = "white";
        g_ctxbg.fillText("PRESS SPACEBAR TO CONTINUE TO MAIN MENU", 165, 30);
        g_ctxbg.restore();

        entityManager.render(ctx);
        drawlevel();
    }

    else {
	 //  fansytext();// virkar en þarf laga útlitið
        util.clearBackground(g_ctxbg);
        entityManager.render(ctx);
        //status update
		    // fansytext(); will be used to anocae the level at start
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

// Pos : {x: X, y: Y}
// Draw double text with 
function drawDoubleText(text, color, font, x, y) {
	ctx.save();
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.font = font;
	ctx.fillText(text, x-3, y);
	ctx.fillStyle = color;
	ctx.fillText(text, x+3, y);
	ctx.restore();
}

// Draw text with center at (x,y)
function drawText(text, color, font, x, y) {
	ctx.save();
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.font = font;
	ctx.fillStyle = color;
	ctx.fillText(text, x, y);
	ctx.restore();
}

// Draw box with center at (x,y) and text centered inside box
function drawTextInCenteredBox(text, fontColor, fontStyle, boxColor, x, y, width, height) {
	ctx.save();
	ctx.fillStyle = boxColor;
	ctx.fillRect(x-width/2, y-height/2, width, height);
	ctx.fillStyle = fontColor;
	ctx.font = fontStyle;
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.fillText(text, x, y);
	ctx.restore();
}

function drawintroscreen() {
	drawDoubleText("TRON", "green", "120px serif", g_canvas.width/2, 100);

		  ctx.save();
		  ctx.font = "32px serif";
        ctx.fillText("controls:", 215, 250);
      ctx.font = "24px serif";
      ctx.save();
        ctx.fillStyle = "#FF69B4";
        ctx.fillText("Player 1", 270, 280);
        ctx.fillText("W", 300, 312);
        ctx.fillText("A", 280, 335);
        ctx.fillText("D", 330, 335);
        ctx.fillText("S", 305, 360);
        ctx.restore();
        ctx.save();
        ctx.fillStyle = "#00FFFF";
        ctx.fillText("Player 2", 400, 280);
        ctx.fillText("I", 430, 312);
        ctx.fillText("J", 408, 335);
        ctx.fillText("L", 450, 335);
        ctx.fillText("K", 426, 360);
        ctx.restore();
        ctx.font = "24px serif";
        ctx.fillText("press ENTER to start the game ", 260, 400);
        ctx.restore();
		
		var quarterWidth = g_canvas.width/5;
		var halfWidth = g_canvas.width/2;
		var width = quarterWidth-10;

		// Draw different game types
		drawTextInCenteredBox("PvP", "green", "22px aria", "#ff00ff", quarterWidth, 500, width, 40);
		drawTextInCenteredBox("normal play", "green", "22px aria", "summer", quarterWidth*2, 500, width, 40);
		drawTextInCenteredBox("speed run", "green", "22px aria", "blue", quarterWidth*3, 500, width, 40);
		drawTextInCenteredBox("level play", "green", "22px aria", "silver", quarterWidth*4, 500, width, 40);

		// Draw instructions how to choose game type
		drawText("use M to change playmode", "", "45px aria", g_canvas.width/2, 550);

		if(playmode==1){
			drawTextInCenteredBox("PvP", "green", "22px aria", "#ff00ff", halfWidth, 440, width, 40);
		}
		if(playmode==2){
			drawTextInCenteredBox("normal play", "green", "22px aria", "summer", halfWidth, 440, width, 40);
		}
		if(playmode==3){
			drawTextInCenteredBox("speed run", "green", "22px aria", "blue", halfWidth, 440, width, 40);
		}
		if(playmode==4){
			drawTextInCenteredBox("level play", "green", "22px aria", "silver", halfWidth, 440, width, 40);
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

    //entityManager.init();

    main.init();

	scoreint();
}

// Kick it off
requestPreloads();
