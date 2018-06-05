console.log('Ready');


// Range Slider for the maximum distance
$(function() {
    $( ".distanceSlider" ).slider({
      range: "min",
      value: 30,
      min: 1,
      max: 100,
      slide: function( event, ui ) {
        $( "#distanceAmount" ).val( ui.value + 'mi' );
      }
    });
    $( "#distanceAmount" ).val( $( ".distanceSlider" ).slider( "value" ) + 'mi' );
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
  // Call ajax 'POST' request on '/users/profile/settings
    // pass the distance , ageRange , gender as req.body
      // redirect the user to '/users/profiles'
})