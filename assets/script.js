
var iconEl = document.querySelector(".weather-icon");
var tempEl = document.querySelector(".temp-display p");
var descriptEl = document.querySelector(".weather-description p");
var locationEl = document.querySelector(".location p");
var savedCity= [];


function displayCurrentWeather(){
iconEl.innerHTML= `<img src="./assets/icons/weather_icons/${weather.iconId}.png">`;
tempEl.innerHTML= `${weather.temperature.value} degrees <span>F</span>`;
descriptEl.innerHTML= `${weather.description}`;
locationEl.innerHTML= `${weather.city}`;
}
    
var kelvin= 273;
var apiKey= "f23aca6d8b3d3632bf98bda960b7e9a6";
var weather ={};
weather.temperature = {
}

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
        displayCurrentWeather();
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
    forecastCard.classList.add("card","col-2");
    
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


