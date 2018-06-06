console.log('Ready');


// Range Slider for the maximum distance
$(function() {
    $( ".distanceSlider" ).slider({
      range: "min",
      value: 30,
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
    min: 18,
    max: 100,
    values: [ 24, 34 ],
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
  var distance =  $( ".distanceSlider" ).slider( "value" )
  var gender = $('#gender').text()
  // if(gender === "Male"){
  //   gender = 1
  // }
  // if(gender === "Female"){
  //   gender = 2
  // }
  // if(gender === "Both"){
  //   gender = 3
  // }
  var ageRangeMin = $( ".ageSlider" ).slider( "values", 0 )
  var ageRangeMax = $( ".ageSlider" ).slider( "values", 1 )

  var userPreference = {
    // locationLat:
    // locationLng
    distance: distance,
    ageRangeMin: ageRangeMin,
    ageRangeMax: ageRangeMax,
    gender: parseInt(gender) 
  }

  console.log(userPreference);

  $.ajax({
    method: "PUT",
    url: "/user/profile/settings",
    data: userPreference
  })
  .then(function() {
      window.location.href = "/user/dashboard";
  });
  // Call ajax 'POST' request on '/users/profile/settings
    // pass the distance , ageRange , gender as req.body
      // redirect the user to '/users/profiles'
})