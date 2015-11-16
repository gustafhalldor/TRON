//level file descripe how the level is 
//format is work in prosses add anything you can think of or need
//
var levelnow =1; // list the curent level
var maxlevel =2; //curent max numer of levels 
			
//descrion	list how to level is		
var level1 = {numerofplayer: 3,other: ""};
var level1xy =[{"x":200, "y":250},
    {"x":400, "y":250},
    {"x":400,"y": 400}
]; 

var level1color =[{"cl":"#FF69B4"},
    {"cl":"#00FFFF"},
    {"cl":"#FF00FF"}
]; 


//lv 2

var level2 = {numerofplayer: 4,other: ""};
var level2xy =[{"x":200, "y":250},
    {"x":400, "y":250},
    {"x":400,"y": 400},
	{"x":100,"y": 100}
]; 

var level2color =[{"cl":"#FF69B4"},
    {"cl":"#00FFFF"},
    {"cl":"#FF00FF"},
	{"cl":"#2200FF"}
]; 


//very 

function getnextlv() {
if(levelnow==1){
var a =[{level:level1 ,xy:level1xy,color:level1color}];
return a;}

if(levelnow==2){
var a =[{level:level2 ,xy:level2xy,color:level2color}];
return a;}



}