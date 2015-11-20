//level file descripe how the level is
//format is work in prosses add anything you can think of or need
//
var levelnow = 1; // list the curent level
var maxlevel = 10; //curent max numer of levels

// description of the levels

// lvl1
var level1 = {numerofplayer: 3, other: ""};
var level1xy =
	 [{"x": 200, "y": 250},
    {"x": 400, "y": 250},
    {"x": 400, "y": 400}];

var level1color =
	 [{"cl":"#FF69B4"},
    {"cl":"#00FFFF"},
    {"cl":"#FF00FF"}];

// lvl 2
var level2 = {numerofplayer: 4, other: ""};
var level2xy =
	 [{"x": 200, "y": 250},
    {"x": 400, "y": 250},
    {"x": 400, "y": 400},
		{"x": 100, "y": 100}];

var level2color =
	 [{"cl":"#FF69B4"},
    {"cl":"#00FFFF"},
    {"cl":"#FF00FF"},
		{"cl":"#2200FF"}];

// lvl3
var level3 = {numerofplayer: 3, other: ""};
var level3xy =
	 [{"x": 50, "y": 250},
    {"x": 450, "y": 250},
    {"x": 5, "y": 5}];

var level3color =
	 [{"cl":"#FF69B4"},
    {"cl":"#00FFFF"},
    {"cl":"#FF00FF"}];

// lvl4
var level4 = {numerofplayer: 3, other: ""};
var level4xy =
	 [{"x": 100, "y": 250},
    {"x": 450, "y": 550},
    {"x": 250, "y": 5}];

var level4color =
	 [{"cl":"#FF69B4"},
    {"cl":"#00FFFF"},
    {"cl":"#FF00FF"}];

// lvl5
var level5 = {numerofplayer: 4, other: ""};
var level5xy =
	 [{"x": 200, "y": 250},
    {"x": 450, "y": 450},
		{"x": 500, "y": 500},
    {"x": 250, "y": 600}];

var level5color =
	 [{"cl":"#FF69B4"},
    {"cl":"#00FFFF"},
    {"cl":"#FF00FF"},
		{"cl":"#FFFF00"}];

// lvl6
var level6 = {numerofplayer: 3, other: ""};
var level6xy =
	 [{"x": 200, "y": 200},
    {"x": 400, "y": 400},
    {"x": 590, "y": 590}];

var level6color =
	 [{"cl":"#FF69B4"},
    {"cl":"#00FFFF"},
    {"cl":"#FF00FF"}];

// lvl7
var level7 = {numerofplayer: 3, other: ""};
var level7xy =
	 [{"x": 300, "y": 300},
    {"x": 590, "y": 5},
    {"x": 5, "y": 590}];

var level7color =
	 [{"cl":"#FF69B4"},
    {"cl":"#00FFFF"},
    {"cl":"#FF00FF"}];


// lvl8
var level8 = {numerofplayer: 4, other: ""};
var level8xy =
	 [{"x": 150, "y": 5},
    {"x": 150, "y": 200},
		{"x": 150, "y": 400},
    {"x": 150, "y": 590}];

var level8color =
	 [{"cl":"#FF69B4"},
    {"cl":"#00FFFF"},
    {"cl":"#FF00FF"},
		{"cl":"#2200FF"}];

// lvl9
var level9 = {numerofplayer: 4, other: ""};
var level9xy =
	 [{"x": 450, "y": 5},
    {"x": 450, "y": 200},
		{"x": 450, "y": 400},
	  {"x": 450, "y": 590}];

var level9color =
   [{"cl":"#FF69B4"},
		{"cl":"#00FFFF"},
	  {"cl":"#FF00FF"},
		{"cl":"#2200FF"}];

// lvl10
var level10 = {numerofplayer: 5, other: ""};
var level10xy =
	 [{"x": 100, "y": 150},
    {"x": 200, "y": 200},
		{"x": 300, "y": 250},
    {"x": 400, "y": 300},
		{"x": 500, "y": 350}];

var level10color =
	 [{"cl":"#FF69B4"},
    {"cl":"#00FFFF"},
    {"cl":"#FF00FF"},
		{"cl":"#2200FF"},
		{"cl":"#FFFF00"}];


function getnextlv() {
		if(levelnow == 1){
		var a =[{level:level1, xy:level1xy, color:level1color}];
		return a;}

		if(levelnow==2){
		var a =[{level:level2, xy:level2xy, color:level2color}];
		return a;}

		if(levelnow==3){
		var a =[{level:level3, xy:level3xy, color:level3color}];
		return a;}

		if(levelnow==4){
		var a =[{level:level4, xy:level4xy, color:level4color}];
		return a;}

		if(levelnow==5){
		var a =[{level:level5, xy:level5xy, color:level5color}];
		return a;}

		if(levelnow==6){
		var a =[{level:level6, xy:level6xy, color:level6color}];
		return a;}

		if(levelnow==7){
		var a =[{level:level7, xy:level7xy, color:level7color}];
		return a;}

		if(levelnow==8){
		var a =[{level:level8, xy:level8xy, color:level8color}];
		return a;}

		if(levelnow==9){
		var a =[{level:level9, xy:level9xy, color:level9color}];
		return a;}

		if(levelnow==10){
		var a =[{level:level10, xy:level10xy, color:level10color}];
		return a;}
}
