
 var cities = ["Austin", "Chicago", "New York", "Orlando", "San Francisco"];

 function displayWeatherInfo() {

    $(".currentWeather").empty();
    $(".forcastSec").empty();

    var city = $(this).attr("data-name");
    var queryURLLocation = "https://api.openweathermap.org/data/2.5/weather?q="+ city +"&appid=166a433c57516f51dfab1f7edaed8413";
    // Creating an AJAX call for the specific movie button being clicked
    $.ajax({
      url: queryURLLocation,
      method: "GET"
    })      
    .then(function(response) {

      https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
      
      console.log(response);

      var cityLat = response.coord.lat;
      var cityLon = response.coord.lon;

      console.log(cityLat);
      console.log(cityLon);

      var queryURLCurrent = "https://api.openweathermap.org/data/2.5/onecall?lat=" + cityLat + "&lon=" + cityLon + "&appid=166a433c57516f51dfab1f7edaed8413";

        $.ajax({
          url: queryURLCurrent,
          method: "GET"
        })      
        .then(function(response2) {

          https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
          
          console.log(response2);
      
          var cityDiv = $("<h2 class='currentCity'>").text(city);
          var tempF = (response2.current.temp - 273.15) * 1.80 + 32;
          var pTemp = $("<p>").text("Temperature : " + tempF.toFixed(2) + " °F");
          var pHum = $("<p>").text("Humidity : " + response2.current.humidity + " %");
          var pWind = $("<p>").text("Wind Speed : " + response2.current.speed + " MPH");
          var pUV = $("<p>").text("UV Index : " + response2.current.uvi );


          $("#currentWeather").append(cityDiv, pTemp, pHum, pWind, pUV);

      
    });
   
    
      // Date
      // Image
      // Date-temp
      // Date-humidity
      
    })
      


 }
// Initial array of Cities


// Function for displaying movie data
function renderButtons() {

  $("#buttons-view").empty();

  // Looping through the array of movies
  for (var i = 0; i < cities.length; i++) {

    // Then dynamicaly generating buttons for each movie in the array
    // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
    var cityBtn = $("<button>");
    // Adding a class of movie to our button
    cityBtn.addClass("city list-group-item");
    // Adding a data-attribute
    cityBtn.attr("data-name", cities[i]);
    // Providing the initial button text
    cityBtn.text(cities[i]);
    // Adding the button to the HTML
    $("#buttons-view").append(cityBtn);
  }
}

// This function handles events where one button is clicked
$("#add-city").on("click", function(event) {
  // Preventing the buttons default behavior when clicked (which is submitting a form)
  event.preventDefault();
  // This line grabs the input from the textbox
  var city = $("#city-input").val().trim();

  // Adding the movie from the textbox to our array
  cities.push(city);

  // Calling renderButtons which handles the processing of our movie array
  renderButtons();

});

$(document).on("click", ".city", displayWeatherInfo);

renderButtons();

