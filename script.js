const apiKey = "ec0de15f59ed2fa8777a31c17056d21e";

function getWeather() {
    const city = document.getElementById("cityInput").value.trim();

    if (city === "") {
        alert("Please enter a city name");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        city
    )}&units=metric&appid=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === "404" || data.cod === "400") {
                alert("City not found");
                return;
            }

            document.getElementById("cityName").innerText = data.name;
            document.getElementById("temperature").innerText =
                `Temperature`;
            document.getElementById("description").innerText =
                `Condition`;
            document.getElementById("humidity").innerText =
                `Humidity`;
            document.getElementById("wind").innerText =
                `Wind`;

            // Show values aligned on right using spans
            document.getElementById("temperature").innerHTML =
                `<span class="weather-label">Temperature</span><span class="weather-value">${data.main.temp} °C</span>`;
            document.getElementById("description").innerHTML =
                `<span class="weather-label">Condition</span><span class="weather-value">${data.weather[0].description}</span>`;
            document.getElementById("humidity").innerHTML =
                `<span class="weather-label">Humidity</span><span class="weather-value">${data.main.humidity}%</span>`;
            document.getElementById("wind").innerHTML =
                `<span class="weather-label">Wind</span><span class="weather-value">${data.wind.speed} m/s</span>`;

            const resultBox = document.getElementById("weatherResult");
            resultBox.classList.remove("hidden");
        })
        .catch(error => {
            alert("Error fetching data");
            console.error(error);
        });
}
