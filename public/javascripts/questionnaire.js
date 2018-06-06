// LITERALLY A PLACEHOLDER

// hiding the reset button for the questionnaire and the questions div
$( document ).ready(function() {
    $("#Q_reset").hide();
    $("#question").hide();
});

// when the user clicks our start button, the questionnaire will begin
$("#start").on("click", function() {
    $("#start").remove();
    questionnaire.loadQuestion();
})

// enables our answer buttons to register correctly based on user choice
$(document).on("click", ".answer-button", function(event) {
    questionnaire.clicked(event);
    $("#fact").show();
})

// allows our questionnaire to reset so the user can play again!
$("#reset").on("click", function () {
    location.reload();
})

// This array containts all of our questions and answer options, as well as correct answers.
var questions = [{
    question: "What kind of food are you craving?",
    answers: ["American","Italian","Chinese","Mexican", "Vegetarian"]
}, 
{   question: "Do you have a gender preference?",
    answers: ["Male","Female","Any"]
}, 
{   question: "How far are you willing to travel?",
    answers: [] //slidebar 
}, 
{   question: "How much are you comfortable spending?",
    answers: [] //slidebar
}];


// our entire questionnaire is held within this variable
var questionnaire = {
    questions: questions,
    currentQuestion: 0,

    // loads each questions and their answer options
    loadQuestion: function() {
        $("#questions").html(questions[questionnaire.currentQuestion].question);
        for (var i = 0; i < questions[questionnaire.currentQuestion].answers.length; i++) {
            $("#answers").append("<button class='answer-button' id='button-" + i + "' data-name='" + questions[questionnaire.currentQuestion].answers[i] + "'>" + questions[questionnaire.currentQuestion].answers[i] +"</button>");
        }
    },
    // end of loadQuestion function

    // moves onto the next question after it has been answered or there's been a timeUp
    nextQuestion: function() {
        questionnaire.currentQuestion++;
        $("#answers").empty();
        questionnaire.loadQuestion();
    },
    // end of nextQuestion function
};




