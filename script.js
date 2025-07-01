//your JS code here. If required.
function getWeather() {
  const apiKey = "YOUR_API_KEY"; 
  const city = "London";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.status);
      }
      return response.json();
    })
    .then(data => {
      const weather = data.weather[0].main;
      document.getElementById("weatherData").textContent =
        `Current weather in ${city}: ${weather}`;
    })
    .catch(error => {
      document.getElementById("weatherData").textContent =
        "Error fetching weather data: " + error.message;
    });
}
