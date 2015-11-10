// GENERIC UPDATE LOGIC

// The "nominal interval" is the one that all of our time-based units are
// calibrated to e.g. a velocity unit is "pixels per nominal interval"
//
var NOMINAL_UPDATE_INTERVAL = 16.666;

// Dt means "delta time" and is in units of the timer-system (i.e. milliseconds)
//
var g_prevUpdateDt = null;

// Du means "delta u", where u represents time in multiples of our nominal interval
//
var g_prevUpdateDu = null;

// Track odds and evens for diagnostic / illustrative purposes
//
var g_isUpdateOdd = false;
var notshowpausescreen =false;

function update(dt) {
    
    // Get out if skipping (e.g. due to pause-mode)
    //
    if (shouldSkipUpdate()) 
	{
	if(notshowpausescreen==false){
	pausescreen();}
	return;
	}

    // Remember this for later
    //
    var original_dt = dt;
    
    // Warn about very large dt values -- they may lead to error
    //
    if (dt > 200) {
        console.log("Big dt =", dt, ": CLAMPING TO NOMINAL");
        dt = NOMINAL_UPDATE_INTERVAL;
    }
    
    // If using variable time, divide the actual delta by the "nominal" rate,
    // giving us a conveniently scaled "du" to work with.
    //
    var du = (dt / NOMINAL_UPDATE_INTERVAL);
    
    updateSimulation(du);
    
    g_prevUpdateDt = original_dt;
    g_prevUpdateDu = du;
    
    g_isUpdateOdd = !g_isUpdateOdd;
}

// Togglable Pause Mode
//
var KEY_PAUSE = 'P'.charCodeAt(0);
var KEY_STEP  = 'O'.charCodeAt(0);

var g_isUpdatePaused = false;

function shouldSkipUpdate() {
    if (eatKey(KEY_PAUSE) && gamestart) {
        g_isUpdatePaused = !g_isUpdatePaused;
		pausestore();
    }
    return g_isUpdatePaused && !eatKey(KEY_STEP);    
}
//store the image while the game is in pause
var tempimagedate;
function pausestore() {
     if(g_isUpdatePaused)
{
tempimagedate=ctx.getImageData(0,0,600,600);
}
else
{
ctx.putImageData(tempimagedate,0,0);
}
	 
}


function pausescreen() {
ctx.save();
    ctx.font = "120px serif";
    ctx.fillText("TRON", 200, 200);
    ctx.fillStyle ="green";
    ctx.fillText("TRON", 210, 200);
	ctx.fillStyle ="gold";
	util.fillBox(ctx,190,200,300,200,"black");
	ctx.fillText("pause", 200, 270);
	
	
    ctx.restore();
	ctx.save();
	ctx.font = "60px serif";
	ctx.fillStyle ="red";
	util.fillBox(ctx,10,450,600,100,"black");
	ctx.fillText("to resume play press P", 10, 500);
	ctx.restore();
	ctx.fillText("controls", 300, 300);
    ctx.fillText("w", 300, 320);
    ctx.fillText("a", 290, 330);
    ctx.fillText("d", 310, 330);
    ctx.fillText("s", 300, 340);
	 
}








