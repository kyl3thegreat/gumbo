$(document).ready(() => {

    console.log('ready');
    
    // Get the users location
    if("geolocation" in navigator) {
    
        var pathArray = window.location.pathname.split( '/' );

        var currentUser;
        var userMatch;

        // Get current user
        $.get('/user/profile/data').then(currentUser => {
            // Get current users match
            $.get('/profile/' + pathArray[4]).then(userMatch => {
                $('.profiles .you img').attr('src', currentUser.photo)
                $('.profiles .you p').text(currentUser.name)
                $('.profiles .match img').attr('src', userMatch.photo)
                $('.profiles .match p').text(userMatch.name)
                

                console.log(currentUser);
                console.log(userMatch);
                

                var map;
                var service;
                var infowindow;
                var currentLoc;
                var restaurantLoc;


                console.log('Geolocation is available');

                var geo_options = {
                    enableHighAccuracy: true, 
                    maximumAge        : 30000, 
                    timeout           : 27000
                };


                function geo_success(position) {
                    currentLoc = {lat:position.coords.latitude, lng:position.coords.longitude}
                    initialize(currentLoc.lat, currentLoc.lng)
                }
                
                function geo_error() {
                    alert("Sorry, no position available.");
                }
                
                var geo_options = {
                    enableHighAccuracy: true, 
                    maximumAge        : 30000, 
                    timeout           : 27000
                };
                
                navigator.geolocation.getCurrentPosition(geo_success, geo_error, geo_options)

            
                // Get the users dinner Preference
               
            

            
                function initialize(lat, lng) {
                    var pyrmont = new google.maps.LatLng(lat, lng);
            
                    map = new google.maps.Map(document.getElementById('map'), {
                        center: pyrmont,
                        zoom: 10
                    });
            
                    var request = {
                    location: pyrmont,
                    radius: '32186',
                    query:  currentUser.DinnerPreference.cuisineType,
                    minPriceLevel: currentUser.DinnerPreference.pricePoint,
                    type: ['restaurant']
                    }
            
                    service = new google.maps.places.PlacesService(map);
                    service.textSearch(request, callback);
                }
            
                function callback(results, status) {
                    if (status == google.maps.places.PlacesServiceStatus.OK) {

                        var restaurant = results[Math.floor(Math.random()*results.length)];
                        restaurantLoc = {add: restaurant.formatted_address, lat:restaurant.geometry.location.lat(), lng:restaurant.geometry.location.lng()}
                        console.log(results.length);
                        console.log(restaurant.photos[0].getUrl({'maxWidth': 100, 'maxHeight': 100}));

                        var rating = Math.round(restaurant.rating)
                        console.log(rating);
                        
                        console.log(results)
                        $('.restaurant').append(
                            '<h1 class="resName">' + restaurant.name + '</h1>' + 
                            '<p class="resAddr">' + restaurant.formatted_address + '</p>' + 
                            '<p class="resRating"></p>')
                        console.log(restaurant)

                        for (let i = 0; i < rating; i++) {

                            $('.resRating').append('<img src="/images/star.png" width="20" height="20">')
                            
                        }
                        
                        createMarker(restaurant)

                        var directionsDisplay = new google.maps.DirectionsRenderer;
                        var directionsService = new google.maps.DirectionsService;
                        directionsDisplay.setMap(map);

                        calculateAndDisplayRoute(directionsService, directionsDisplay, currentLoc, restaurantLoc);
                        // document.getElementById('mode').addEventListener('change', function() {
                        // calculateAndDisplayRoute(directionsService, directionsDisplay, currentLoc, restaurantLoc);
                        // });


                    }
                }
            
                function createMarker(place) {
                    var placeLoc = place.geometry.location;
                    var marker = new google.maps.Marker({
                        map: map,
                        position: place.geometry.location
                    })
            
                    infowindow = new google.maps.InfoWindow();
            
                    google.maps.event.addListener(marker, 'click', function() {
                    infowindow.setContent(place.name);
                    infowindow.open(map, this);
                    });
                }

                function calculateAndDisplayRoute(directionsService, directionsDisplay, org, des) {
                    directionsService.route({
                        origin: {lat: org.lat, lng: org.lng}, 
                        destination: des.add,
                        travelMode: 'DRIVING',
                        provideRouteAlternatives: true
                    }, function(response, status) {
                        if (status == 'OK') {
                        directionsDisplay.setDirections(response);
                        } else {
                        window.alert('Directions request failed due to ' + status);
                        }
                    });
                }

                    })
                })


            
    
    } else {
        /* geolocation IS NOT available */
        console.log('Not available')    
    }

 



})



// // Directions Service
// function initMap() {
//     var directionsDisplay = new google.maps.DirectionsRenderer;
//     var directionsService = new google.maps.DirectionsService;
//     var map = new google.maps.Map(document.getElementById('map'), {
//       zoom: 14,
//       center: {lat: 37.77, lng: -122.447}
//     });
//     directionsDisplay.setMap(map);

//     calculateAndDisplayRoute(directionsService, directionsDisplay);
//     document.getElementById('mode').addEventListener('change', function() {
//       calculateAndDisplayRoute(directionsService, directionsDisplay);
//     });
//   }

//   function calculateAndDisplayRoute(directionsService, directionsDisplay) {
//     var selectedMode = document.getElementById('mode').value;
//     directionsService.route({
//       origin: {lat: 37.77, lng: -122.447},  // Haight.
//       destination: {lat: 37.768, lng: -122.511},  // Ocean Beach.
//       // Note that Javascript allows us to access the constant
//       // using square brackets and a string value as its
//       // "property."
//       travelMode: google.maps.TravelMode[selectedMode]
//     }, function(response, status) {
//       if (status == 'OK') {
//         directionsDisplay.setDirections(response);
//       } else {
//         window.alert('Directions request failed due to ' + status);
//       }
//     });
//   }