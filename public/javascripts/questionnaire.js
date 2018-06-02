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
    answers: ["American","Italian","Chinese","Mexican", "Vegetarian"],
    fact: "insert cute little phrase here"
}, 
{   question: "Who is the dragon aspect of time?",
    answers: ["Nozdormu","Ysera","Chromie","Thrall"],
    image: "assets/images/nozdormu.jpg",
    correctAnswer: "Nozdormu",
    fact: "Nozdormu is the aspect of the bronze dragon flight, empowered by the Titans to watch over Azeroth."
}, 
{   question: "What is the level cap in the Wrath of the Lich King expansion?",
    answers: ["75","60","80","55"],
    image: "assets/images/wrath.jpg",
    correctAnswer: "80",
    fact: "Wrath of the Lich King sold over 2.8 million copies on its release date, making it the fastest selling computer questionnaire at that time."
}, 
{   question: "Jaina Proudmoore is the founder and former lady of what region in Kalimdor?",
    answers: ["Orgrimmar","Uldum","Theramore","Silithus"],
    image: "assets/images/jaina.jpg",
    correctAnswer: "Theramore",
    fact: "Jaina is the most powerful human sorceress alive and was a former leader of the Kirin Tor."
}, 
{   question: "What is the name of the Lich King's sword?",
    answers: ["Glamdring","Byfrost","Taeshalach","Frostmourne"],
    image: "assets/images/frostmourne.jpg",
    correctAnswer: "Frostmourne",
    fact: "Frostmourne was destroyed by Tirion Fordring following the Lich King's defeat in Icecrown Citadel."
 }, 
 {  question: "Azeroth is <i>not</i> the native home for which horde race?",
    answers: ["Goblin","Tauren","Orc","Draenei"],
    image: "assets/images/orc.jpg",
    correctAnswer: "Orc",
    fact: "Orcs are one of the most prolific races on Azeroth today, but originally hail from the alien world of Draenor."
}, 
{   question: "Who is a prominent Night Elf leader and high priestess of Elune?",
    answers: ["Jarod Shadowsong","Illidan Stormrage","Queen Azshara","Tyrande Whisperwind"],
    image: "assets/images/tyrande.jpg",
    correctAnswer: "Tyrande Whisperwind",
    fact: "Tyrande led the night elves in the Third War, defeating the Burning Legion."
}, 
{   question: "Which of these capital cities is home to the Alliance?",
    answers: ["Silvermoon City","Thunder Bluff","Stormwind City","Garadar"],
    image: "assets/images/stormwind.png",
    correctAnswer: "Stormwind City",
    fact: "Located north of Elwynn Forest on Eastern Kingdoms, Stormwind is the largest human city of Azeroth."
}, 
{   question: "Deathwing the Destroyer, formerly known as Neltharion the Earth-Warder, was the leader of which dragonflight?",
    answers: ["Black","Bronze","Red","Fire"],
    image: "assets/images/deathwing.jpg",
    correctAnswer: "Black",
    fact: "While Deathwing was once a benevolent entity, he is now completely evil. He hates all mortal races, and wishes to kill them all."
},
{   question: "Which of the races listed below is <i>not</i> native to Pandaria?",
    answers: ["Jinyu","Vulpera","Yaungol","Pandaren"],
    image: "assets/images/vulpera.jpg",
    correctAnswer: "Vulpera",
    fact: "Vulpera are a non-playable race that will appear in the newest expansion to World of Warcraft, <i>Battle for Azeroth</i>."
}];

var bgmMusic = new Audio("assets/sounds/wow_maintitle.mp3")

