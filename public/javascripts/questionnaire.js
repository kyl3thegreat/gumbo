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


    // Dinner Preference Obj
    let dinnerData = [];

    $questions = $('.questions');
    $questions.hide();
    $($questions.get(currentQuestion)).fadeIn();
    $('.next').click(function(){

        dinnerData.push($(this).val());
        

        $($questions.get(currentQuestion)).fadeOut(function(){
            currentQuestion = currentQuestion + 1;
            if(currentQuestion == totalQuestions){
                console.log(dinnerData);
                dinnerDataObj = {
                    cuisineType: dinnerData[0],
                    pricePoint: dinnerData[1].length-1,
                    distance: dinnerData[2],
                } 
                console.log(dinnerDataObj);
                
                saveDinnerPref(dinnerDataObj)
                  
            }else{
            $($questions.get(currentQuestion)).fadeIn();
            }
        });
    });



    $("section").on("swiperight", '.buddy' ,function(e){
        console.log('Swipe Right');
        let userid = e.target.childNodes[1].dataset.userid;
        let data = {
            id: userid
        }
        
        window.location.href = '/user/request/' + userid

        //$.get("/user/request/" + userid);

        // function() {
        //     window.location.href = "/user/matched/with/" +userid;
        // }
        
        $(this).addClass('rotate-left').delay(700).fadeOut(1);
        $('.buddy').find('.status').remove();
        
        $(this).append('<div class="status like">Like!</div>'); 
        
             
        if ( $(this).is(':last-child') ) {
            $('.buddy:nth-child(1)').removeClass ('rotate-left rotate-right').fadeIn(300);
        } else {
            $(this).next().removeClass('rotate-left rotate-right').fadeIn(400);
        }
    });  
    
    $("section").on("swipeleft", '.buddy' ,function(){
        console.log('Swipe Left');
        $(this).addClass('rotate-right').delay(700).fadeOut(1);
        $('.buddy').find('.status').remove();
        $(this).append('<div class="status dislike">Dislike!</div>');

        if ( $(this).is(':last-child') ) {
            $('.buddy:nth-child(1)').removeClass ('rotate-left rotate-right').fadeIn(300);
        } else {
            $(this).next().removeClass('rotate-left rotate-right').fadeIn(400);
        } 
    });



});


function saveDinnerPref(dinnerData){
    // Call to update our data
    $.ajax({
        method: "PUT",
        url: "/user/profile/dinnerPreference",
        data: dinnerData
    })
    .then((dinnerPreference) => {
        console.log("Dinner Preference", dinnerPreference);
        
        $.get('/user/findmatch', (data) => {
            console.log(data);
            findMatches(data.users, data.currentUser)
        })
    });
    
}





// Function that takes in a userDatabase returns and array of users called matches
function findMatches(users, currentUser){

    let matches = []
    
    // Filter to return the desiered gender of interest on both sides
    var filterForGender = users.filter(user => {
        if(currentUser.UserPreference.gender == 3) return user.UserPreference.gender == 3 && user.id !== currentUser.id 
        return (user.gender == currentUser.UserPreference.gender && user.id !== currentUser.id) && (user.UserPreference.gender == currentUser.gender)
    })
    console.log(filterForGender);
    
    // Filter for users to fall withing the same age range preference
    var filterForAge = filterForGender.filter(user => (user.age > currentUser.UserPreference.ageRangeMin && user.age < currentUser.UserPreference.ageRangeMax) && (currentUser.age > user.UserPreference.ageRangeMin && currentUser.age < user.UserPreference.ageRangeMax ) )
    // Filter for location distance
    // Filter for dinner travel distance
    console.log(filterForAge);
    var filterForDistance = filterForAge.filter(user => {
        let userLocation = new google.maps.LatLng(user.UserPreference.locationLat, user.UserPreference.locationLng)
        let currentUserLocation = new google.maps.LatLng(currentUser.UserPreference.locationLat, currentUser.UserPreference.locationLng)  
        let distanceBetween =  google.maps.geometry.spherical.computeDistanceBetween(currentUserLocation, userLocation) * 0.000621371192
        return (distanceBetween < currentUser.UserPreference.distance && distanceBetween < user.UserPreference.distance)
    })
    console.log(filterForDistance)
    // Filter for dinner cusine type
    var filterForCuisine = filterForDistance.filter(user => user.DinnerPreference.cuisineType === currentUser.DinnerPreference.cuisineType)
    console.log(filterForCuisine);
    // Filter for dinner price
    var filterForPrice = filterForCuisine.filter(user => user.DinnerPreference.pricePoint == currentUser.DinnerPreference.pricePoint)
  
    matches.push(filterForPrice)
  
  
    console.log('Here are the top matches for ' + currentUser.name, matches);

    $('section').html(

        '<div class="top container-fluid bg-1">'+
            '<div class="row">'+
                '<div class="col-xs-12">'+
                    '<a id="goBack" href="/user/dashboard" class="previous-round">'+
                        '<img src="/images/back.png" width="25" height="25">'+
                    '</a>'+
                    '<h4>'+
                        '<center>Matches</center>'+
                    '</h4>'+
                '</div>'+
            '</div>'+
        '</div>'+

        '<div id="matchContainer" class="container matchContainer">'+
       ' </div>'
        
    )

    $('#matchContainer').append(matchBuilder(matches[0]))

    function matchBuilder(matches){
        console.log(matches)
        
        var html = '<div class="row"><div class="col ">'
        matches.forEach(match => {
            console.log(match);
            
            html+= '<div class="buddy" style="display: block;">'
            html+= '<div class="avatar" style="display: block; background-image: url('+ match.photo +')"><br><p data-userid="'+ match.id +'" class="matchprofile"><br>'+ match.name + ', ' + match.age +'</p></div>'
            html+= '</div>'
        })

            html += '</div></div>'
        
            console.log(html);
            
        return html;
    }
    
  }

