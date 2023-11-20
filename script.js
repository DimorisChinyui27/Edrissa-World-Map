// Initialize the map
function initMap() {
  // Create a map object and specify the DOM element for display.
  var map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 0, lng: 0 },
    zoom: 2,
    mapTypeId: "satellite",
  });

  // Add a listener for the click event on the map
  map.addListener("click", function (event) {
    // Zoom in to the clicked location
    map.setZoom(8);
    map.setCenter(event.latLng);
  });

  // Add a listener for the mouse wheel event on the map
  map.addListener("wheel", function (event) {
    // Zoom in or out depending on the wheel delta
    var zoom = map.getZoom();
    zoom += event.deltaY > 0 ? -1 : 1;
    map.setZoom(zoom);
  });
}
// Get the timeline buttons
var yearButton = document.getElementById("year");
var monthButton = document.getElementById("month");
var dayButton = document.getElementById("day");

// Get the div elements to hold the select elements
var yearSelectDiv = document.getElementById("year-select");
var monthSelectDiv = document.getElementById("month-select");
var daySelectDiv = document.getElementById("day-select");

// Create an array of years from 2000 to 2023
var years = [];
for (var i = 2000; i <= 2023; i++) {
  years.push(i);
}

// Create an array of months from January to December
var months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Create an object that maps each month to the number of days in it
var daysInMonth = {
  January: 31,
  February: 28, // Assume no leap year for simplicity
  March: 31,
  April: 30,
  May: 31,
  June: 30,
  July: 31,
  August: 31,
  September: 30,
  October: 31,
  November: 30,
  December: 31,
};

// Create a variable to store the selected month
var selectedMonth = null;

// Create a variable to store the current select element
var currentSelect = null;

// Add a click event listener for the year button
yearButton.addEventListener("click", function () {
  // Check if there is already a select element
  if (currentSelect) {
    // Remove the current select element from its parent
    currentSelect.parentNode.removeChild(currentSelect);
  }
  // Create a select element for the year
  var yearSelect = document.createElement("select");
  // Add an option for each year in the array
  for (var year of years) {
    var yearOption = document.createElement("option");
    yearOption.value = year;
    yearOption.textContent = year;
    yearSelect.appendChild(yearOption);
  }
  // Append the select element to the year select div
  yearSelectDiv.appendChild(yearSelect);
  // Update the current select element
  currentSelect = yearSelect;
  // Add a change event listener for the select element
  yearSelect.addEventListener("change", function () {
    // Get the selected year value
    var selectedYear = yearSelect.value;
    // Display the selected year in the button text
    yearButton.textContent = selectedYear;
    // Remove the select element from the year select div
    yearSelectDiv.removeChild(yearSelect);
    // Reset the current select element
    currentSelect = null;
  });
});

// Add a click event listener for the month button
monthButton.addEventListener("click", function () {
  // Check if there is already a select element
  if (currentSelect) {
    // Remove the current select element from its parent
    currentSelect.parentNode.removeChild(currentSelect);
  }
  // Create a select element for the month
  var monthSelect = document.createElement("select");
  // Add an option for each month in the array
  for (var month of months) {
    var monthOption = document.createElement("option");
    monthOption.value = month;
    monthOption.textContent = month;
    monthSelect.appendChild(monthOption);
  }
  // Append the select element to the month select div
  monthSelectDiv.appendChild(monthSelect);
  // Update the current select element
  currentSelect = monthSelect;
  // Add a change event listener for the select element
  monthSelect.addEventListener("change", function () {
    // Get the selected month value
    selectedMonth = monthSelect.value;
    // Display the selected month in the button text
    monthButton.textContent = selectedMonth;
    // Remove the select element from the month select div
    monthSelectDiv.removeChild(monthSelect);
    // Reset the current select element
    currentSelect = null;
  });
});

// Add a click event listener for the day button
dayButton.addEventListener("click", function () {
  // Check if there is already a select element
  if (currentSelect) {
    // Remove the current select element from its parent
    currentSelect.parentNode.removeChild(currentSelect);
  }
  // Check if a month has been selected
  if (selectedMonth) {
    // Create a select element for the day
    var daySelect = document.createElement("select");
    // Get the number of days in the selected month
    var days = daysInMonth[selectedMonth];
    // Add an option for each day in the range
    for (var i = 1; i <= days; i++) {
      var dayOption = document.createElement("option");
      dayOption.value = i;
      dayOption.textContent = i;
      daySelect.appendChild(dayOption);
    }
    // Append the select element to the day select div
    daySelectDiv.appendChild(daySelect);
    // Update the current select element
    currentSelect = daySelect;
    // Add a change event listener for the select element
    daySelect.addEventListener("change", function () {
      // Get the selected day value
      var selectedDay = daySelect.value;
      // Display the selected day in the button text
      dayButton.textContent = selectedDay;
      // Remove the select element from the day select div
      daySelectDiv.removeChild(daySelect);
      // Reset the current select element
      currentSelect = null;
    });
  } else {
    // If no month has been selected, display a message in the console
    console.log("Please select a month first");
  }
});

// Get the history toggle
var toggle = document.getElementById("toggle");

// Add a change event listener for the toggle
toggle.addEventListener("change", function () {
  // Check if the toggle is checked or not
  if (toggle.checked) {
    // If checked, display a message in the console
    console.log("Location history is on");
  } else {
    // If not checked, display a message in the console
    console.log("Location history is off");
  }
});
