let inputDir={x:0 , y:0};
let board=document.querySelector("#board");
let body=document.querySelector(".body");
let eatSound=new Audio('food.mp3');
let gameSound=new Audio('gameover.mp3');
let moveSound=new Audio('move.mp3');
let musicSound=new Audio('music.mp3');
let scoreBox=document.querySelector(".score");
let scoreHigh=document.querySelector(".highScore");
let points=document.querySelector(".points");
let over=document.querySelector(".GameOver");
let speed=3;
let score=0;
let lastPintTime=0;
let snakeArr=[
    {x:15 , y:17}
];
let food={x:9 , y:4};
let hiscoreVal=0;
musicSound.play();

function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime-lastPintTime)/1000<1/speed){
        return;
    }
    lastPintTime=ctime;
    gameEngine();
}

function isCollide(sarr){
    // snake bump into yourself
    for(let i=1;i<snakeArr.length;i++){
        if(snakeArr[i].x===snakeArr[0].x&&snakeArr[i].y===snakeArr[0].y){
            return true;
        }
    }
    //snake collide into wall
    if(snakeArr[0].x>=18||snakeArr[0].x<=0||snakeArr[0].y>=18||snakeArr[0].y<=0){
        return true;
    }

}

function gameEngine(){
   // part1- updating the snake array and food
   if(isCollide(snakeArr)){

    gameSound.play();
    musicSound.pause();
    inputDir={x:0 , y:0};
    over.classList.remove("hide");
    musicSound.pause();
    setTimeout(function(){
        over.classList.add("hide");
        musicSound.play();
    },2000);
    // alert("Game Over!!! Press any key to start again");
    snakeArr=[{x:15 , y:8}];
    musicSound.play();
    scoreHigh.innerText=`Highest score is - ${hiscoreVal}`;
    score=0;
    scoreBox.innerText=`Your Score is - ${score}`;
    speed=3;
   }


   // If you ate food -> increment the score and regenerate the food.
   if(snakeArr[0].y===food.y&&snakeArr[0].x===food.x){
    eatSound.play();
    score++;
    scoreBox.innerText=`Your Score is - ${score}`;
    if(score>hiscoreVal){
        hiscoreVal=score;
        localStorage.setItem("hiscore",JSON.stringify(hiscoreVal));
        scoreHigh.innerText=`Highest score is - ${hiscoreVal}`;
    }
    speed+=0.5;
    snakeArr.unshift({x:snakeArr[0].x + inputDir.x , y:snakeArr[0].y + inputDir.y});
    food={x:1+Math.floor(Math.random()*17) , y:1+Math.floor(Math.random()*17)};
   }

   //moving the snake...
   for(let i=snakeArr.length-2;i>=0;i--){
    snakeArr[i+1]={...snakeArr[i]};

   }
   snakeArr[0].x+=inputDir.x;
   snakeArr[0].y+=inputDir.y;

   // part2- 
   //display the snake
   board.innerText="";
   snakeArr.forEach((el,index)=>{
    let snakeElement=document.createElement("div");
    snakeElement.style.gridRowStart=el.y;
    snakeElement.style.gridColumnStart=el.x;
    if(index==0){
        snakeElement.classList.add("head");
    }
    else{
        snakeElement.classList.add("snake");
    }
    board.appendChild(snakeElement);
   });
   // display the food
   let foodElement=document.createElement("div");
   foodElement.style.gridRowStart=food.y;
   foodElement.style.gridColumnStart=food.x;
   foodElement.classList.add("food");
   board.appendChild(foodElement);


}

//main logic...
window.requestAnimationFrame(main);
window.addEventListener("keydown", function(ev){
    inputDir={x:0,y:1}; // start game
    moveSound.play();
    musicSound.play();
    switch(ev.key){
        case "ArrowUp":
            console.log("ArrorUp");
            inputDir.x=0;
            inputDir.y=-1;
            break;
        case "ArrowDown":
            console.log("ArrorDown");
            inputDir.x=0;
            inputDir.y=1;
            break;
        case "ArrowLeft":
            console.log("ArrorLeft");
            inputDir.x=-1;
            inputDir.y=0;
            break;
        case "ArrowRight":
            console.log("ArrorRight");
            inputDir.x=1;
            inputDir.y=0;
            break;
        default:
            break;
    }
});



let hiscore=localStorage.getItem("hiscore");
if(hiscore===null){
    hiscoreVal=0;
    localStorage.setItem("hiscore",JSON.stringify(hiscoreVal))
}
else{
    hiscoreVal=JSON.parse(hiscore);
    scoreHigh.innerText=`Highest score is - `+ hiscore;
}