//fansy text
//simple colector on who lost and won
var gametextcolector = ["end"];

//write lose stats
function textlines(x,y)
{
var temptada =gametextcolector.pop();

if(temptada=="end"){
gametextcolector.push("end");
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
ctx.font = "78px serif";
if(playmode==2){
	ctx.fillStyle ="gold";
	ctx.textAlign = "center";
ctx.fillText("round "+round12, g_canvas.width/2, 100);
}

if(playmode==1){
	ctx.textAlign = "center";
ctx.fillText("round "+round12, g_canvas.width/2, 100);

}
//speedmode
if(playmode==3){
ctx.fillText("speed has increast", 250, 100);

}

if(playmode==4){
	ctx.fillStyle ="gold";
ctx.fillText("level 1", 250, 100);
	ctx.fillStyle ="silver";
ctx.fillText("level 1", 255, 100);



}



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
