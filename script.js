// Initialize the map
function initMap() {
    // Create a map object and specify the DOM element for display.
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 0, lng: 0},
        zoom: 2,
        mapTypeId: 'satellite'
    });

    // Add a listener for the click event on the map
    map.addListener('click', function(event) {
        // Zoom in to the clicked location
        map.setZoom(8);
        map.setCenter(event.latLng);
    });

    // Add a listener for the mouse wheel event on the map
    map.addListener('wheel', function(event) {
        // Zoom in or out depending on the wheel delta
        var zoom = map.getZoom();
        zoom += event.deltaY > 0 ? -1 : 1;
        map.setZoom(zoom);
    });
}

// Get the timeline buttons
var yearButton = document.getElementById('year');
var monthButton = document.getElementById('month');
var dayButton = document.getElementById('day');

// Add a click event listener for each button
yearButton.addEventListener('click', function() {
    // Choose a random year between 2000 and 2020
    var year = Math.floor(Math.random() * 21) + 2000;
    // Display the chosen year in the button text
    yearButton.textContent = year;
});

monthButton.addEventListener('click', function() {
    // Choose a random month between 1 and 12
    var month = Math.floor(Math.random() * 12) + 1;
    // Display the chosen month in the button text
    monthButton.textContent = month;
});

dayButton.addEventListener('click', function() {
    // Choose a random day between 1 and 31
    var day = Math.floor(Math.random() * 31) + 1;
    // Display the chosen day in the button text
    dayButton.textContent = day;
});

// Get the history toggle
var toggle = document.getElementById('toggle');

// Add a change event listener for the toggle
toggle.addEventListener('change', function() {
    // Check if the toggle is checked or not
    if (toggle.checked) {
        // If checked, display a message in the console
        console.log('Location history is on');
    } else {
        // If not checked, display a message in the console
        console.log('Location history is off');
    }
});
