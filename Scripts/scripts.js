let inject = document.getElementById("inject");
let titleBGM = document.getElementById('titleBGM');
let bodyBG = document.getElementById('bodyBG');

let gbQuestions = [];
let dsQuestions = [];
let switchQuestions = [];
let usedQuestions = [];
let timerInterval;
let imageInterval;

let level = 0;
let currentIndex = 0;
let score = 0;
let totalQuestions = 20;

// console.log(bodyBG.classList);
function loadHTML(url) {
  fetch(url)
    .then((data) => data.text())
    .then((response) => {
      url === "/HTML/levelSelect.html"
        ? loadTitleScreen(response)
        : url === "/HTML/trivia.html" && level === 3
        ? loadTrivia(response, gbQuestions)
        : url === "/HTML/trivia.html" && level === 2
        ? loadTrivia(response, dsQuestions)
        : url === "/HTML/trivia.html" && level === 1
        ? loadTrivia(response, switchQuestions)
        : url === "/HTML/result.html"
        ? loadResults(response)
        : url === "/HTML/home.html"
        ? loadHome(response)
        : console.log("You suck");
    });
}

function loadTitleScreen(html) {
  inject.innerHTML = html;

  bodyBG.classList.add('levelSelectBG');

  imageInterval = setInterval(imageTimer, 1000);
  // titleBGM.play();

  let imageTime = 0;
  let chooseLvlText = document.getElementById('chooseLvlText');

  let lvl1 = document.getElementById("lvl1");
  let lvl2 = document.getElementById("lvl2");
  let lvl3 = document.getElementById("lvl3");

  let gbImg = document.getElementById("gbImg");
  let dsImg = document.getElementById('dsImg');
  let switchImg = document.getElementById('switchImg');

  let gbSound = document.getElementById('gbSound');
  let dsSound = document.getElementById('dsSound');
  let switchSound = document.getElementById('switchSound');
  switchSound.currentTime = 0.25; // Makes it so the switch sound plays a little faster after pressing level 1. Without it it will be delayed

  let gbBGM = document.getElementById('gbBGM');
  let dsBGM = document.getElementById('dsBGM');
  let switchBGM = document.getElementById('switchBGM');

  lvl1.addEventListener("click", e => {
    loadHTML("/HTML/trivia.html");
    level = 1;
    bodyBG.classList.remove('levelSelectBG');
    switchSound.play();
    switchBGM.play();
    titleBGM.pause();
    clearInterval(imageInterval)
  });
  lvl1.addEventListener('mouseover', e => {
    lvl1.classList.add('pound');
  });

  lvl1.addEventListener('mouseleave', e => {
    lvl1.classList.remove('pound');
  })

  lvl2.addEventListener("click", e => {
    loadHTML("/HTML/trivia.html");
    level = 2;
    bodyBG.classList.remove('levelSelectBG');
    dsSound.play();
    dsBGM.play();
    titleBGM.pause();
    clearInterval(imageInterval)
  });
  lvl2.addEventListener('mouseover', e => {
    lvl2.classList.add('pound');
  });

  lvl2.addEventListener('mouseleave', e => {
    lvl2.classList.remove('pound');
  })

  lvl3.addEventListener("click", e => {
    loadHTML("/HTML/trivia.html");
    level = 3;
    bodyBG.classList.remove('levelSelectBG');
    gbSound.play();
    gbBGM.play();
    titleBGM.pause();
    clearInterval(imageInterval)
  });
  lvl3.addEventListener('mouseover', e => {
    lvl3.classList.add('pound');
  });
  lvl3.addEventListener('mouseleave', e => {
    lvl3.classList.remove('pound');
  });

  function imageTimer(){
    imageTime++;
  
    if(imageTime == 2){
      gbImg.classList.add('wiggle');
      dsImg.classList.add('wiggle');
      switchImg.classList.add('wiggle');
      chooseLvlText.classList.add('spinner');
    }
    else {
      console.log(imageTime);
    }
  
  }
}

