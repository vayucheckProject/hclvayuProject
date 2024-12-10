// API Key for OpenWeather
const apiKey = "6309a7fdbbb54a28d9342fa4859e15c0";

// Function to load the weather widget dynamically
function loadWeatherWidget(cityId) {
    // Clear any existing widget
    document.getElementById("openweather-widget").innerHTML = "";

    // Update widget parameters
    window.myWidgetParam = [];
    window.myWidgetParam.push({
        id: 15,
        cityid: cityId,
        appid: apiKey,
        units: "metric",
        containerid: "openweather-widget",
    });

    // Add the weather widget script
    const script = document.createElement("script");
    script.async = true;
    script.charset = "utf-8";
    script.src =
        "https://openweathermap.org/themes/openweathermap/assets/vendor/owm/js/weather-widget-generator.js";
    document.head.appendChild(script);
}

// Function to fetch the city ID from OpenWeather API
async function fetchCityId(cityName) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("City not found");
        const data = await response.json();
        return data.id; // Extract city ID from response
    } catch (error) {
        alert(error.message);
        return null;
    }
}

// Add event listener to the button
document.getElementById("update-widget").addEventListener("click", async () => {
    const cityName = document.getElementById("city-input").value.trim();
    if (cityName) {
        const cityId = await fetchCityId(cityName);
        if (cityId) {
            loadWeatherWidget(cityId);
        }
    } else {
        alert("Please enter a city name.");
    }
});