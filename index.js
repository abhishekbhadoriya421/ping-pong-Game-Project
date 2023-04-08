const gameBoard = document.getElementById('gameBoard');
const TopPaddle = document.getElementById('TopPaddle');
const BottomPaddle = document.getElementById('BottomPaddle');
const buttonLeft = document.getElementById('btnL');
const buttonRight = document.getElementById('btnR');
const ball = document.getElementById('ball');
const StartGameVar = document.getElementById('StartGame');
let counting = document.querySelector('.counting');
var sound = document.getElementById("myAudio"); 
var sound2 = document.getElementById("myAudio2"); 
let count = 3;
let isGameRunning = false;
let dontPlaySongFirstTime = true;


function checkingTopCollision(StopGameID){
    // these variables are used to keeps track the fine Position on the board 
    let TopPaddleLeftPosition = TopPaddle.getBoundingClientRect().left;
    let TopPaddleWidth = TopPaddle.offsetWidth;
    let ballLeftPosition = ball.getBoundingClientRect().left;
    let ballWidth = ball.offsetWidth;
    // Fine State
    if(ballLeftPosition+ballWidth>=TopPaddleLeftPosition && ballLeftPosition <=(TopPaddleLeftPosition+TopPaddleWidth) ){
        sound.play();
        console.log("fine state");
    }
    // Miss The Ball
    else{
        StartGameVar.style.display = 'flex';
        console.log("miss the ballT");
        clearInterval(StopGameID);
        ball.style.top = '50%';
        ball.style.left = '50%';
        ball.style.transitionDuration = '0s';
        counting.innerHTML = 'StartGame';
        count = 3;
        isGameRunning = false;
        dontPlaySongFirstTime = true;
    }

}


// Moving Ball
let temp = false;
function moveBall(StopGameID){
    
    const randomNumberL = Math.floor(Math.random() * 101);
    ball.style.left = `${randomNumberL}%` 
    if(temp == false){
        ball.style.top = `1.5%`;
        temp = true;
        if(dontPlaySongFirstTime!=true){
            
            sound2.play();
        }else{
            dontPlaySongFirstTime = false;
        }
        
    }
    
    else{
        ball.style.top = `97.5%`;
        temp  = false;
        checkingTopCollision(StopGameID); 
    }   
    BottomPaddle.style.left = `${randomNumberL}%`;
    
}


// Start game function is only clicked when i click StartGame icon on the DOM
function startGame(){
    // start game countdown
    let clearCounting = setInterval(() => {
        counting.textContent = count;
        if(0==count){
            StartGameVar.style.display = 'none';
            clearInterval(clearCounting);
        }
        count--;
    }, 1000);

     
    ball.style.transitionDuration = '4s';
    // this function will run after every 4s and will be used to move the ball in desired direction 
    let StopGameID =   setInterval(() => {
            moveBall(StopGameID); //calling the main function 
        }, 4000);

}

{
let PositionFromLeft = 0;  //Keeps track the position value of TopPaddle from Left
// Color is changed of the Button On every Clicked
function changeButtonColor(Button){
    Button.style.backgroundColor = "#3a4243b0";
    setTimeout(() => {
        Button.style.backgroundColor = "#82b8baaf";
    },200);
}




// Paddle moving function
// From Left To Right
function movingTowardRight(){
    let widthOfGameBoard = gameBoard.offsetWidth;
    let TopPaddleWidth = TopPaddle.offsetWidth;
    let TopPaddleLeft = TopPaddle.offsetLeft; 
    changeButtonColor(buttonRight);
    if(TopPaddleLeft+TopPaddleWidth <= widthOfGameBoard){
        PositionFromLeft+=2;
        TopPaddle.style.left =`${PositionFromLeft}%`;
    }
}

// From Right To Left
function movingTowardLeft(){
    changeButtonColor(buttonLeft);
    if(TopPaddle.offsetLeft>0){
        PositionFromLeft-=2;
        TopPaddle.style.left =`${PositionFromLeft}%`;
    } 
}



// Setting Event Listener 
document.body.addEventListener('keydown',(event)=>{ 
    let pressedKey =event.keyCode;
    // Start the game pressing enter key
    if(pressedKey==13){
        if(isGameRunning == false){
            isGameRunning = true;
            startGame();
        }else{
            window.alert("Pause")
        }
        
    }
    // Left Move
    else if(pressedKey==37){
        
        movingTowardLeft();
    }
    // Right Move
    else if(pressedKey==39){
        movingTowardRight();
    }
    // Invalid Move
    else{
        window.alert("Please Press EnterKey Or click the start icon To Play (:")
    }
})

// if anyone press the Left button
buttonLeft.addEventListener('mousedown',()=>{
    movingTowardLeft();
})

// if anyone press the Right button
buttonRight.addEventListener('mousedown',()=>{
   movingTowardRight(); 
})

}


// the main function for starting the game

StartGameVar.addEventListener('click',()=>{
        startGame();
});

