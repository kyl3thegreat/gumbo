$(document).ready(() => {

  var locationLat, loactionLng
  
  var getLocation = navigator.geolocation.getCurrentPosition((postion) =>{ 
    console.log(postion.coords.latitude)
    locationLat = postion.coords.latitude
    console.log(postion.coords.longitude)
    locationLng = postion.coords.longitude
  })

  $.get('/user/profile/data',).then(userPreference => {
    console.log(userPreference);
  
  
  // Range Slider for the maximum distance
  $(function() {
    $( ".distanceSlider" ).slider({
      range: "min",
      value: userPreference.UserPreference.distance,
      min: 1,
      max: 100,
      slide: function( event, ui ) {
        $( "#distance" ).val( ui.value + 'mi' );
      }
    });
    $( "#distance" ).val( $( ".distanceSlider" ).slider( "value" ) + 'mi' );
  });
    
  // Range Slider for the age range
  $(function() {
  $( ".ageSlider" ).slider({
    range: true,
    values: [userPreference.UserPreference.ageRangeMin, userPreference.UserPreference.ageRangeMax],
    min: 18,
    max: 100,
    slide: function( event, ui ) {
      $( "#ageAmount" ).val( ui.values[ 0 ] + " - " + ui.values[ 1 ] );
    }
  });
  $( "#ageAmount" ).val( $( ".ageSlider" ).slider( "values", 0 ) +
    " - " + $( ".ageSlider" ).slider( "values", 1 ) );
  }); 
  
  // Gender preference 
  $('.genderPrefToggle').on('click', (e)=> {
    console.log(e);
  $('.genderPref').toggleClass('hidden')
  })
  $('.genderPref input[type=radio]').change(function(e) {
    $('.genderPrefToggle').html($(this).val())
  
  });
  
  $(function() {
  $( ".genderPref fieldset input" ).checkboxradio({
    icon: false
  });
  });
  
  $( "#saveSettings" ).on('click', () => {
  // Retrieve data values
  var distance =  $( ".distanceSlider" ).slider( "value" ),
      gender = $('#gender').text()
      ageRangeMin = $( ".ageSlider" ).slider( "values", 0 ),
      ageRangeMax = $( ".ageSlider" ).slider( "values", 1 )
  
  // Req.body obj 
  var userPreference = {
    locationLat: locationLat,
    locationLng: locationLng,
    distance: distance,
    ageRangeMin: ageRangeMin,
    ageRangeMax: ageRangeMax,
    gender: gender
  }
  
  // Call to update our data
  $.ajax({
    method: "PUT",
    url: "/user/profile/settings",
    data: userPreference
  })
  .then(function() {
      window.location.href = "/user/dashboard";
  });
  })
  
  
  
  })

})










