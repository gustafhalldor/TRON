function drawText(text, color, font, x, y, c_ctx) {
	if(!c_ctx)
		c_ctx = ctx;
	c_ctx.save();
	c_ctx.textAlign = "center";
	c_ctx.textBaseline = "middle";
	c_ctx.font = font;
	c_ctx.fillStyle = color;
	c_ctx.fillText(text, x, y);
	c_ctx.restore();
}

// Pos : {x: X, y: Y}
// Draw double text with
function drawDoubleText(text, backColor, frontColor, font, x, y, c_ctx) {
	if(!c_ctx)
		c_ctx = ctx;
	drawText(text, backColor, font, x-2, y, c_ctx);
	drawText(text, frontColor, font, x+2, y, c_ctx);
}

// Draw box with center at (x,y) and text centered inside box
function drawTextInCenteredBox(text, fontColor, fontStyle, boxColor, x, y, width, height, c_ctx) {
	if(!c_ctx)
		c_ctx = ctx;
	c_ctx.save();
	c_ctx.fillStyle = boxColor;
	c_ctx.fillRect(x-width/2, y-height/2, width, height);
	drawText(text, fontColor, fontStyle, x, y, c_ctx);
	c_ctx.restore();
}

function drawInstructions(text, up, right, bottom, left, x, y, color, c_ctx) {
	if(!c_ctx)
		c_ctx = ctx;
	c_ctx.save();
	c_ctx.fillStyle = color;
	c_ctx.font = "24px serif";
	c_ctx.textAlign = "center";
	c_ctx.textBaseline = "middle";
	c_ctx.fillText(text, x, y-60);
	c_ctx.fillText(up, x, y-25);
	c_ctx.fillText(right, x+25, y);
	c_ctx.fillText(bottom, x, y+25);
	c_ctx.fillText(left, x-25, y);
	c_ctx.restore();
}

//fansy text
//simple colector on who lost and won
var gametextcolector = ["end"];

//write lose stats
function textlines(x,y)
{
	var temptada =gametextcolector.pop();

	if(temptada=="end") {
		gametextcolector.push("end");
		ctx.fillStyle ="white";

		ctx.fillRect(380,470,100,20);//smá fix
		return;
	}
	else {
 		ctx.save();
		ctx.fillStyle ="gold";
		ctx.fillText(temptada, x, y);
		ctx.restore();
    	textlines(x,y+20);

    	ctx.restore();
   	}
}

var round12=1;

function fansytext()
{
	ctx.save();
	g_ctxbg.save();
	g_ctxbg.font = "78px serif";
	if(playmode==2) {
 		drawText("round "+round12, "gold", "26px serif", g_canvas2.width/2, 25, g_ctxbg);
	}

	if(playmode==1) {
   		drawText("round "+round12, "gold", "26px serif", g_canvas2.width/2, 25, g_ctxbg);
	}
	//speedmode
	if(playmode==3) {
		g_ctxbg.fillText("speed has increast", 250, 100);
	}

	if(playmode==4){
		/*
	    ctx.font = "78px serif";
		ctx.fillStyle ="gold";
		ctx.fillText("level "+levelnow, 250, 100);
		ctx.fillStyle ="silver";
		ctx.fillText("level "+levelnow, 255, 100);
		*/
	}
	g_ctxbg.restore();
    ctx.restore();
}

//text to display when game over
function gameovertext(to)
{
	drawDoubleText("game  over", "gold", "silver", "78px serif", g_canvas.width/2, 200);

	ctx.save();
	ctx.fillStyle ="black";
	ctx.fillRect(400,400,100,300);
	ctx.restore();
	textlines(400,410);

	if(playmode==2 ||playmode==1 ) {
		var templayer =0;

		if(to ==1) templayer=2;

		if(to ==2) templayer=1;

		drawDoubleText("player " + templayer + " has WON", "gold", "silver", "78px serif", g_canvas.width/2, 350);
	}
}

//draw lives
function drawlives(lives, pos, color)
{
	g_ctxbg.font = "12px arial";
	g_ctxbg.fillStyle = color;
	g_ctxbg.fillText("LIVES : ", 555, pos);

	for(var i = 0, j = 600; i < lives; i++) {
		g_ctxbg.fillText("*", j, pos);
		j = j + 15;
	}
}

var textlevel="1";
function drawlevel()
{
   if(playmode==4)
	g_ctxbg.fillText("level : "+textlevel, 70, 30);
}

var chars = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","-"];
function scoreinput()
{
	ctx.save();
	ctx.fillStyle ="black";
	ctx.fillRect(200,400,200,300);
	ctx.restore();
	ctx.save();

	ctx.fillStyle ="#FF00FF";

	var row=0;
	var colume=0;
	for(var i = 0; i < 27; i++) {
		//500
		ctx.fillText(chars[i],((20*row)+200) , ((20*colume)+500));
		row++;

		if(row==7) {
			colume++;
			row=0;
		}
	}

	ctx.fillStyle ="gold";
	ctx.fillText("to change letter use 1 and to add use 2",205 , 590);
	ctx.fillText("submit score",320 , 460);
	ctx.fillText("your name",320 , 480);
	ctx.restore();
	ctx.save();
	ctx.fillStyle ="white";
	ctx.fillRect(250,430,50,30);
	//	ctx.fillRect(380,465,200,30);//laga þetta á morgun
	ctx.restore();
	ctx.restore();
	ctx.save();
	ctx.fillStyle ="black";
	ctx.fillText("A",270 , 450);
	ctx.fillStyle ="gold";
	ctx.fillText("your  score",330 , 410);
	tempscore = scorecalculate(gametextcolector.length);
	ctx.fillText(tempscore,330 , 420);
	ctx.restore();

	scoreinputchange();
	scoreinputadd();
}

var tempscore = 0;
var nowletter = 0;
var scorename = "";
var temchar = "A";
function scoreinputchange()
{
	ctx.save();
	ctx.fillStyle ="white";
	ctx.fillRect(250,430,50,30);
	ctx.fillStyle ="black";
	temchar= chars[nowletter];
	ctx.fillText(temchar,270 , 450);
	ctx.restore();
/*	nowleater=nowleater+1;
	if(nowleater==27)
	{
		nowleater=0;
	}
*/
}

function scoreinputadd()
{
	ctx.save();
//	scorename =scorename+temchar;
	ctx.fillStyle ="white";
	ctx.fillRect(380,470,100,20);
	ctx.fillStyle ="black";
	ctx.fillText(scorename,380 , 480,100);
	ctx.restore();
}

function scoresave()
{
	if(scorename !="");
	{
		setscorestart(scorename,tempscore);
		scorename="";
		tempscore="";
	}
}
