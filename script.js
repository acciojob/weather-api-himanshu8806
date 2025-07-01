function getCurrentWeather() {
  const apiKey = "YOUR_API_KEY"; // 🔑 Replace with your OpenWeatherMap API key

  // Check for geolocation support
  if (!navigator.geolocation) {
    alert("Geolocation is not supported by your browser.");
    return;
  }

  // Get user's current location
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

      fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          const city = data.name;
          const weather = data.weather[0].main;
          const tempCelsius = (data.main.temp - 273.15).toFixed(1);

          document.getElementById("weatherData").textContent =
            `Current weather in ${city}: ${weather}, ${tempCelsius}°C`;
        })
        .catch((error) => {
          document.getElementById("weatherData").textContent =
            "Failed to fetch weather: " + error.message;
        });
    },
    (error) => {
      document.getElementById("weatherData").textContent =
        "Geolocation error: " + error.message;
    }
  );
}

