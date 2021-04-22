//Code to created the card and text for current weather
function renderCurrentWeather(){
    var currentCard = document.createElement("div");
    var currentCity = document.createElement("h4");
    var currentIcon = document.createElement("img");
    var currentTemp = document.createElement("p");
    var currentHumidity = document.createElement("p");
    var currentWind = document.createElement("p");

    currentIcon.src = `./assets/icons/weather_icons/${weather.iconId}.png`;

//string literals to move the data to variable that we can use to display
    currentCity.textContent = `${weather.city}`;
    currentTemp.textContent =`${weather.temperature.value} degrees F`; 
    currentHumidity = `Humidity: ${weather.humidity}% `;
    currentWind = `Wind Speed: ${weather.wind} mph`;

    currentCard.append(currentCity);
    currentCard.append(currentIcon);
    currentCard.append(currentTemp);
    currentCard.append(currentHumidity);
    currentCard.append(currentWind);

    //sppending the entire card to the HTML
    document.querySelector(".weather-display").append(currentCard);
}
 //setting constant variables for kelvin, apikey, and empty objects to be filled with api data   
var kelvin= 273;
var apiKey= "f23aca6d8b3d3632bf98bda960b7e9a6";
var weather ={};
weather.temperature = {};

//getting the api data for searched city
function getCurrentWeather(){
    var cityEl = JSON.parse(localStorage.getItem("newCity"));
    var apiOpenWeather= `https://api.openweathermap.org/data/2.5/weather?q=${cityEl},us&appid=${apiKey}`
    fetch(apiOpenWeather)
     .then(response => response.json())
     .then(data => console.log(data));
    fetch(apiOpenWeather).then(function(response){
        var data = response.json();
        return data;
    })

    //tying in the data to object elements for use
    .then(function(data) {
        weather.temperature.value = Math.floor(data.main.temp - kelvin);
        weather.iconId = data.weather[0].icon;
        weather.city = data.name;
        weather.humidity = data.main.humidity;
        weather.wind = data.wind.speed;
        //converting temp value from kelvin to farhenheit
        weather.temperature.value = weather.temperature.value * 9/5 + 32; 
    })
    //now that data is gathered, we can create the card
    .then(function(){
        renderCurrentWeather();
    });
}

//more empty objects to hold forecast data
var future ={};
future.temperature = {};

//creating the cards to display forecast info
function renderForecast() {

    var forecastCard = document.createElement("div");
    var futureDate = document.createElement("h4");
    var futureIcon = document.createElement("img");
    var futureTemp = document.createElement("p");
    var futureHumidity = document.createElement("p");
    var futuretWind = document.createElement("p");
    forecastCard.classList.add("card","col-6","col-md-2","text-center");
 
    futureIcon.src = `./assets/icons/weather_icons/${future.iconId}.png`;

    futureDate.textContent = `${future.date}`;
    futureTemp.textContent =`${future.temperature.value} degrees F`; 
    futureHumidity = `Humidity: ${future.humidity}% `;
    futuretWind = `Wind Speed: ${future.wind} mph`;

    forecastCard.append(futureDate);
    forecastCard.append(futureIcon);
    forecastCard.append(futureTemp);
    forecastCard.append(futureHumidity);
    forecastCard.append(futuretWind);

    document.querySelector(".forcast-weather").append(forecastCard);
  }
//getting the api data for forecast
function getFutureWeather(){
    var cityEl = JSON.parse(localStorage.getItem("newCity"));
    var futureAPI = `https://api.openweathermap.org/data/2.5/forecast?q=${cityEl}&appid=${apiKey}`
     fetch(futureAPI)
     .then(response => response.json())
     .then(forecast => console.log(forecast));

    fetch(futureAPI).then(function(response){
        var forecast = response.json();
        return forecast;
    })

    //loop function that will collect the correct data and render cards
    .then(function(data) {
        for (i=3; i < data.list.length;i = i+8) {
         future.temperature.value = Math.floor(data.list[i].main.temp - kelvin);
         future.iconId = data.list[i].weather[0].icon;
         future.date = data.list[i].dt_txt;
         future.humidity = data.list[i].main.humidity;
         future.wind = data.list[i].wind.speed;
         future.temperature.value = future.temperature.value * 9/5 + 32; 
         console.log(future);
         
         //converting the date from UNIX to something a little more user friendly
         function timeConverter(dateFuture){
            var dateFuture = data.list[i].dt_txt;
            var a = new Date(dateFuture);
            var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
            var month = months[a.getMonth()];
            var date = a.getDate();
            var time = date + ' ' + month;
            return time;
          }
          
          future.date= timeConverter(0);

          renderForecast();  
             
        }});
}

//saving the city to local storage to be used in other functions for data gathering and display
function saveSearch(){
    var newCity = document.getElementById("inputCity");
    
    localStorage.setItem("newCity", JSON.stringify(newCity.value));
   
    

};

//creates a list of past searches
function renderHistory(){
    var cityEl = JSON.parse(localStorage.getItem("newCity"));
    var searchList = document.createElement('li');
    searchList.classList.add('list-group-item');
    searchList.textContent = `${cityEl}`;
    
    document.querySelector(".search-history").append(searchList);

};

//event listener for the submit button that calls the functions in sequential order
var submitBtn = document.getElementById("submitBtn");
submitBtn.addEventListener('click', function(event) {
    event.preventDefault();
    document.querySelector(".current-weather").classList.remove("hidden");
    document.querySelector(".forcast-weather").classList.remove("hidden");
    
    clearCurrent();
    clearForcast();
    saveSearch();
    getCurrentWeather();
    getFutureWeather();
    renderHistory();
});

//functions to clear the cards for additional searches
function clearCurrent() {
    var current = document.querySelector(".weather-display")
    removeAllChildNodes(current);
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
  }
}

function clearForcast() {
    var forcast = document.querySelector(".forcast-weather")
    removeAllChildNodes(forcast);
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
  }
}



