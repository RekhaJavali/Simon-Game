
'use strict';

const buttonColors = ['red','blue','green','yellow'];
// console.log(buttonColors);

let gamePattern = [];
let userClickedPattern = [];
let musicPath = 0;

let started = true;
let level = 0;



function nextSequence(){
    userClickedPattern = [];
    level++;
   // console.log("level: "+level);
    $("#level-title").text("level "+level);


    let randomNumber = Math.floor(Math.random()*4);
    //console.log(randomNumber);  
    
    let randomChosenColor = buttonColors[randomNumber];
    //console.log(randomChosenColor); 
    gamePattern.push(randomChosenColor);
    console.log(gamePattern);
    $(`#${randomChosenColor}`).fadeIn(100).fadeOut(100).fadeIn(100);
   // console.log($(`#${randomChosenColor}`));

    // $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    
    playSound(randomChosenColor);
}
    
//we can write randomumber alone instead of functiona dn return.
//var randomNumber = Math.floor(Math.random() * 4);
// nextSequence();



$(".btn").click(function(){
    // console.log($(this).attr("id"));
    let userChosenColour = $(this).attr("id");
    
    userClickedPattern.push(userChosenColour);
   // console.log("userChosenColour: "+userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    // var a = new Audio("./sounds/"+userChosenColour+".mp3");
    // a.play();
   // console.log(userClickedPattern);
    let lastpressed = userClickedPattern[userClickedPattern.length-1];
    //console.log(lastpressed); 
    checkAnswer(userClickedPattern.length-1);
});

function playSound(name){
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}


function animatePress(currentColour){
    // $("#"+currentColour).addClass("pressed").delay(100).removeClass("pressed");
    $(`#${currentColour}`).addClass("pressed"); //can use this as well $("#"+currentColour).
    setTimeout(function() {
        $(`#${currentColour}`).removeClass("pressed");
    }, 100)
}

$(document).keypress(function(){
    if(started){
        $("#level-title").text("level "+level);
        nextSequence();
        //console.log("level: "+level);
        started =false;  
    }  
});

function checkAnswer(currentLevel){
    // console.log(gamePattern.length-1);
    console.log("userClickedPattern : "+ userClickedPattern);
    console.log("gamepattern : "+gamePattern);
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("success");

        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){nextSequence();}, 1000);
        }

    }else{
        console.log("Wrong");
        $("#level-title").text("Game over, Press any Key to Restart");
        playSound("wrong");  
        $("body").addClass("game-over");
        
        setTimeout(function(){$("body").removeClass("game-over");}, 200);
        startOver();

    }
}

function startOver(){
    started =true;
    gamePattern =[];
    level = 0;

}







    