function loadTrivia(html, questions) {
  inject.innerHTML = html;

  // let score = 0;
  // let totalQuestions = 20;
  // let currentIndex = 0;
  let questionCurrentNum = 1;
  let timer = 20;                     // Moved all these so it'll become global. 
  // let newQuestions = questions;
  // let usedQuestions = [];

  let quest = document.getElementById("Q");
  let a1 = document.getElementById("a1");
  let a2 = document.getElementById("a2");
  let a3 = document.getElementById("a3");
  let a4 = document.getElementById("a4");
  let c = document.getElementById("c");
  let title = document.getElementById('title');
  let timerText = document.getElementById('timerText');
  let scoreText = document.getElementById('scoreText');
  let timerNum = document.getElementById('timerNum');
  let scoreNum = document.getElementById('score');
  let correctSound = document.getElementById('correctSound');
  let wrongSound = document.getElementById('wrongSound');
  let outTime = document.getElementById('outTime');
  let questionText = document.getElementById('questionText');
  let questionNum = document.getElementById('questionNum');

  a1.addEventListener("click", e => {
    correctAnswer(e.target.innerText);
    startTimer();
  });
  a2.addEventListener("click", e => {
    correctAnswer(e.target.innerText);
    startTimer();
  });
  a3.addEventListener("click", e => {
    correctAnswer(e.target.innerText);
    startTimer();
  });
  a4.addEventListener("click", e => {
    correctAnswer(e.target.innerText);
    startTimer();
  });
// =========== Added event listeners to 'a1' ============== //
  a1.addEventListener('mouseover', e => {
    a1.classList.add('pulse');
  });
  a1.addEventListener('mouseleave', e => {
    a1.classList.remove('pulse');
  });
// =========== Added event listeners to 'a2' ============== //
  a2.addEventListener('mouseover', e => {
    a2.classList.add('pulse');
  });
  a2.addEventListener('mouseleave', e => {
    a2.classList.remove('pulse');
  });
// =========== Added event listeners to 'a3' ============== //
  a3.addEventListener('mouseover', e => {
    a3.classList.add('pulse');
  });
  a3.addEventListener('mouseleave', e => {
    a3.classList.remove('pulse');
  });
// =========== Added event listeners to 'a4' ============== //
  a4.addEventListener('mouseover', e => {
    a4.classList.add('pulse');
  });
  a4.addEventListener('mouseleave', e => {
    a4.classList.remove('pulse');
  });


  if(level === 1){
    bodyBG.classList.add('switchBG');
    title.innerText = "Switch Trivia"
  }
  else if(level === 2){
    bodyBG.classList.add('dsBG');
    quest.classList.add('dsAns');
    a1.classList.add('dsQuest');
    a2.classList.add('dsQuest');
    a3.classList.add('dsQuest');
    a4.classList.add('dsQuest');
    title.classList.add('dsAns');
    timerText.classList.add('dsAns');
    scoreText.classList.add('dsAns');
    timerNum.classList.add('dsAns');
    scoreNum.classList.add('dsAns');
    questionText.classList.add('dsAns');
    questionNum.classList.add('dsAns');
    title.innerText = "DS and 3DS Trivia";
  }
  else if(level === 3){
    bodyBG.classList.add('gbBG');
    quest.classList.add('gbAns');
    a1.classList.add('gbAns');
    a2.classList.add('gbAns');
    a3.classList.add('gbAns');
    a4.classList.add('gbAns');
    title.innerText = "Gameboy Trivia"
  }

  randomQuestion();
  loadQuestions(usedQuestions);


  function startTimer() {
    timer--; // Decrement the count

    // if(timer == 19){
    //   timerNum.classList.remove('redFont');
    //   timerNum.classList.remove('fadeOut');
    //   gbBGM.playbackRate = 1.0;
    //   dsBGM.playbackRate = 1.0;
    //   switchBGM.playbackRate = 1.0;
    //   outTime.pause();
    //   outTime.currentTime = 0;
    //   if(level == 1){
    //     switchBGM.play();
    //   }
    //   else if(level == 2){
    //     dsBGM.play();
    //   }
    //   else if(level == 3){
    //     gbBGM.play();
    //   }
    // }

    timer == 19 && (timerNum.classList.remove('redFont'), timerNum.classList.remove('fadeOut'),
                    gbBGM.playbackRate = 1.0, dsBGM.playbackRate = 1.0, switchBGM.playbackRate = 1.0,
                    outTime.pause(), outTime.currentTime = 0,
                    level == 1 ? switchBGM.play() :
                    level == 2 ? dsBGM.play() :
                    level == 3 ? gbBGM.play() :
                    console.log("This will error out if nothing works I guess"));

    timer == 10 && (outTime.play(), gbBGM.pause(), dsBGM.pause(), switchBGM.pause(),
                    timerNum.classList.add('redFont'), timerNum.classList.add('shake'),
                    level == 2 && timerNum.classList.remove('dsAns'));

    // if(timer == 10){
    //   outTime.play();
    //   gbBGM.pause();
    //   dsBGM.pause();
    //   switchBGM.pause();
    //   timerNum.classList.add('redFont');
    //   if(level == 2){
    //     timerNum.classList.remove('dsAns');
    //   }
    // }

    // if(timer == 7 && level == 1){
    //   switchBGM.play();
    //   switchBGM.playbackRate = 1.5;
    // }
    // else if(timer == 7 && level == 2){
    //   dsBGM.play();
    //   dsBGM.playbackRate = 1.5;
    // }
    // else if(timer == 7 && level == 3){
    //   gbBGM.play();
    //   gbBGM.playbackRate = 1.5;
    // }

    timer == 7 && level == 1 ? (switchBGM.play(), switchBGM.playbackRate = 1.5) : // resumes the BGM and switches the playbackRate to 1.5 to make sound like you're running out of time
    timer == 7 && level == 2 ? (dsBGM.play(), dsBGM.playbackRate = 1.5) : // resumes the BGM and switches the playbackRate to 1.5 to make sound like you're running out of time
    timer == 7 && level == 3 ? (gbBGM.play(), gbBGM.playbackRate = 1.5) : // resumes the BGM and switches the playbackRate to 1.5 to make sound like you're running out of time
    // console.log("Random stuff"); // random "else" statement because I didn't know how to do just else ifs in ternary

    // if(timer == 3){
    //   timerNum.classList.add('fadeOut');
    // }
    timer == 3 && timerNum.classList.add('fadeOut'); // fades the number out at 3 seconds left

    timer == 0 ? (timer = 20, wrongSound.play(), showMario(),
                  gbBGM.playbackRate = 1.0, dsBGM.playbackRate = 1.0, switchBGM.playbackRate = 1.0, // the play back rates reset back to 1.0 so it sounds normal again
                  nextIndexQuestion(), timerNum.innerText = timer, timerNum.classList.remove('redFont'), timerNum.classList.remove('fadeOut'),timerNum.classList.remove('shake'), console.log("Timer resets to: " + timer),
                  level == 2 && timerNum.classList.add('dsAns'))

                  : (timerNum.innerHTML = timer, console.log(timer)); // the else statement


                  // Need to fix the ternary operator version of the timer == 0 portion
                    
    // if (timer == 0) {
    //   timer = 20; // resets back to 20
    //   wrongSound.play(); // wrong sound plays when you run out of time
    //   gbBGM.playbackRate = 1.0; // the play back rates reset back to 1.0 so it sounds normal again
    //   dsBGM.playbackRate = 1.0; // the play back rates reset back to 1.0 so it sounds normal again
    //   switchBGM.playbackRate = 1.0; // the play back rates reset back to 1.0 so it sounds normal again
    //   nextIndexQuestion(); // loads the next set of questions and answers
    //   timerNum.innerText = timer; // this makes it so when it resets back to 20 seconds it will show 20 seconds instead of '1' second without this line of code
    //   timerNum.classList.remove('redFont'); // removes the red font on the timer's number so it resets back to it's original colored font
    //   timerNum.classList.remove('fadeOut'); // removes the fading class 
    //   showMario() // Shows mario when you run out of time
    //   console.log("Timer resets to: " + timer); // Logs timer reset to test if it works
    //   (level == 2) && timerNum.classList.add('dsAns'); // this makes it so when it resets back to 20 seconds it won't be black font and will instead be white
    // } else {
    //     timerNum.innerHTML = timer; // Counts down every second.
    //     console.log(timer); // Logs the count down
    // }
  }

//============= Function that loads the questions on the trivia.html side ============//
  function loadQuestions(newQs) {
    clearInterval(timerInterval);
    timerInterval = setInterval(startTimer, 1000);

    quest.innerText = newQs[currentIndex].Q;
    a1.innerText = newQs[currentIndex].a1;
    a2.innerText = newQs[currentIndex].a2;
    a3.innerText = newQs[currentIndex].a3;
    a4.innerText = newQs[currentIndex].a4;
  }
//============= Checks to see if the answer is correct or wrong. Plays a different sound depending on the choice ========== //
  function correctAnswer(ans) {
    ans === usedQuestions[currentIndex].c && score++;
    ans === usedQuestions[currentIndex].c ? (correctSound.play(), showCoin()):
                                            (wrongSound.play(), showMario());

    timer = 20;
    scoreNum.innerText = score; 
    nextIndexQuestion();
  }
//=========== Function that makes it load to the next question ===============//
  function nextIndexQuestion() {
    currentIndex++;
    questionCurrentNum++;
    currentIndex < totalQuestions
      ? (loadQuestions(usedQuestions), questionNum.innerText = questionCurrentNum)
      : (loadHTML("/HTML/result.html"), bodyBG.classList.add('resultBG'));
      ;
        // (level == 1) ? (switchBGM.pause(), switchBGM.playbackRate = 0)
        // : (level == 2) ? (dsBGM.pause(), dsBGM.playbackRate = 0)      Random code that's commented out to test playbackrates
        // : (level == 3) && (gbBGM.pause(), gbBGM.playbackRate = 0);
  }


  // if(level === 1){
  //   switchBGM.pause();
  //   switchBGM.playbackRate = 0;
  // }
  // else if(level === 2){
  //   dsBGM.pause();                   // Random code that's commented out to test playbackrates
  //   dsBGM.playbackRate = 0;
  // }
  // else if(level === 3){
  //   gbBGM.pause();
  //   gbBGM.playbackRate = 0;
  // }
// ========= Grabs a random question each time ================ //
  function randomQuestion() {
    let randomIndex;
    for (let i = 0; i < totalQuestions; i++) {
      randomIndex = Math.floor(Math.random() * questions.length);
      const selectedQuestion = questions[randomIndex];
      usedQuestions.push(selectedQuestion);
      questions.splice(randomIndex, 1);
    }
  }
}
// =========== Grabs the questions and puts them in the correct array ============== //
function getQuestions(url) {
  fetch(url)
    .then((data) => data.json())
    .then((response) => {
      for (let i = 0; i < response.gameboy.length; i++) {
        gbQuestions.push(response.gameboy[i]);
      }

      for (let w = 0; w < response.ds.length; w++) {
        dsQuestions.push(response.ds[w]);
      }

      for (let z = 0; z < response.switch.length; z++) {
        switchQuestions.push(response.switch[z]);
      }
      // console.log(gbQuestions);
      // console.log(dsQuestions);
      // console.log(switchQuestions);
    });
}
//============= Loads the Home screen ================//
function loadHome(html){
  inject.innerHTML = html;
  
  let play = document.getElementById('play');

  play.addEventListener('click', e => {
    loadHTML('/HTML/levelSelect.html');
    bodyBG.classList.remove('homeBG');
  })
}

