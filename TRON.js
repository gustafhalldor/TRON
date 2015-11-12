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

    if(gamestart == true &&main._isGameOver==false){
        entityManager.update(du);
    }

}

// GAME-SPECIFIC DIAGNOSTICS
var  KEY_CHANCEGAMEMODE  = keyCode('M');
var KEY_HALT  = keyCode('H');
var KEY_RESET = keyCode('R');
var KEY_STOPPAUSESC = keyCode('U');
var KEY_RETURN = 13;

function processDiagnostics() {
    if (eatKey(KEY_RETURN)) {
	
	      if (gamestart == false) {newTronGame();}
	
		 if (main._isGameOver  == true) {alert("kake");}
	
	
	}
	if (eatKey(KEY_CHANCEGAMEMODE)) gamemodechance();
	

    if (eatKey(KEY_HALT)) entityManager.haltBikes();

    if (eatKey(KEY_RESET)) entityManager.resetBikes();
	
	if (eatKey(KEY_STOPPAUSESC)) notshowpausescreen=!notshowpausescreen;
	
	
}

//�arf svo a� f�ra �etta � r�ttan sta�
var gamestart = false;
//say what type of play it will be
var playmode =2;

function newTronGame(ctx) {
    entityManager.init();
    util.setUpCanvas(g_ctx);
    //music play
    bgplay();
    gamestart = !gamestart;
  entityManager.deferredSetup();
};

function resetGame(ctx) {
   // entityManager.init();
    spatialManager.resetArray();
    entityManager.resetBikes();
    util.setUpCanvas(ctx);
};

function gamemodechance() {

   playmode=playmode+1;

   if(playmode==5)playmode=1;
};



// =================
// RENDER SIMULATION
// =================

// GAME-SPECIFIC RENDERING

function renderSimulation(ctx) {

    if (gamestart !=true) {
	    drawscore();
        drawintroscreen();

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

function drawintroscreen() {
  ctx.save();
        ctx.font = "120px serif";
        ctx.fillText("TRON", 200, 200);
        ctx.fillStyle ="green";
        ctx.fillText("TRON", 210, 200);
        ctx.restore();
		  ctx.save();
		  ctx.font = "54px serif";
        ctx.fillText("controls", 300, 300);
        ctx.fillText("w", 300, 320);
        ctx.fillText("a", 290, 330);
        ctx.fillText("d", 310, 330);
        ctx.fillText("s", 300, 340);
         ctx.restore();
        ctx.fillText("press enter to start the game ",300 ,400);
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
		ctx.fillText("multiplayer", 70, 510);
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
        ctx.fillText("use m to chance playmode", 70, 560);
		ctx.restore();
		
		if(playmode==1){
		
		ctx.save();
		ctx.fillStyle ="#ff00ff";
	    ctx.fillRect(250,420,120,40); 
		 ctx.restore();
		 ctx.save();
		ctx.fillStyle ="green";
		ctx.font = "25px aria";
		ctx.fillText("multiplayer", 250, 440);
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
