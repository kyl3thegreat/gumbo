console.log('Ready');


// Range Slider for the maximum distance
$( function() {
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
$( function() {
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
  } ); 

  // Gender preference 
  $('.genderPrefToggle').on('click', (e)=> {
      console.log(e);
    $('.genderPref').toggleClass('hidden')
  })
  $('.genderPref input[type=radio]').change(function(e) {
      console.log($(this).val());
      $('.genderPrefToggle').html($(this).val())
      
    // if (this.value == 'allot') {
    //     alert("Allot Thai Gayo Bhai");
    // }
    // else if (this.value == 'transfer') {
    //     alert("Transfer Thai Gayo");
    // }
    });

  $( function() {
    $( ".genderPref fieldset input" ).checkboxradio({
      icon: false
    });
  } );


//   // Logout modal
//   $('#logoutModal').on('shown.bs.modal', function () {
//     $('#myInput').trigger('focus')
//   })
//   // deleteAccount modal
//   $('#deleteAccountModal').on('shown.bs.modal', function () {
//     $('#myInput').trigger('focus')
//   })