// our entire questionnaire is held within this variable
var questionnaire = {
    questions: questions,
    currentQuestion: 0,
    counter: 30,
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    countdown: function() {
        questionnaire.counter --;
        $("#counter").html(questionnaire.counter);
        if(questionnaire.counter <= 0) {
            questionnaire.timeUp();
        }
    },
    // end of countdown function

    // loads each questions and their answer options
    loadQuestion: function() {
        timer = setInterval(questionnaire.countdown, 1000);
        $("#timer").html("[SERVER]Reset in: 00:<span id='counter'>30</span> secs");
        $("#questions").html(questions[questionnaire.currentQuestion].question);
        for (var i = 0; i < questions[questionnaire.currentQuestion].answers.length; i++) {
            $("#answers").append("<button class='answer-button' id='button-" + i + "' data-name='" + questions[questionnaire.currentQuestion].answers[i] + "'>" + questions[questionnaire.currentQuestion].answers[i] +"</button>");
        }
    },
    // end of loadQuestion function

    // moves onto the next question after it has been answered or there's been a timeUp
    nextQuestion: function() {
        $("#fact").hide();
        questionnaire.counter = 30;
        $("#counter").html(questionnaire.counter);
        questionnaire.currentQuestion++;
        $("#answers").empty();
        $("#image").empty();
        $("#fact").empty();
        questionnaire.loadQuestion();
    },
    // end of nextQuestion function

    // moves onto the next question if the timer counts down to 0 and no answer has been selected
    timeUp: function() {
        clearInterval(timer);
        questionnaire.unanswered++;
        $("#timer").html("Out of Time!");
        $("#answers").html("The correct answer is: " + questions[questionnaire.currentQuestion].correctAnswer) + ".";
        $("#image").html("<img src='" + questions[questionnaire.currentQuestion].image + "'>");
        $("#fact").html(questions[questionnaire.currentQuestion].fact);
        if(questionnaire.currentQuestion == questions.length -1) {
            setTimeout(questionnaire.results, 8 * 1000);
        } else {
            setTimeout(questionnaire.nextQuestion, 8 * 1000);
        }
    },
    // end of timeUp function

    // displays to the user how they did on the quiz
    results: function() { 
        clearInterval(timer);
        $("#subwrapper").html("<h2>Finished!</h2>");
        $("#subwrapper").append("<h3>Correct: " + questionnaire.correct + "</h3>");
        $("#subwrapper").append("<h3>Incorrect: " + questionnaire.incorrect + "</h3>");
        $("#subwrapper").append("<h3>Unanswered: " + questionnaire.unanswered + "</h3>");
        $("#reset").show();
    },
    // end of results function

    clicked: function(event) {
        clearInterval(timer);
        if($(event.target).data("name") == questions[questionnaire.currentQuestion].correctAnswer){
            questionnaire.answeredCorrectly();
        } else {
            questionnaire.answeredIncorrectly();
        }
    },
    // end of clicked function

    // this displays all relevant data if the user made the correct selection on the quiz
    answeredCorrectly: function() {
        clearInterval(timer);
        questionnaire.correct++;
        $("#answers").html("You are correct! The answer is " + questions[questionnaire.currentQuestion].correctAnswer + ".");
        $("#image").html("<img src='" + questions[questionnaire.currentQuestion].image + "'>");
        $("#fact").html(questions[questionnaire.currentQuestion].fact);
        if (questionnaire.currentQuestion == questions.length -1) {
            setTimeout(questionnaire.results, 8 * 1000);
        } else {
            setTimeout(questionnaire.nextQuestion, 8 * 1000);
        }
    },
    // end of answeredCorrectly function

    // this displays all relevant data if the user selects an incorrect selection on the quiz
    answeredIncorrectly: function() {
        clearInterval(timer);
        questionnaire.incorrect++;
        $("#answers").html("Sorry, you chose " + $(event.target).data("name") + ". The correct answer is " + questions[questionnaire.currentQuestion].correctAnswer) + ".";
        $("#image").html("<img src='" + questions[questionnaire.currentQuestion].image + "'>");
        $("#fact").html(questions[questionnaire.currentQuestion].fact);
        if (questionnaire.currentQuestion == questions.length -1) {
            setTimeout(questionnaire.results, 8 * 1000);
        } else {
            setTimeout(questionnaire.nextQuestion, 8 * 1000);
        }
    },
    // end of answeredIncorrectly function
};
// end of questionnaire variable