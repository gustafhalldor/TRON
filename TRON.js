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
        entityManager.killBikes();
        if (playmode == 4) {
            levelnow = 1;
        }
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

function drawintroscreen() {
  ctx.save();
        ctx.font = "120px serif";
        ctx.fillText("TRON", 200, 200);
        ctx.fillStyle ="green";
        ctx.fillText("TRON", 210, 200);
        ctx.restore();
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
		 ctx.save();
		ctx.fillStyle ="blue";
		ctx.fillRect(340,480,110,40);
		ctx.restore();
		 ctx.save();
		ctx.fillStyle ="silver";
		ctx.fillRect(460,480,100,40);
		ctx.restore();
		 ctx.save();
		ctx.fillStyle ="summer";
		ctx.fillRect(200,480,130,40);
		ctx.restore();

		 ctx.save();
		ctx.fillStyle ="#ff00ff";
	    ctx.fillRect(70,480,120,40);
		ctx.fillStyle ="green";
		ctx.font = "25px aria";
		ctx.fillText("normal play", 200, 510);
		ctx.restore();
		ctx.save();
		ctx.fillStyle ="green";
		ctx.font = "25px aria";
		ctx.fillText("PvP", 110, 510);
	    ctx.restore();
		ctx.save();
		ctx.fillStyle ="green";
		ctx.font = "25px aria";
		ctx.fillText("speed run", 340, 510);
	    ctx.restore();
		ctx.save();
		ctx.fillStyle ="green";
		ctx.font = "25px aria";
		ctx.fillText("level play", 460, 510);
	    ctx.restore();
		ctx.save();
		ctx.font = "45px aria";
        ctx.fillText("use M to change playmode", 70, 560);
		ctx.restore();

		if(playmode==1){

		ctx.save();
		ctx.fillStyle ="#ff00ff";
	    ctx.fillRect(250,420,120,40);
		 ctx.restore();
		 ctx.save();
		ctx.fillStyle ="green";
		ctx.font = "25px aria";
		ctx.fillText("PvP", 290, 450);
	    ctx.restore();

		}

		if(playmode==2){

		ctx.save();
		ctx.fillStyle ="#summer";
	    ctx.fillRect(250,420,120,40);
		 ctx.restore();
		 ctx.save();
		ctx.fillStyle ="green";
		ctx.font = "25px aria";
		ctx.fillText("normal play", 250, 440);
	    ctx.restore();



		}

		if(playmode==3){

		ctx.save();
		ctx.fillStyle ="blue";
	    ctx.fillRect(250,420,120,40);
		 ctx.restore();
		 ctx.save();
		ctx.fillStyle ="green";
		ctx.font = "25px aria";
		ctx.fillText("speed run", 250, 440);
	    ctx.restore();


		}

		if(playmode==4){

		ctx.save();
		ctx.fillStyle ="silver";
	    ctx.fillRect(250,420,120,40);
		 ctx.restore();
		 ctx.save();
		ctx.fillStyle ="green";
		ctx.font = "25px aria";
		ctx.fillText("level play", 250, 440);
	    ctx.restore();


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
