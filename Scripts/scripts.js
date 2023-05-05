let inject = document.getElementById('inject');
let gbQuestions = [];
let dsQuestions = [];
let switchQuestions = [];

let level = 0;

function loadHTML(url) {
    fetch(url)
        .then(data => data.text())
            .then(response => {
                (url === '/HTML/titleScreen.html') ? loadTitleScreen(response) :
                (url === '/HTML/trivia.html'  && level === 3) ? loadTrivia(response, gbQuestions) :
                (url === '/HTML/trivia.html'  && level === 2) ? loadTrivia(response, dsQuestions) :
                (url === '/HTML/trivia.html'  && level === 1) ? loadTrivia(response, switchQuestions) : 
                (url === '/HTML/result.html') ? loadResults(response) : console.log('You suck');
            });
}

function loadTitleScreen(html){
    inject.innerHTML = html

        let lvl1 = document.getElementById('lvl1');
        let lvl2 = document.getElementById('lvl2');
        let lvl3 = document.getElementById('lvl3');

        lvl1.addEventListener('click', function(e){
            loadHTML('/HTML/trivia.html');
            level = 1;
        })
        lvl2.addEventListener('click', function(e){
            loadHTML('/HTML/trivia.html');
            level = 2;
        })
        lvl3.addEventListener('click', function(e){
            loadHTML('/HTML/trivia.html');
            level = 3;
        })
}

function loadTrivia(html, questions){
    inject.innerHTML = html

    let score = 0;
    let totalQuestions = 20;
    let currentIndex = 0;
    let timer = 10;
    let newQuestions = questions;
    let usedQuestions = [];
    
    let quest = document.getElementById('Q');
    let a1 = document.getElementById('a1');
    let a2 = document.getElementById('a2');
    let a3 = document.getElementById('a3');
    let a4 = document.getElementById('a4');
    let correct = document.getElementById('c');

    a1.addEventListener('click', function(e){
        correctAnswer(e.target.innerText);
        startTimer()
    });
    a2.addEventListener('click', function(e){
        correctAnswer(e.target.innerText);
    })
    a3.addEventListener('click', function(e){
        correctAnswer(e.target.innerText);
    })
    a4.addEventListener('click', function(e){
        correctAnswer(e.target.innerText);
    })

    randomQuestion();
    loadQuestions(usedQuestions);

    function startTimer() {
        
          timer--; // Decrement the count
          if (timer <= 0) {
            timer = 10;
            loadQuestions(usedQuestions);
          } else {
            console.log(timer);
          }
        }
    
    function loadQuestions(newQs){
        let timerInterval = setInterval(startTimer(), 1000);
        quest.innerText = newQs[currentIndex].Q;
        a1.innerText = newQs[currentIndex].a1;
        a2.innerText = newQs[currentIndex].a2;
        a3.innerText = newQs[currentIndex].a3;
        a4.innerText = newQs[currentIndex].a4;
        
    }

    function correctAnswer(ans){
        ans === usedQuestions[currentIndex].c && score++;
        nextIndexQuestion();
    }

    function nextIndexQuestion(){
        currentIndex++;
        currentIndex < totalQuestions ? loadQuestions(usedQuestions) : loadHTML('/HTML/result.html');
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

function getQuestions(url){
    fetch(url)
        .then(data => data.json())
            .then(response => {
                for(let i = 0; i < response.gameboy.length ; i++){
                    gbQuestions.push(response.gameboy[i]);
                }

                for(let w = 0; w < response.ds.length ; w++){
                    dsQuestions.push(response.ds[w]);
                }

                for(let z = 0; z < response.switch.length; z++){
                    switchQuestions.push(response.switch[z]);
                }
                // console.log(gbQuestions);
                // console.log(dsQuestions);
                // console.log(switchQuestions);
            });
}

function loadResults(html){
    inject.innerHTML = html;
}

// function loadMainMenu(html){
//     inject.innerHTML = html 
//                 // Lets make our buttons clickable
//                 let injectLvl = document.getElementById('injectLvl');
//                 // Add an event listener to the button
//                 console.log(injectLvl);
//                 injectLvl.addEventListener('click', function(e){
//                     loadHTML('../site/instructions.html')
//                 })

//                 let injectOptions = document.getElementById('injectOptions');
                
//                 injectOptions.addEventListener('click', function(e){
//                     console.log('option button works');
//                 })

// }

// function loadInstructions(html){
//     inject.innerHTML = html
//                 let ready = document.getElementById('ready');

//                 ready.addEventListener('click', function(e){
//                     loadHTML('../site/lvlSelect.html');
//                 })

    
// }

// function loadLvlSelect(html){
//     inject.innerHTML = html
//                 let injectBld = document.getElementById('injectBld');
//                 let injectBld2 = document.getElementById('injectBld2');
//                 let injectBld3 = document.getElementById('injectBld3');

//                 injectBld.addEventListener('click', function(e){
//                     loadHTML('../site/borderlands.html');
//                     difficulty = 1;
//                 })
//                 injectBld2.addEventListener('click', function(e){
//                     loadHTML('../site/borderlands.html');
//                     difficulty = 2;
//                 })
//                 injectBld3.addEventListener('click', function(e){
//                     loadHTML('../site/borderlands.html');
//                     difficulty = 3;
//                 })
// }

// function loadGame(html, questions){
//     inject.innerHTML = html

//     let score = 0;

    
//                 let quest = document.getElementById('Q');
//                 let a1 = document.getElementById('a1');
//                 let a2 = document.getElementById('a2');
//                 let a3 = document.getElementById('a3');
//                 let a4 = document.getElementById('a4');

getQuestions('/Data/data.json');
loadHTML('/HTML/titleScreen.html');
// getQuestions('/Data/data.json');