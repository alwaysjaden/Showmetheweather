
// Initial array of Cities
 var cities = ["Austin", "Chicago", "New York", "Orlando", "San Francisco"];
 

    
 // display weather info of selected button

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

      console.log(response);
        // get Selected City's Lat/Lon to get API call from other API list
      var cityLat = response.coord.lat;
      var cityLon = response.coord.lon;

      var queryURLCurrent = "https://api.openweathermap.org/data/2.5/onecall?lat=" + cityLat + "&lon=" + cityLon + "&appid=166a433c57516f51dfab1f7edaed8413";

        $.ajax({
          url: queryURLCurrent,
          method: "GET"
        })      
        .then(function(response2) {

          console.log(response2);
            // Display City + Date + Weather on Screen
          
          
          var fmt1 = 'MM/DD/YYYY ';
          let date = moment().format(fmt1);;
          
          var cityDiv = $("<h2 class='currentCity'>").text(city + " ( " + date + ")");
          var CurIconNum = (response2.current.weather[0]["icon"]);
          console.log(CurIconNum);
          var currentWeather = $("<img>");
          currentWeather.attr("src","http://openweathermap.org/img/wn/"+ CurIconNum +"@2x.png");



            // Get/Display Current Weather Detail
          var tempF = (response2.current.temp - 273.15) * 1.80 + 32;
          var pTemp = $("<div>").text("Temperature : " + tempF.toFixed(2) + " °F");
          var pHum = $("<div>").text("Humidity : " + response2.current.humidity + " %");
          var pWind = $("<div>").text("Wind Speed : " + response2.current.wind_speed + " MPH");
          var uvtext = $('<div class="uvText column">').text("UV Index : " );

          $("#currentWeather").append(cityDiv, currentWeather, pTemp, pHum, pWind,uvtext);
          $(".currentCity").append(currentWeather);

          var uvnum = $('<a class="uvindex column">').text(response2.current.uvi );
          $(".uvText").append(uvnum);

         

          // var pUV = $('<p class="uvindex">').text("UV Index : " + response2.current.uvi );
          

          // var uvtext = $('<div class="uvText column">').text("UV Index : " );
          // var uvnum = $('<div class="uvindex column">').text(response2.current.uvi );

          // $(".uvRow").append(uvtext,uvnum );





          if ( response2.current.uvi <= 2.9 && response2.current.uvi >= 0)
          { $(".uvindex").attr("class","uvindex green");
            } else if (response2.current.uvi <= 5.9 && response2.current.uvi >= 3) {
                $(".uvindex").attr("class","uvindex yellow");
            } else if (response2.current.uvi <= 7.9 && response2.current.uvi >= 6) {
              $(".uvindex").attr("class","uvindex orange");
            } else if (response2.current.uvi <= 10.9 && response2.current.uvi >= 8) {
              $("moment().format()uvindex").attr("class","uvindex red");
            } else { 
              $(".uvindex").attr("class","uvindex violet");
            }
          
          var forcastText = $("<h4>").text("5 Day Forcast")
          var forcastData = $("<div class='forcast5day row'>");
          $(".forcastSec").append(forcastText,forcastData);

        for (var i =0; i<5 ; i++){
          var forcastCol = $('<div class="forcasts col-sm-2 rounded">');
          $(".forcast5day").append(forcastCol);

          // Get Date Value with moment.js
          var fmt1 = 'MM/DD/YYYY ';
          let future = moment().add(+[i]+1,'days');
          var futureDate = moment(future).format(fmt1);

         
          var pDate = $("<h4>").text(futureDate);
          var futIconNum = (response2.daily[i].weather[0]["icon"]);
          console.log(futIconNum)
          var pWeather = $("<img>");
          pWeather.attr("src","http://openweathermap.org/img/wn/"+ futIconNum +"@2x.png");

          var pTemp = $("<p>").text("Temp : " + tempF.toFixed(2) + " °F");
          var pHum = $("<p>").text("Humidity : " + response2.daily[i].humidity + " %");
          var forcastCol = document.querySelectorAll(".forcasts");
          
          $(forcastCol[i]).append(pDate,pWeather, pTemp, pHum);
          
         
        };      
    });
 });
}



// Function for displaying city data
function renderButtons() {

  $("#buttons-view").empty();

  // Looping through the array of city
  for (var i = 0; i < cities.length; i++) {

    // Then dynamicaly generating buttons for each city in the array
    // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
    var cityBtn = $("<button>");
    // Adding a class of city to our button
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

  // Adding the city from the textbox to our array
  cities.push(city);

  // Calling renderButtons which handles the processing of our city array
  renderButtons();

});

$(document).on("click", ".city", displayWeatherInfo);

renderButtons();

