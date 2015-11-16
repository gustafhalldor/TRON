//level file descripe how the level is 
//format is work in prosses add anything you can think of or need
//
var levelnow =1; // list the curent level
			
//descrion			
var level1 = {numerofplayer: 3,other: ""};
var level1xy =[{"x":200, "y":250},
    {"x":400, "y":250},
    {"x":400,"y": 400}
]; 

var level1color =[{"cl":"#FF69B4"},
    {"cl":"#00FFFF"},
    {"cl":"#FF00FF"}
]; 




var level2 = {numerofplayer: 3,other: "2 walls"};



function getnextlv() {

var a =[{level:level1 ,xy:level1xy,color:level1color}];
return a;
}