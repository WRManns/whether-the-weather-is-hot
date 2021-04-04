var alertEl = document.querySelector(".alert");
var iconEl = document.querySelector(".weather-icon");
var tempEl = document.querySelector(".temp-display p");
var descriptEl = document.querySelector(".weather-description p");
var locationEl = document.querySelector(".location p");

function displayWeather(){
iconEl.innerHTML= `<img src="icons/${weather.iconID}.png"/>`;
tempEl.innerHTML= `${weather.temperature.value}`;
desctiptEl= `${weather.description}`;
locationEl= `${weather.city}`;
}

var kelvin= 273;
var apiKey= "";
var weather ={}