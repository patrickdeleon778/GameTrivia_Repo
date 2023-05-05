let inject = document.getElementById("inject");
let gbQuestions = [];
let dsQuestions = [];
let switchQuestions = [];
let timerInterval;

let level = 0;

function loadHTML(url) {
  fetch(url)
    .then((data) => data.text())
    .then((response) => {
      url === "/HTML/titleScreen.html"
        ? loadTitleScreen(response)
        : url === "/HTML/trivia.html" && level === 3
        ? loadTrivia(response, gbQuestions)
        : url === "/HTML/trivia.html" && level === 2
        ? loadTrivia(response, dsQuestions)
        : url === "/HTML/trivia.html" && level === 1
        ? loadTrivia(response, switchQuestions)
        : url === "/HTML/result.html"
        ? loadResults(response)
        : console.log("You suck");
    });
}

function loadTitleScreen(html) {
  inject.innerHTML = html;

  let lvl1 = document.getElementById("lvl1");
  let lvl2 = document.getElementById("lvl2");
  let lvl3 = document.getElementById("lvl3");
  let gbSound = document.getElementById('gbSound');
  let dsSound = document.getElementById('dsSound');
  let switchSound = document.getElementById('switchSound');

  let gbBGM = document.getElementById('gbBGM');
  let dsBGM = document.getElementById('dsBGM');
  let switchBGM = document.getElementById('switchBGM');

  lvl1.addEventListener("click", e => {
    loadHTML("/HTML/trivia.html");
    level = 1;
    switchSound.play();
    switchBGM.play();
  });
  lvl2.addEventListener("click", e => {
    loadHTML("/HTML/trivia.html");
    level = 2;
    dsSound.play();
    dsBGM.play();
  });
  lvl3.addEventListener("click", e => {
    loadHTML("/HTML/trivia.html");
    level = 3;
    gbSound.play();
    gbBGM.play();
  });
}

function loadTrivia(html, questions) {
  inject.innerHTML = html;

  let score = 0;
  let totalQuestions = 20;
  let currentIndex = 0;
  let timer = 15;
  let newQuestions = questions;
  let usedQuestions = [];

  let quest = document.getElementById("Q");
  let a1 = document.getElementById("a1");
  let a2 = document.getElementById("a2");
  let a3 = document.getElementById("a3");
  let a4 = document.getElementById("a4");
  let c = document.getElementById("c");
  let timerNum = document.getElementById('timerNum');
  let scoreNum = document.getElementById('score');

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

  randomQuestion();
  loadQuestions(usedQuestions);

  function startTimer() {
    timer--; // Decrement the count
    if (timer == 0) {
      timer = 15;
      nextIndexQuestion();
      timerNum.innerText = timer;
      console.log(timer + " timer when");
    } else {
        timerNum.innerHTML = timer;
        console.log(timer);
    }
  }

  function loadQuestions(newQs) {
    clearInterval(timerInterval);
    timerInterval = setInterval(startTimer, 1000);

    quest.innerText = newQs[currentIndex].Q;
    a1.innerText = newQs[currentIndex].a1;
    a2.innerText = newQs[currentIndex].a2;
    a3.innerText = newQs[currentIndex].a3;
    a4.innerText = newQs[currentIndex].a4;
  }

  function correctAnswer(ans) {
    ans === usedQuestions[currentIndex].c && score++;
    timer = 15;
    scoreNum.innerText = score;
    nextIndexQuestion();
  }

  function nextIndexQuestion() {
    currentIndex++;
    currentIndex < totalQuestions
      ? loadQuestions(usedQuestions)
      : loadHTML("/HTML/result.html");
  }

  function randomQuestion() {
    let randomIndex;
    for (let i = 0; i < totalQuestions; i++) {
      randomIndex = Math.floor(Math.random() * newQuestions.length);
      const selectedQuestion = newQuestions[randomIndex];
      usedQuestions.push(selectedQuestion);
      newQuestions.splice(randomIndex, 1);
    }
  }
}

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

function loadResults(html) {
  inject.innerHTML = html;
}

getQuestions("/Data/data.json");
loadHTML("/HTML/titleScreen.html");
// getQuestions('/Data/data.json');
