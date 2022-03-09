'use strict';
let difficulty = "easy";
let stage = "read";
let boxes = 36;
let maxInt = 4;
let time = 7;
let status = "win";
let score = 0;
let rounds = 0;
let inGame = false;
let highestStreak = 0;
let previousScore = 0;
function l(text){
  console.log(text)
}
function updateScore(){
  if(status=="win"){
    document.getElementById("scoreTxt").innerHTML = "Score: "+Math.round(score/36*100)+"% Streak: "+rounds;
    startGame();
  }else{
    if(rounds>highestStreak){
      highestStreak=rounds;
    };
    previousScore = score;
    document.getElementById("scoreTxt").innerHTML = "Previous Score: "+Math.round(previousScore/36*100)+"% Highest Streak: "+highestStreak;
    rounds = 0;
  };
}
function resetBoard(color, gen, sel){
    for (let i = 0; i < boxes; i++) {
      if(color==true){
        document.getElementById('box'+i).style.backgroundColor = 'white';
      };
      if(gen==true){
        document.getElementById('box'+i).setAttribute("data-generated", "0");
      };
      if(sel==true){
        document.getElementById('box'+i).setAttribute("data-selected", "0");
      };
    };
}
function validateBoard(){
  for (let i = 0; i < boxes; i++) {
    if(document.getElementById('box'+i).getAttribute("data-generated") == document.getElementById('box'+i).getAttribute("data-selected")){
      document.getElementById('box'+i).style.backgroundColor = 'green';
      score += 1;
    }else{
      document.getElementById('box'+i).style.backgroundColor = 'red';
      status = "lose";
    };
  };
}
function randomiseBoard(){
  for (let i = 0; i < boxes; i++) {
    if(randint(0, maxInt)==0) {
      //setting random board
      document.getElementById('box'+i).style.backgroundColor = 'gray';
      document.getElementById('box'+i).setAttribute("data-generated", "1");
    };
  };
  console.log('randomised board')
}
function randint(min, max){
  return(Math.floor(Math.random() * (max-min))+min)
}
function changebox(boxNum){
  // for recalling the pattern from memory(human not computer)
  if(stage=="write"){
    if(document.getElementById("box" + boxNum).getAttribute("data-selected")=="0"){
      document.getElementById("box" + boxNum).setAttribute("data-selected", "1")
      document.getElementById("box" + boxNum).style.backgroundColor = 'gray';
    }else{
      document.getElementById("box" + boxNum).setAttribute("data-selected", "0")
      document.getElementById("box" + boxNum).style.backgroundColor = 'white';
    };
  };
}
function setMode(mode){
  if(inGame==false){
    if(mode=="easy"){
      difficulty = "easy";
      maxInt = 4;
      time = 7;
      document.getElementById("timerBar").style.animationDuration = time+"s";
      document.getElementById("hardButton").style.backgroundColor = 'white';
      document.getElementById("mediumButton").style.backgroundColor = 'white';
      document.getElementById("easyButton").style.backgroundColor = 'gray';
    } else if(mode=="medium") {
      difficulty = "medium";
      maxInt = 2;
      time = 7;
      document.getElementById("timerBar").style.animationDuration = time+"s";
      document.getElementById("hardButton").style.backgroundColor = 'white';
      document.getElementById("mediumButton").style.backgroundColor = 'gray';
      document.getElementById("easyButton").style.backgroundColor = 'white';
    } else if(mode=="hard") {
      difficulty = "hard";
      maxInt = 2;
      time = 8;
      document.getElementById("timerBar").style.animationDuration = time+"s";
      document.getElementById("hardButton").style.backgroundColor = 'gray';
      document.getElementById("mediumButton").style.backgroundColor = 'white';
      document.getElementById("easyButton").style.backgroundColor = 'white';
    };
  }else{
  };
}
function startGame(){
  // user memorising
  inGame = true;
  stage = "read";
  score = 0;
  status ="win"
  randomiseBoard();
  document.getElementById("menuBar").style.display = "none";
  document.getElementById("instructionBar").style.display = "grid";
  document.getElementById("instructionText").innerHTML = "Memorise the pattern"
  document.getElementById("timerBar").classList.add('barTimerTrigger');
  setTimeout(()=>{ // prompting users guess
    document.getElementById("instructionText").innerHTML = "Recall the pattern"
    document.getElementById("timerBar").classList.remove('barTimerTrigger');
    resetBoard(true, false, false)
    stage = "write";
    document.getElementById("timerBar").classList.remove('barTimerTrigger');
    setTimeout(() => {
      //in a timeout cus doesnt work when next to its previous removal
      //idk how to add then remove a class any other way
      document.getElementById("timerBar").classList.add('barTimerTrigger')
    }, 20)
    setTimeout(()=>{ //review game
      document.getElementById("timerBar").classList.remove('barTimerTrigger');
      stage = "read";
      rounds += 1;
      validateBoard();
      setTimeout(()=>{
        resetBoard(true, true, true);
        document.getElementById("menuBar").style.display = "grid";
        document.getElementById("instructionBar").style.display = "none";
        updateScore();
        inGame = false
      }, 1250)
    },time*1000+20);
  }, time*1000);
};
