//fansy text
//simple colector on who lost and won
var gametextcolector = ["end"];


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


function fansytext()
{


	ctx.save();
	 ctx.font = "78px serif";
	ctx.fillStyle ="gold";
ctx.fillText("level 1", 250, 100);
	ctx.fillStyle ="silver";
ctx.fillText("level 1", 255, 100);


    ctx.restore();
}


function gameovertext()
{


	ctx.save();
	 ctx.font = "78px serif";
	ctx.fillStyle ="gold";
ctx.fillText("game  over", 100, 200);
	ctx.fillStyle ="silver";
ctx.fillText("game  over", 105, 200);


    ctx.restore();
	ctx.save();
	ctx.fillStyle ="black";
		ctx.fillRect(400,400,100,300); 
        ctx.restore();
		textlines(400,410);	
	
	
}


var textlive= 3;
function drawlives()
{
	ctx.fillText("lives : ", 515, 50);

	for(var i = 0, j = 550; i < textlive; i++) {
		ctx.fillText("*", j, 50);
		j = j + 15;
	}
}

var textlevel="1";
function drawlevel()
{
ctx.fillText("level : "+textlevel, 50, 50);
}
