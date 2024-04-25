const apiKey="7f2847f45cfd99c08cd9d979d939bb21";
const apiUrl="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon =document.querySelector(".weather-icon");

async function checkWeather(city){
    const response = await fetch(apiUrl+ city +`&appid=${apiKey}`);

    if(response.status ==404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
    else{
    var data= await response.json();
    
    document.querySelector('.city').innerHTML = data.name;
    document.querySelector('.temp').innerHTML = Math.round(data.main.temp )+ "°C";
    document.querySelector('.humidity').innerHTML = data.main.humidity + "%";
    document.querySelector('.wind').innerHTML = data.wind.speed + " km/h";

    if(data.weather[0].main == 'cloud'){
        weatherIcon.src = "/images/clouds.png";
        
    }
    else if(data.weather[0].main == 'clear'){
        weatherIcon.src = "/images/clear.png";
    }
    else if(data.weather[0].main == 'Rain'){
        weatherIcon.src = "/images/rain.png";
    }
    else if(data.weather[0].main == 'Drizzle'){
        weatherIcon.src = "/images/drizzle.png";
    }
    else if(data.weather[0].main == 'Mist'){
        weatherIcon.src = "/images/mist.png";
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
    }

}

searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
})
function updateDateTime() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    const dateTimeString = now.toLocaleDateString('en-US', options);
    
    const dateElement = document.getElementById('date');
    const timeElement = document.getElementById('time');
    
    dateElement.textContent = dateTimeString.split(',')[0];
    timeElement.textContent = dateTimeString.split(',')[1];
}

// Function to update weather icon based on temperature
function updateWeatherIcon(temperature) {
    const weatherIcon = document.querySelector('.weather-details');
    if (temperature > 20) {
        weatherIcon.src = "/images/sunny.png"; // Change the path to the sunny weather icon
    } else {
        weatherIcon.src = "/images/clouds.png"; // Change the path to the cloudy weather icon
    }
}
// Call the function to initially display date and time
updateDateTime();

// Call the function to initially update weather icon based on default temperature
updateWeatherIcon(); // Example temperature, replace with actual temperature value
// Update date and time every second
setInterval(updateDateTime, 1000);

