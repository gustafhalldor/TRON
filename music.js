
//list of backgroundmusic 
var bgmusic = ["bg1","bg2","bg3","bg4","bg5","bg6","bg7"];
//bg music playing now
var bgnowplaying="";
//bg volume is  0.5
//fx volume is  0.7
  //plays bgmusic   
 function bgplay () {
 if(bgnowplaying =="")
 {
 //set volume and loop and then play
 document.getElementById("intro").volume=0.5;
 document.getElementById("intro").loop=true;
 document.getElementById("intro").play();
 //set music playing now
 bgnowplaying = "intro";
 }
else{   
    //stops the curent music
    document.getElementById(bgnowplaying).pause();
	//set music that was playing to the stack
    bgmusic.push(bgnowplaying);
	//get next bgmusic set volume loop then play
	bgnowplaying = bgmusic.shift();
	document.getElementById(bgnowplaying).volume=0.5;
    document.getElementById(bgnowplaying).loop=true;
    document.getElementById(bgnowplaying).play();
}	
  }
  
  //
   function fx (fxefect) {
 //set   volume and play
document.getElementById(fxefect).volume=0.7; 
document.getElementById(fxefect).play();

  }