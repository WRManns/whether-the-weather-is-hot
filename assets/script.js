var alertEl = document.querySelector(".alert");
var iconEl = document.querySelector(".weather-icon");
var tempEl = document.querySelector(".temp-display p");
var descriptEl = document.querySelector(".weather-description p");
var locationEl = document.querySelector(".location p");

function displayWeather(){
//iconEl.innerHTML= `<img src="icons/${weather.iconID}.png"/>`;
tempEl.innerHTML= `${weather.temperature.value} degrees <span>F</span>`;
descriptEl.innerHTML= `${weather.description}`;
locationEl.innerHTML= `${weather.city}`;
}

var zipCode= "";
var kelvin= 273;
var apiKey= "f23aca6d8b3d3632bf98bda960b7e9a6";
var weather ={};
weather.temperature = {
    unit: "celsius"
}

var apiOpenWeather= `https://api.openweathermap.org/data/2.5/weather?zip=44144,us&appid=${apiKey}`

fetch(apiOpenWeather)
  .then(response => response.json())
  .then(data => console.log(data));
getWeather();
function getWeather(){
    fetch(apiOpenWeather).then(function(response){
        var data = response.json();
        return data;
    })
    .then(function(data) {
        weather.temperature.value = Math.floor(data.main.temp - kelvin);
        weather.description = data.weather[0].description;
        //weather.iconId = data.weather[0].icon;
        weather.city = data.name;

    })
    .then(function(){
        displayWeather();
    });


}