//============ Loads the results at the end of the trivia game =================//
function loadResults(html) {
  inject.innerHTML = html;
  
//=========== All of these are for the restart portion of the code ==========//
  clearInterval(timerInterval);
  usedQuestions = [];
  switchQuestions = [];
  gbQuestions = [];
  dsQuestions = [];
  getQuestions("/Data/data.json");
  (level == 1) ? (switchBGM.pause(), switchBGM.currentTime = 0 , bodyBG.classList.remove('switchBG'))
  : (level == 2) ? (dsBGM.pause(), dsBGM.currentTime = 0 , bodyBG.classList.remove('dsBG'))
  : (level == 3) && (gbBGM.pause(), gbBGM.currentTime = 0) , bodyBG.classList.remove('gbBG');


  let clicked = 0; // Numbers of clicks

  let resultBGM = document.getElementById('resultBGM');
  let totalCoins = document.getElementById('totalCoins');
  let restart = document.getElementById('restart');
  let exit = document.getElementById('exit');

  console.log(score);

  totalCoins.innerText = score; // Shows total score at the end

  resultBGM.play(); // Plays results BGM
//=================== Restart event listener ====================//
  restart.addEventListener('click', e => {
    loadHTML("/HTML/home.html");
    score = 0;
    currentIndex = 0;
    clicked = 0;
    bodyBG.classList.remove('resultBG');
    bodyBG.classList.add('homeBG');
  });

  exit.addEventListener('click', e => {
    clicked++;

    if(clicked == 1){
      bodyBG.classList.add('glitch-wrapper');
      glitchScreen();
    }
    else{
      showMario2();
      wrongSound2.play();
    }
  })

}
//============ Shows coin image image when you get an answer right =============//
function showCoin() { 
  let coinImg = document.getElementById("coinImg");
  coinImg.style.display = "block";
  coinImg.classList.add('slideUp')
  setTimeout(function() {
    coinImg.style.display = "none";
    coinImg.classList.remove('slideUp');
  }, 1000);
}
//============ Shows Mario image image when you get an answer wrong =============//
function showMario() {
  let marioImg = document.getElementById("marioImg");
  marioImg.style.display = "block";
  marioImg.classList.add('slideDown')
  setTimeout(function() {
    marioImg.style.display = "none";
    marioImg.classList.remove('slideDown');
  }, 1000);
}

function showMario2() { 
  let marioImg = document.getElementById("marioImg");
  marioImg.style.display = "block";
  marioImg.classList.add('zoomer')
  setTimeout(function() {
    marioImg.style.display = "none";
    marioImg.classList.remove('zoomer');
  }, 1000);
}

function glitchScreen() { // Cool function I found to make it look like it's glitched but in reality it just wiggles a lot lol
  const wrapper = document.querySelector('.glitch-wrapper');
  wrapper.classList.add('glitch');
  
  setTimeout(() => {
    wrapper.classList.remove('glitch');
  }, 1000);
}

let wrongSound2 = document.getElementById("wrongSound2");
getQuestions("/Data/data.json");
loadHTML("/HTML/home.html");
// getQuestions('/Data/data.json');


