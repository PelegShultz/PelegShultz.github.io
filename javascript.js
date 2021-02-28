var playing = false;
var score;//set to zero
var action;
var time;
var correctAnswer;

//if we click on the star/reset
document.getElementById("startAndReset").onclick = function(){
    //if we are playing
    if(playing == true)
    {
        location.reload()//reaload page
    }
    //if we are not playing
    else
    {
        playing = true;
        score = 0;
        document.getElementById("scoreValue").innerHtml = score;
        show("timeReamining");
        time = 60;
        hide("gameOver");
        document.getElementById("timeValue").innerHTML = time;
        document.getElementById("startAndReset").innerHTML = "Reset Game";
        startCountdown();
        generateQnA();
    }
}
for(i=1; i<5; i++)
{
    document.getElementById("box"+i).onclick = function(){
        if(playing == true){   
            if(this.innerHTML == correctAnswer){
                score++;
                document.getElementById("scoreValue").innerHTML = score;
                hide("wrong");
                show("correct");
                setTimeout(function(){hide("correct");}, 1000);
                generateQnA();
            }

            else{
                hide("correct");
                show("wrong");
                setTimeout(function(){hide("wrong");}, 1000);
            }
        }
    }
}

function startCountdown(){
    action = setInterval(function(){
        time -= 1;
        document.getElementById("timeValue").innerHTML = time;
        //check if time is over
        if(time == 0){
            clearInterval(action);//stop countdown
            show("gameOver");
            document.getElementById("gameOver").innerHTML = ("<p>Game Over!</p><p> Your Score is: " + score +"</p>");
            hide("timeReamining");
            hide("correct");
            hide("wrong");
            playing = false;
            document.getElementById("startAndReset").innerHTML = "Start Game";
        }
    }, 1000)
}

function show(id){
    document.getElementById(id).style.display = "block";
}

function hide(id){
    document.getElementById(id).style.display = "none";
}

function generateQnA(){
    var x = 1 + Math.round(9*Math.random());// 1 - 10
    var y = 1 + Math.round(9*Math.random());
    var operation = Math.round(3*Math.random());
    var soperation;

    if(operation == 0){
        correctAnswer = x+y;
        soperation = "+";
    }
    else if(operation == 1){
        while(x < y)
        {
            x = 1 + Math.round(9*Math.random());// 1 - 10
            y = 1 + Math.round(9*Math.random());
        }
        correctAnswer = x-y;
        soperation = "-";
    }
    else if(operation == 2){
        correctAnswer = x*y;
        soperation = "X";
    }
    else if(operation == 3){
        while(x%y != 0)
        {
            x = 1 + Math.round(9*Math.random());// 1 - 10
            y = 1 + Math.round(9*Math.random());
        }
        correctAnswer = x/y;
        soperation = "/";
    }
    document.getElementById("question").innerHTML = (x + "" + soperation + "" + y);
    var correctPosition = 1 + Math.round(3*Math.random());
    document.getElementById("box"+correctPosition).innerHTML = correctAnswer; // fill the correct answer

    var answers = [correctAnswer];
    var wrongAnswer;
    for(i=1; i<5; i++){
        if(i != correctPosition){
            do{
            wrongAnswer =  (1 + Math.round(9*Math.random())) * (1 + Math.round(4*Math.random()));// לשנות כדי שיהיה עם הפעולה המתאימה
            }while(answers.indexOf(wrongAnswer) > -1); // check if the answer is alradey on the array
            document.getElementById("box"+i).innerHTML = wrongAnswer;
            answers.push(wrongAnswer);
        }
    }

}