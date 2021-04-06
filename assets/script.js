var alertEl = document.querySelector(".alert");
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
    unit: "celsius"
}

function getCurrentWeather(){
    var cityEl = JSON.parse(localStorage.getItem("newCity"));
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

var futureDate = document.querySelector(".forcast-date p");
var futureIcon = document.querySelector(".forcast-icon");
var futureTemp = document.querySelector(".forcast-temp p");
var futureDescript = document.querySelector(".forcast-description p");
var future ={};
future.temperature = {
    unit: "celsius"
}


function displayFutureWeather(){
    futureDate.innerHTML= `${future.date}`;
    futureIcon.innerHTML= `<img src="./assets/icons/weather_icons/${future.iconId}.png">`;
    futureTemp.innerHTML= `${future.temperature.value} degrees <span>F</span>`;
    futureDescript.innerHTML= `${future.description}`;
}

function getFutureWeather(){
    var cityEl = JSON.parse(localStorage.getItem("newCity"));
    var futureAPI = `https://api.openweathermap.org/data/2.5/forecast?q=${cityEl}&appid=${apiKey}`
     fetch(futureAPI)
     .then(response => response.json())
     .then(data => console.log(data));

    fetch(futureAPI).then(function(response){
        var data = response.json();
        return data;
    })
    .then(function(data) {
        future.temperature.value = Math.floor(data.list[2].main.temp - kelvin);
        future.description = data.list[2].weather[0].description;
        future.iconId = data.list[2].weather[0].icon;
        future.date = data.list[2].dt_txt;
    })
    .then(function(){
        displayFutureWeather();
    });
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
    saveSearch();
    getCurrentWeather();
    getFutureWeather();
});
