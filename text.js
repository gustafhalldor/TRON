﻿//fansy text
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




var textlive=" * * *";
function drawlives()
{
ctx.fillText("lives"+textlive, 550, 50);
}

var textlevel="1";
function drawlevel()
{
ctx.fillText("level : "+textlevel, 50, 50);
}


