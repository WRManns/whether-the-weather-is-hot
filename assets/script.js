var alertEl = document.querySelector(".alert");
var iconEl = document.querySelector(".weather-icon");
var tempEl = document.querySelector(".temp-display p");
var descriptEl = document.querySelector(".weather-description p");
var locationEl = document.querySelector(".location p");


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
    unit: "celsius"
}

function getCurrentWeather(){
    var cityEl = JSON.parse(localStorage.getItem("inputCity"));
    var apiOpenWeather= `https://api.openweathermap.org/data/2.5/weather?q=${cityEl},us&appid=${apiKey}`
    fetch(apiOpenWeather).then(function(response){
        var data = response.json();
        return data;
    })

    .then(function(data) {
        weather.temperature.value = Math.floor(data.main.temp - kelvin);
        weather.description = data.weather[0].description;
        weather.iconId = data.weather[0].icon;
        weather.city = data.name;
    })
    .then(function(){
        displayCurrentWeather();
    });
}

function displayFutureWeather(){
    
}

function saveSearch(){
    var cityCodeEl = document.getElementById("inputCity");
    localStorage.setItem("inputCity", JSON.stringify(cityCodeEl.value));
}

var submitBtn = document.getElementById("submitBtn");
submitBtn.addEventListener('click', function(event) {
    event.preventDefault();
    saveSearch();
    getCurrentWeather();
    
});
