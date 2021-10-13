////////////////////////        GLOBALS           ///////////////////////////////////

var answers = [];
var gameSpace = document.getElementById("gameSpace")
var theQuestion = document.getElementById("jepordy");
var currentPoints = document.getElementById("scoreBoard");
var highScore = document.getElementById("highScore");
var nameStored = localStorage.getItem('name');
var scoreStored = localStorage.getItem('score');
var notice = document.getElementById("notice");
var timeLeft = 60;


function init(){

 if(nameStored  === null || scoreStored === null){
  
  highScore.textContent = `High Score : None : 0 `;

 }
 else{ 
 highScore.textContent = `High Score :${nameStored}:
                                       ${scoreStored}`;

  }
}

/////////////////////////// TIMER FUNCTION ////////////////////////////////////////////

function countdown() {
  
  var timerEl = document.getElementById('countdown');
    
    if (timeLeft > 1) {
     
      timerEl.textContent = timeLeft + ' seconds remaining';
      
      timeLeft--;
    } else if (timeLeft === 1) {
      
      timerEl.textContent = timeLeft + ' second remaining';
      timeLeft--;
    } else {
      
      timerEl.textContent = '';
      
      clearGameSpace();
      gameOver();
      
      return;
      

    }

    setTimeout(function(){    
      
      requestAnimationFrame(countdown);

    },1000);

}

///////////////////////////    EVENT LISTENER /////////////////////////////

document.addEventListener("click", function(event){
 
  triggerEvent(event.target);

});

///////////////////////////// HANDLES BUTTON LOGIC          //////////////////

function triggerEvent(target) {
  switch (target.id){
 
    case "start":
      
      clearGameSpace();
      createGameSpace();

    break

    case "answers":

      checkAnswer(target);
    
    break

    case "newGame":
      
      saveScore();
          
    default:
    
  }
}

/////////////////////////////POPULATE A GAME SPACE WITH UI ELEMENTS //////////////////////

function createGameSpace() {
    
  for (let i = 0; i < 4; i++){

    var answer = answers[i];

    let div = document.createElement("div");
        div.setAttribute("class","usrSlct");
        
    let button = document.createElement("button");        
        button.setAttribute("name",i)
        button.setAttribute("id", "answers");
        button.textContent = button.name;

    div.appendChild(button);
    gameSpace.appendChild(div);
    
  }
  
  countdown();
  injectQnA();

}

/////////////////////////// INJECT THE Q AND A TO THE GAMESPACE///////////////////////////////

function injectQnA(){

    
  var setAnswer = document.querySelectorAll("#answers");
      
  var question = ['Which of the following is not JavaScript Data Types?',
                  'Which company developed JavaScript?',
                  "Inside which HTML element do we put the JavaScript?",
                  "What is the original name of JavaScript?",
                  "Which of the following is not Javascript frameworks or libraries?",
                  "Among the following, which one is a ternary operator in JavaScript?",
                  "What does javascript use instead of == and != ?",
                  "Among the keywords below, which one is not a statement?",
                  "Which of these is not a looping structures in JavaScript?",
                  "Which of the following method checks if its argument is not a number?",
                  'The "function" and " var" are known as:',
                  "JavaScript is which type of language?",
                  "When the interpreter encounters empty statements, what it will do:",
                  "Spaces, Punctuation marks are called as ________ Symbols in JavaScrip",
                 ];
  var fakeAnswer = [["Undefined","Number","Boolean","None of these"],
                    ["Bell Labs","Sun Microsystems","IBM","None of these"],
                    ["<head>","<meta>","<style>","None of these"],
                    ["LiveScript","EScript","JavaScript","None of these"],
                    ["Polymer","Meteor","jQuery","None of these"],
                    ["#","&",":","None of these"],
                    ["It uses bitwise checking","It uses equals() and notequals() instead","It uses equalto()","None of these"],
                    ["if","with","debugger","None of these"],
                    ["for","while","dowhile","None of these"],
                    ["nonNaN()","NaN()","yesNaN()","None of these"],
                    ["Keywords","Data types","Prototypes","None of these"],
                    ["Object-Oriented","Assembly-language","High-level","None of these"],
                    ["Shows a warning","Prompts to complete the statement","Throws an error","None of these"],
                    ["Punctual","Mandatory","Turtle","None of these"],                               
                   ];
  
  var realAnswer = ["Float",
                    'Netscape',
                    "<script>",
                    "Mocha",
                    "Cassandra",
                    "?",
                    "It uses === and !== instead",
                    "use strict",
                    "forwhich",
                    "isNaN()",
                    "Declaration statements",
                    "Object-Based",
                    "Ignores the statements",
                    "Special",
                   ];
    
  var randomPosition = Math.floor(Math.random()* 4);
  var selectQnA = Math.floor(Math.random() * question.length);
  
  theQuestion.textContent = `Q:` + question[selectQnA];
  theQuestion.setAttribute("name",randomPosition);

  for(let i = 0;i<4;i++){

  setAnswer[i].textContent = fakeAnswer[selectQnA][i];
 
  }
  
  setAnswer[randomPosition].textContent = realAnswer[selectQnA];
  
}

  //////////////////////////////////////// VERIFY ANSWER IS A MATCH ///////////////////

function checkAnswer(target){
  
  
  if(target.name === theQuestion.attributes["name"].value){

    notice.textContent = "++Correct!++";
    score(0);

  }else{

    notice.textContent = "--Incorrect!--";
    score(1);
  }

  injectQnA()

}

/////////////////////////////  ADJUST THE SCORE BOARD ////////////////////////////////////

function score(points){
 
  if(points === 0){
    
    let newScore = parseInt(currentPoints.textContent, 10 ) + 10;
    currentPoints.textContent = newScore;

  }
  if(points === 1){
    
    timeLeft = timeLeft - 10;
  
  }
}

///////////////////////////// GAME OVER SCREEN/////////////////////////////

function gameOver() {
  
  

  if(parseInt(currentPoints.textContent, 10) < parseInt(scoreStored,10)){

    theQuestion.textContent = "GAME OVER";
    notice.textContent = "";
    
    let button = document.createElement("button");        
    button.setAttribute("id", "newGame");
    button.textContent = "Restart?"

    let input = document.getElementById("playerName");

    gameSpace.appendChild(button);
 
  }else{

    theQuestion.textContent = "You got high score!";

    let button = document.createElement("button");        
        button.setAttribute("id", "newGame");
        button.textContent = "Submit"

    let input = document.createElement("input");        
        input.setAttribute("id", "playerName");
        input.value = "Your Name"

    gameSpace.appendChild(input);
    gameSpace.appendChild(button);

    localStorage.setItem('score', currentPoints.textContent);
    localStorage.setItem('name', input.value);
    
    //saveScore();

 }
}

///////////////////////// SAVE TO LOCAL STORAGE /////////////////////////

function saveScore(){

  
  let input = document.getElementById("playerName");
  

  if(parseInt(currentPoints.textContent,10) >= parseInt(localStorage.getItem('score'),10)){
    localStorage.setItem('score', currentPoints.textContent);
    localStorage.setItem('name', input.value);
          
    
  }
  
  window.location.reload();
}

/////////////////////////////////// CLEAR THE GAME BOARD ////////////////////////////

function clearGameSpace(){
  
  while (gameSpace.firstChild) {
    gameSpace.removeChild(gameSpace.firstChild);
  } 

}
init();

