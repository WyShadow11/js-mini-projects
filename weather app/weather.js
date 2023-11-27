const apiKey = "bcdfe4fdd6782cf549ab7cb734d72f5c";
const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=metric";

const searchBtn = document.querySelector(".search button");
const searchInput = document.querySelector(".search input");
const image = document.querySelector(".weather img");

// Calls check weather app and uses the value in the input as argument
searchBtn.addEventListener("click", ()=>{
  checkWeather(searchInput.value);
});


async function checkWeather(city)
{
  // Calls API and waits for promise to be fulfilled
  const response = await fetch(apiURL + `&q=${city}` + `&appid=${apiKey}`);

  // Validates user input
  if (response.status == 404)
  {
    document.querySelector('.error').style.display = "block";
  }
  else
  {
    // Converts the response to json and awaits promise
    let data = await response.json();
    console.log(data);

    // Changes city name
    document.querySelector('.city').innerHTML = data.name;

    // Changes temp
    document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + '°C';

    // Changes Humidity
    document.querySelector('.humidity').innerHTML = data.main.humidity + '%';

    // Changes wind
    document.querySelector('.wind').innerHTML = data.wind.speed + ' km/h';

    // Changes weather iocon
    if (data.weather[0].main == 'Clear')
    {
      image.src = "./images/clear.png";
    }
    else if (data.weather[0].main == 'Clouds')
    {
      image.src = "./images/clouds.png";
    }
    else if (data.weather[0].main == 'Drizzle')
    {
      image.src = "./images/drizzle.png";
    }
    else if (data.weather[0].main == 'Mist')
    {
      image.src = "./images/mist.png";
    }
    else if (data.weather[0].main == 'Rain')
    {
      image.src = "./images/rain.png";
    }
    else if (data.weather[0].main == 'Snow')
    {
      image.src = "./images/snow.png";
    }
      
    // Displays the weather info when something is searched
    document.querySelector(".weather").style.display = "block";
    document.querySelector('.error').style.display = "none";
  }
}

