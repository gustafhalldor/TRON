//fansy text
//simple colector on who lost and won
var gametextcolector = ["end"];

//write lose stats
function textlines(x,y)
{
var temptada =gametextcolector.pop();

if(temptada=="end"){
gametextcolector.push("end");
ctx.fillStyle ="white";
		
		ctx.fillRect(380,470,100,20);//smá fix
return;
}
else{
 ctx.save();
		ctx.fillStyle ="gold";
		ctx.fillText(temptada, x, y);
		ctx.restore();
    textlines(x,y+20);

    ctx.restore();}
}

var round12=1;

function fansytext()
{
ctx.save();
g_ctxbg.save();
g_ctxbg.font = "78px serif";
if(playmode==2){
 drawText("round "+round12, "gold", "26px serif", g_canvas2.width/2, 25, g_ctxbg);

}

if(playmode==1){
   drawText("round "+round12, "gold", "26px serif", g_canvas2.width/2, 25, g_ctxbg);

}
//speedmode
if(playmode==3){
g_ctxbg.fillText("speed has increast", 250, 100);

}

if(playmode==4){/*
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


	ctx.save();
	 ctx.font = "78px serif";
	ctx.fillStyle ="gold";
	ctx.textAlign = "center";
ctx.fillText("game  over", g_canvas.width/2-2, 200);
	ctx.fillStyle ="silver";
ctx.fillText("game  over", g_canvas.width/2+2, 200);


    ctx.restore();
	ctx.save();
	ctx.fillStyle ="black";
		ctx.fillRect(400,400,100,300);
        ctx.restore();
		textlines(400,410);
		
		if(playmode==2 ||playmode==1 ){
		var templayer =0;
		if(to ==1) templayer=2;
		
		if(to ==2) templayer=1;
		
			ctx.save();
	 ctx.font = "78px serif";
	ctx.fillStyle ="gold";
	ctx.textAlign = "center";
ctx.fillText("player "+templayer +" has WON", g_canvas.width/2-2, 350);
	ctx.fillStyle ="silver";
ctx.fillText("player "+templayer +" has WON", g_canvas.width/2+2, 350);


    ctx.restore();
		
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
g_ctxbg.fillText("level : "+textlevel, 70, 30);
}
var chars = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","-"];
function scoreintput()
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
				if(row==7){
				colume++;  
				row=0;
				}
		}

		ctx.fillStyle ="gold";
ctx.fillText("to chance letter use 1 and to add use 2",205 , 590);		
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




}
var tempscore=0;
var nowleater =0;
var scorename ="";
var temchar ="A";
function scoreintputchance()
{
ctx.save();
ctx.fillStyle ="white";
ctx.fillRect(250,430,50,30);
ctx.fillStyle ="black";
temchar= chars[nowleater];
ctx.fillText(temchar,270 , 450);

ctx.restore();	
nowleater=nowleater+1;
if(nowleater==27)
{
nowleater=0;
}

}

function scoreintputadd()
{
ctx.save();
scorename =scorename+temchar;
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

