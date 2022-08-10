'use strict';

const startBTN = document.querySelector('#start');
const cards = {
    box1: 'box2', box2: 'box1',
    box3: 'box4', box4: 'box3',
    box5: 'box6', box6: 'box5',
    box7: 'box8', box8: 'box7',
    box9: 'box10', box10: 'box9',
    box11: 'box12', box12: 'box11',
    box13: 'box14', box14: 'box13',
    box15: 'box16', box16: 'box15',
    box17: 'box18', box18: 'box17',
};
const memory = document.querySelector('.memory');
const circle1 = document.querySelector('.panel1');
const circle2 = document.querySelector('.panel2');
const circle3 = document.querySelector('.panel3');
const container = document.querySelector('.container');
const box = Array.from(document.querySelectorAll('.box'));
const counter = document.querySelector('.counter');
const time= document.querySelector('.time');

let correctFlips= 0;
let lastFlipped = [];
let moves = 0;
let minutes = 0;
let seconds = 0;
let minutesSTR = '';
let secondsSTR = '';
let timerObserver;

container.innerHTML='';


function flipOnClick(event) {
    moves++;
    counter.innerHTML= moves;
    const element = event.target;
    lastFlipped.push(element);
    element.classList.add('flipped');
    compareFlipped(lastFlipped);
}


function compareFlipped(array) {
    if (array.length > 2) {
        array.forEach(element => element.classList.remove('flipped'));
        lastFlipped = [];
    }

    if (array.length === 2) {
        const card1 = array[0].classList[1];
        const card2 = array[1].classList[1];

        if (cards[card1] == card2 || cards[card2] == card1) {
            const c1 = document.getElementsByClassName(card1)[0].firstElementChild.classList.add('matchingCards');
            const c2 = document.getElementsByClassName(card2)[0].firstElementChild.classList.add('matchingCards');
            correctFlips += 1;
            lastFlipped = [];
        } else {
            setTimeout(() => {
                array.forEach(element => element.classList.remove('flipped'));
                lastFlipped = [];
            }, 600);
        }
    }
}

function spreadCards(array) {
    let newArray = array.filter(element => array.indexOf(element) % 2 === 0);
    while (0 < newArray.length) {
        const number = Math.floor(Math.random() * newArray.length);
        const pick = newArray[number];
        container.appendChild(pick);
        newArray.splice(number, 1);
    }
}

function startTimer(minutes, seconds) {
    timerObserver = setInterval(() => {
        seconds > 59 ? ((minutes+=1), seconds=0) : (seconds +=1);
        secondsSTR = seconds > 9 ? `${seconds}` : `0${seconds}`;
        minutesSTR = minutes > 9 ? `${minutes}` : `0${minutes}`;
        time.innerHTML = `${minutesSTR}:${secondsSTR}`;
        if (correctFlips >= 9){
            alert('You Have Won in' + minutes + ' minutes' + ' and ' + seconds + ' seconds');
            clearInterval(timerObserver);
        }
    }, 1000)
}

function startGame() {
    correctFlips = 0;
    lastFlipped = [];
    moves = 0;
    minutes = 0;
    seconds = 0;
    minutesSTR = [];
    secondsSTR = [];
    time.innerHTML= '00:00';
    counter.innerHTML = '0';
    container.innerHTML= '';
    box.forEach(element => element.classList.remove('flipped'));
    clearInterval(timerObserver);
    spreadCards(box);
    container.childNodes.forEach(element =>
        element.firstElementChild.classList.remove('matchingCards'));
    startTimer(minutes, seconds);
}

startBTN.addEventListener ('click', startGame);

box.forEach(element => element.addEventListener('click', flipOnClick));

circle1.addEventListener('click', (event) => {
    clearInterval(timerObserver);
    container.innerHTML = '';
    time.innerHTML = '00:00';
    counter.innerHTML = '0';
});

circle2.addEventListener('click', (event) => {
    memory.style.height = '85%';
    memory.style.width = '65%';
});

circle3.addEventListener('click', (event) => {
    memory.style.height = '90%';
    memory.style.width = '90%';
})