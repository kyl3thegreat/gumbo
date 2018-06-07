$(document).ready(function(){
    answers = new Object();
    $('.option').change(function(){
        var answer = ($(this).attr('value'))
        var question = ($(this).attr('name'))
        answers[question] = answer
    })
    var item1 = document.getElementById('questions');
    
    var totalQuestions = $('.questions').size();
    var currentQuestion = 0;
    $questions = $('.questions');
    $questions.hide();
    $($questions.get(currentQuestion)).fadeIn();
    $('.next').click(function(){
        $($questions.get(currentQuestion)).fadeOut(function(){
            currentQuestion = currentQuestion + 1;
            if(currentQuestion == totalQuestions){
                   var result = sum_values()
  
            }else{
            $($questions.get(currentQuestion)).fadeIn();
            }
        });
    
    });
    });