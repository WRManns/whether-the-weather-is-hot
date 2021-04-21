
var savedCity= [];


function renderCurrentWeather(){
    var currentCard = document.createElement("div");
    var currentCity = document.createElement("p");
    var currentIcon = document.createElement("img");
    var currentTemp = document.createElement("p");
    var currentDescript = document.createElement("p");

    currentIcon.src = `./assets/icons/weather_icons/${weather.iconId}.png`;

    currentCity.textContent = `${weather.city}`;
    currentTemp.textContent =`${weather.temperature.value} degrees F`; 
    currentDescript = `${weather.description}`;

    currentCard.append(currentCity);
    currentCard.append(currentIcon);
    currentCard.append(currentTemp);
    currentCard.append(currentDescript);

    document.querySelector(".weather-display").append(currentCard);
}
    
var kelvin= 273;
var apiKey= "f23aca6d8b3d3632bf98bda960b7e9a6";
var weather ={};
weather.temperature = {};

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

    .then(function(data) {
        weather.temperature.value = Math.floor(data.main.temp - kelvin);
        weather.description = data.weather[0].description;
        weather.iconId = data.weather[0].icon;
        weather.city = data.name;
        weather.temperature.value = weather.temperature.value * 9/5 + 32; 
    })
    .then(function(){
        renderCurrentWeather();
    });
}

var future ={};
future.temperature = {};

function renderForecast() {

    var forecastCard = document.createElement("div");
    var futureDate = document.createElement("p");
    var futureIcon = document.createElement("img");
    var futureTemp = document.createElement("p");
    var futureDescript = document.createElement("p");
    forecastCard.classList.add("card","col-6","col-md-2");
    
    futureIcon.src = `./assets/icons/weather_icons/${future.iconId}.png`;

    futureDate.textContent = `${future.date}`;
    futureTemp.textContent =`${future.temperature.value} degrees F`; 
    futureDescript = `${future.description}`;

    forecastCard.append(futureDate);
    forecastCard.append(futureIcon);
    forecastCard.append(futureTemp);
    forecastCard.append(futureDescript);

    document.querySelector(".forcast-weather").append(forecastCard);
  }

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
    .then(function(data) {
        for (i=3; i < data.list.length;i = i+8) {
         future.temperature.value = Math.floor(data.list[i].main.temp - kelvin);
         future.description = data.list[i].weather[0].description;
         future.iconId = data.list[i].weather[0].icon;
         future.date = data.list[i].dt_txt;
         future.temperature.value = future.temperature.value * 9/5 + 32; 
         console.log(future);
         
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


function saveSearch(){
    var newCity = document.getElementById("inputCity");
    
    localStorage.setItem("newCity", JSON.stringify(newCity.value));
    var savedCity = JSON.parse(localStorage.getItem("savedCity"));
    savedCity.push(newCity)
    localStorage.setItem("savedCity", JSON.stringify(savedCity));
    
}

var submitBtn = document.getElementById("submitBtn");
submitBtn.addEventListener('click', function(event) {
    event.preventDefault();
    document.querySelector(".current-weather").classList.remove("hidden");
    saveSearch();
    getCurrentWeather();
    getFutureWeather();
});


