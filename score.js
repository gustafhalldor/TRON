


//set some initial data
function scoreint() {

  if(localStorage.getItem("score1")==null)
  {
    var score1 = {name: "John",score: 3000};
    localStorage.setItem("score1", JSON.stringify(score1));
    var score2 = {name: "powerdrink",score: 2800};
    localStorage.setItem("score2", JSON.stringify(score2));
    var score3 = {name: "the lady",score: 2700};
    localStorage.setItem("score3", JSON.stringify(score3));
    var score4 = {name: "starcake",score: 2600};
    localStorage.setItem("score4", JSON.stringify(score4));
    var score5 = {name: "videostar",score: 2500};
    localStorage.setItem("score5", JSON.stringify(score5));
    var score6 = {name: "mister evel",score: 2400};
    localStorage.setItem("score6", JSON.stringify(score6));
    var score7 = {name: "not John",score: 1100};
    localStorage.setItem("score7",JSON.stringify(score7));
    var score8 = {name: "cant toch this",score: 1001};
    localStorage.setItem("score8", JSON.stringify(score8));
    var score9 = {name: "blue mangroup",score: 999};
    localStorage.setItem("score9", JSON.stringify(score9));
    var score10 = {name: "the computer says no",score: 1};
    localStorage.setItem("score10", JSON.stringify(score10));
  }
}
//load

function scoreload(number) {

  var loder = "score"+number;
  return JSON.parse(localStorage.getItem(loder));

}


function setscorestart(name,score) {

  setscore(name,score,1);

}

function setscore(name,score,number) {

  if(number==11)
  {
    return;
  }

  var temp =JSON.parse(localStorage.getItem(("score" + number)));
  if(temp.score < score)
  {
    var scorenew = {name: name, score: score};
    localStorage.setItem(("score" + number), JSON.stringify(scorenew));
    setscore(temp.name,temp.score,(number + 1));
  }

//first come fyrst serve so if they have same score then they will rank lower
}

function scorecalculate(lv) {

return lv * 1000*levelnow;

}
