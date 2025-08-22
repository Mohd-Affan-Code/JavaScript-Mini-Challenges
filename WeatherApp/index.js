let apiKey = "b592550cf9f6b675e513ed4f45558174";

const btn = document.querySelector(".search-button");
const searchBox = document.getElementById("search-input");
const weatherImg = document.querySelector(".weather-img");

let inputValue = "";

function getWeather(city) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
  )
    .then((res) => res.json())
    .then((data) => {
      if (data.cod === "404") {
        alert("⚠ City not found! Please enter a valid city.");
      } else {
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".weather-digree").innerHTML =
          Math.round(data.main.temp - 273.15) + "ºC";
        document.querySelector(".humidity-digree").innerHTML =
          data.main.humidity + "%";
        document.querySelector(".wind-digree").innerHTML =
          data.wind.speed + "km/h";

        if (data.weather[0].main === "Clouds") {
          weatherImg.src = "Assets/clouds.png";
        } else if (data.weather[0].main === "Clear") {
          weatherImg.src = "Assets/clear.png";
        } else if (data.weather[0].main === "Drizzle") {
          weatherImg.src = "Assets/drizzle.png";
        } else if (data.weather[0].main === "Rain") {
          weatherImg.src = "Assets/rain.png";
        } else if (data.weather[0].main === "Mist") {
          weatherImg.src = "Assets/mist.png";
        } else if (data.weather[0].main === "Snow") {
          weatherImg.src = "Assets/snow.png";
        }
      }
    })
    .catch((error) => console.error("Error:", error));
}

searchBox.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    if (searchBox.value.trim() === "") {
      alert("⚠ Please enter a city name!");
      return;
    }
    getWeather(searchBox.value.trim());
    searchBox.value = " ";
  }
});

btn.addEventListener("click", () => {
  if (inputValue === "") {
    alert("⚠ Please enter a city name!");
    return;
  }
  getWeather(inputValue);
});
