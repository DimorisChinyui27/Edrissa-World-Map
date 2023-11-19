// script.js

// Define a variable to store the map object
var map;

// Define a variable to store the current location of the user
var currentLocation;

// Define a variable to store the historical data of the user's location
var historicalData;

// Define a function to initialize the map
function initMap() {
  // Create a new map object with some options
  map = new jvm.Map({
    container: $('#map'), // The element to render the map in
    map: 'world_mill', // The map projection to use
    backgroundColor: '#F3F4F6', // The background color of the map
    regionsSelectable: false, // Disable region selection
    markersSelectable: false, // Disable marker selection
    zoomOnScroll: false, // Disable zoom on scroll
    zoomButtons: false, // Hide zoom buttons
    regionStyle: {
      initial: {
        fill: '#D1D5DB', // The initial fill color of the regions
        stroke: '#FFF', // The initial stroke color of the regions
      },
      hover: {
        fill: '#9CA3AF', // The fill color of the regions on hover
        cursor: 'default', // The cursor style on hover
      },
    },
    markerStyle: {
      initial: {
        fill: '#EF4444', // The initial fill color of the markers
        stroke: '#FFF', // The initial stroke color of the markers
        r: 5, // The initial radius of the markers
      },
      hover: {
        fill: '#F87171', // The fill color of the markers on hover
        cursor: 'default', // The cursor style on hover
      },
    },
  });
}

// Define a function to get the current location of the user
function getCurrentLocation() {
  // Check if the Geolocation API is supported by the browser
  if (navigator.geolocation) {
    // Request the current position of the user
    navigator.geolocation.getCurrentPosition(
      function (position) {
        // If the request is successful, store the latitude and longitude of the user
        currentLocation = [
          position.coords.longitude,
          position.coords.latitude,
        ];
        // Update the map with the current location of the user
        updateMap();
      },
      function (error) {
        // If the request fails, display an error message
        alert('Error: ' + error.message);
      }
    );
  } else {
    // If the Geolocation API is not supported, display a warning message
    alert('Warning: Geolocation API is not supported by this browser.');
  }
}

// Define a function to get the historical data of the user's location
function getHistoricalData() {
  // Use jQuery to load the CSV file
  $.get('data.csv', function (data) {
    // Parse the CSV data into an array of objects
    historicalData = $.csv.toObjects(data);
    // Update the map with the historical data of the user's location
    updateMap();
  });
}

// Define a function to update the map with the selected date
function updateMap() {
  // Get the selected year from the slider
  var year = $('#year').val();
  // Find the historical data for the selected year
  var historicalLocation = historicalData.find(function (item) {
    return item.year == year;
  });
  // Check if the historical data exists
  if (historicalLocation) {
    // Create an array of markers with the current and historical locations
    var markers = [
      {
        name: 'Current Location',
        coords: currentLocation,
      },
      {
        name: 'Historical Location',
        coords: [historicalLocation.longitude, historicalLocation.latitude],
      },
    ];
    // Set the markers on the map
    map.removeAllMarkers();
    map.addMarkers(markers);
    // Focus the map on the markers
    map.setFocus({ markers: [0, 1], animate: true });
  } else {
    // If the historical data does not exist, display a warning message
    alert('Warning: No historical data for the selected year.');
  }
}

// Define a function to handle the change event of the slider
function handleChange() {
  // Get the selected year from the slider
  var year = $('#year').val();
  // Display the selected year in the span element
  $('#year-value').text(year);
  // Update the map with the selected year
  updateMap();
}

// Call the initMap function when the document is ready
$(document).ready(initMap);

// Call the getCurrentLocation function when the document is ready
$(document).ready(getCurrentLocation);

// Call the getHistoricalData function when the document is ready
$(document).ready(getHistoricalData);

// Add a change event listener to the slider
$('#year').on('change', handleChange);
