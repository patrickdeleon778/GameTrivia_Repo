let inject = document.getElementById('inject');
let gbQuestions = [];
let dsQuestions = [];
let switchQuestions = [];

let difficulty = 0;

function loadHTML(url) {
    fetch(url)
        .then(data => data.text())
            .then(response => {
                if(url === '/HTML/titleScreen.html'){
                    loadTitleScreen(response);
                }
                else if(url === '/HTML/trivia.html'){
                    loadTrivia(response);
                }
                // else if(url === '../site/lvlSelect.html'){
                //     loadLvlSelect(response);
                // }
                // else if(url === '../site/borderlands.html' && difficulty === 1){
                //     loadGame(response, Bld1Questions);
                // }
                // else if(url === '../site/borderlands.html' && difficulty === 2){
                //     loadGame(response, Bld2Questions);
                // }
                // else if(url === '../site/borderlands.html' && difficulty === 3){
                //     loadGame(response, Bld3Questions);
                // }
            });
}

function loadTitleScreen(html){
    inject.innerHTML = html
}

function loadTrivia(html){
    inject.innerHTML = html
}

function getQuestions(url){
    fetch(url)
        .then(data => data.json())
            .then(response => {
                for(let i = 0; i < response.gameboy.length ; i++){
                    // difficulty = 1;
                    gbQuestions.push(response.borderlands1[i]);
                }
                // console.log(Bld1Questions);

                for(let w = 0; w < response.ds.length ; w++){
                    // difficulty = 2;
                    dsQuestions.push(response.borderlands2[w]);
                }
                // console.log(Bld2Questions);

                for(let z = 0; z < response.switch.length; z++){
                    // difficulty = 3;
                    switchQuestions.push(response.borderlands3[z]);
                }
            });
}

function loadMainMenu(html){
    inject.innerHTML = html 
                // Lets make our buttons clickable
                let injectLvl = document.getElementById('injectLvl');
                // Add an event listener to the button
                console.log(injectLvl);
                injectLvl.addEventListener('click', function(e){
                    loadHTML('../site/instructions.html')
                })

                let injectOptions = document.getElementById('injectOptions');
                
                injectOptions.addEventListener('click', function(e){
                    console.log('option button works');
                })

}

function loadInstructions(html){
    inject.innerHTML = html
                let ready = document.getElementById('ready');

                ready.addEventListener('click', function(e){
                    loadHTML('../site/lvlSelect.html');
                })

    
}

function loadLvlSelect(html){
    inject.innerHTML = html
                let injectBld = document.getElementById('injectBld');
                let injectBld2 = document.getElementById('injectBld2');
                let injectBld3 = document.getElementById('injectBld3');

                injectBld.addEventListener('click', function(e){
                    loadHTML('../site/borderlands.html');
                    difficulty = 1;
                })
                injectBld2.addEventListener('click', function(e){
                    loadHTML('../site/borderlands.html');
                    difficulty = 2;
                })
                injectBld3.addEventListener('click', function(e){
                    loadHTML('../site/borderlands.html');
                    difficulty = 3;
                })
}

// function loadGame(html, questions){
//     inject.innerHTML = html

//     let score = 0;

    
//                 let quest = document.getElementById('Q');
//                 let a1 = document.getElementById('a1');
//                 let a2 = document.getElementById('a2');
//                 let a3 = document.getElementById('a3');
//                 let a4 = document.getElementById('a4');


loadHTML('/HTML/titleScreen.html');
getQuestions('/Data/data.json')