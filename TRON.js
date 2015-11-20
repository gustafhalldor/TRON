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
var KEY_LETTERCHANGE = keyCode('1');
var KEY_LETTERCONFIRM = keyCode('2');

function processDiagnostics() {
    if (eatKey(KEY_RETURN)) {
	    if (gamestart == false) {newTronGame();}
	}

	if (eatKey(KEY_CHANGEGAMEMODE) && !gamestart) gamemodechange();

    if (eatKey(KEY_HALT)) g_haltBikes = !g_haltBikes;

    if (eatKey(KEY_CONTINUE)) {
        if (g_continueGame == true) g_continueGame = false;
        if (g_startNewGame == true) {
            util.clearBackground(g_ctxbg);
            g_ctx.fillStyle = "white";
            util.setUpCanvas(g_ctx);
            g_continueGame = false;
            g_gameOver = false;
            gamestart = false;
            g_scoreInput = false;
            scoresave();
            nowletter = 0;
            spatialManager.resetArray();
            entityManager.killBikes();
            }
    }

  if (eatKey(KEY_RESET)) entityManager.resetBikes();

  if (eatKey(KEY_LETTERCHANGE))
  {
      nowletter++;
      if(nowletter==27)
      {
        nowletter=0;
      }
  }

  if (eatKey(KEY_LETTERCONFIRM)) scorename = scorename + temchar;

  if (eatKey(KEY_STOPPAUSESC)) notshowpausescreen=!notshowpausescreen;

}

var gamestart = false;
//say what type of play it will be
var playmode = 2;

function newTronGame(ctx) {
    entityManager.deferredSetup();
    entityManager.init();

    spatialManager.resetArray();
    util.setUpCanvas(g_ctx);
    //music play
    bgplay();
    gamestart = !gamestart;
    g_startNewGame = false;
	scoresave();
};

function resetGame(ctx) {
    spatialManager.resetArray();
    entityManager.resetBikes();
    util.setUpCanvas(ctx);
    g_haltBikes = false;
};

function gamemodechange() {
	playmode = playmode < 4 ? playmode+1 : 1;
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

        drawText("PRESS SPACEBAR TO CONTINUE", "white", "16px serif", g_canvas2.width/2, 25, g_ctxbg);

        entityManager.render(ctx);
        drawlevel();

    }

    else if(g_startNewGame == true) {
        util.clearBackground(g_ctxbg);


        drawText("PRESS SPACEBAR TO CONTINUE TO MAIN MENU", "white", "16px serif", g_canvas2.width/2, 25, g_ctxbg);

        entityManager.render(ctx);
        drawlevel();
    }

    else {
	 	//  fansytext();// virkar en þarf laga útlitið
        util.clearBackground(g_ctxbg);
        entityManager.render(ctx);
        //status update
        fansytext();//will be used to anocae the level at start
      	drawlevel();
    }

    if(g_scoreInput == true) {
        scoreinput();
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

// Draw text with center at (x,y)


// Draw box with center at (x,y) and text centered inside box


function drawintroscreen() {
	// Draw name of the game
	drawDoubleText("TRON", "", "green", "120px serif", g_canvas.width/2, 100);

	// Draw game instructions
	drawText("Controls:", "", "32px serif", 400, 200)
	drawInstructions("Player 1", "W", "D", "S", "A", 350, 300, "#FF69B4");
	drawInstructions("Player 2", "I", "L", "K", "J", 450, 300, "#00FFFF");

	drawText("press ENTER to start the game", "", "24px serif", 400, 380);

	var quarterWidth = g_canvas.width/5;
	var halfWidth = g_canvas.width/2;
	var width = quarterWidth-10;

	// Game modes
	var modes = [
		{text: "PvP", fontColor: "green", backgroundColor: "#ff00ff"},
		{text: "normal play", fontColor: "green", backgroundColor: "#808080"},
		{text: "snake", fontColor: "green", backgroundColor: "blue"},
		{text: "level play", fontColor: "green", backgroundColor: "silver"}
	];

	// Draw different game types
	for(var i = 0; i < modes.length; i++) {
		var mode = modes[i];
		drawTextInCenteredBox(mode.text, mode.fontColor, "22px aria", mode.backgroundColor, quarterWidth*(i+1), 500, width, 40);
	}

	// Draw instructions how to choose game type
	drawText("use M, or mouse, to change playmode", "", "36px aria", g_canvas.width/2, 550);

	// Draw the current chosen type
	var currentMode = modes[playmode-1];
	drawText("Selected: ", "#fff", "22px aria", halfWidth-50, 440);
	drawTextInCenteredBox(currentMode.text, currentMode.fontColor, "22px aria", currentMode.backgroundColor, halfWidth+50, 440, width, 40);
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
