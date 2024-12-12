
const buttons = document.querySelectorAll('.sidebar-btn');
const pages = document.querySelectorAll('.page');

// Add event listeners to sidebar buttons
buttons.forEach((button) => {
  button.addEventListener('click', () => {
    // Remove 'active' class from all buttons
    buttons.forEach((btn) => btn.classList.remove('active'));

    // Add 'active' class to the clicked button
    button.classList.add('active');

    // Get the target page from the data-target attribute
    const target = button.getAttribute('data-target');

    // Hide all pages
    pages.forEach((page) => page.classList.remove('active'));

    // Show the selected page
    document.getElementById(target).classList.add('active');
  });
});
const apiKey = '6309a7fdbbb54a28d9342fa4859e15c0';

  // Function to fetch weather data
  function fetchWeather(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.cod === 200) {
          updateWeatherWidget(data);
        } else {
          alert('City not found. Please try again.');
        }
      })
      .catch((error) => {
        console.error('Error fetching weather data:', error);
        alert('Unable to fetch weather data. Please try again later.');
      });
  }

  // Function to update the weather widget
  function updateWeatherWidget(data) {
    const cityName = data.name;
    const temperature = Math.round(data.main.temp);
    const weatherDescription = data.weather[0].description;
    const weatherIconCode = data.weather[0].icon;
    const windSpeed = data.wind.speed;
    const humidity = data.main.humidity;
    const pressure = data.main.pressure;

    // Update the widget content
    document.getElementById('city-name').textContent = cityName;
    document.getElementById('temperature').textContent = `${temperature}°C`;
    document.getElementById('weather-description').textContent = weatherDescription;
    document.getElementById('wind-speed').textContent = `${windSpeed} km/h`;
    document.getElementById('humidity').textContent = `${humidity}%`;
    document.getElementById('pressure').textContent = `${pressure} hPa`;

    // Update the weather icon
    document.getElementById('weather-icon').src = `http://openweathermap.org/img/wn/${weatherIconCode}@2x.png`;

    // Dynamically update the background
    const weatherBackground = document.getElementById('weather-background');
    if (weatherDescription.includes('cloud')) {
      weatherBackground.style.backgroundImage = "url('/cloudy-bg.jpg')";
    } else if (weatherDescription.includes('rain')) {
      weatherBackground.style.backgroundImage = "url('/rainy-bg.jpg')";
    } else if (weatherDescription.includes('clear')) {
      weatherBackground.style.backgroundImage = "url('/clear-bg.jpg')";
    } else {
      weatherBackground.style.backgroundImage = "url('/default-cloud.jpg')";
    }
  }

  // Function to fetch air pollution data based on city coordinates
  async function fetchAirPollution(city) {
    const geoApiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;

    try {
      const geoResponse = await fetch(geoApiUrl);
      const geoData = await geoResponse.json();
      if (geoData.length === 0) {
        alert('City not found.');
        return;
      }

      const { lat, lon } = geoData[0];
      const airPollutionApiUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;

      const airPollutionResponse = await fetch(airPollutionApiUrl);
      const airPollutionData = await airPollutionResponse.json();

      // Extract components from the air pollution data
      const components = airPollutionData.list[0].components;
      const tableBody = document.querySelector("#result-table tbody");
      tableBody.innerHTML = ""; // Clear previous results

      // Populate the table with air quality data
      for (const [component, value] of Object.entries(components)) {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${component}</td>
          <td>${value.toFixed(2)}</td>
        `;
        tableBody.appendChild(row);
      }

      // Show the table
      document.getElementById("result-table").classList.remove("hidden");
    } catch (error) {
      console.error("Error fetching air pollution data:", error);
      alert("An error occurred while fetching air pollution data. Please try again later.");
    }
  }

  // Event listener for fetching both weather and air quality data
  document.getElementById('fetch-weather-btn').addEventListener('click', () => {
    const cityInput = document.getElementById('city-input').value.trim();
    if (cityInput) {
      // Fetch both weather and air pollution data when the button is clicked
      fetchWeather(cityInput);
      fetchAirPollution(cityInput);
    } else {
      alert('Please enter a city name.');
    }
  });
  const openModalButton = document.getElementById('open-modal');
  const closeModalButton = document.getElementById('close-modal');
  const modal = document.getElementById('modal');
  const mainContent = document.getElementById('main-content');

  // Open modal
  openModalButton.addEventListener('click', () => {
    modal.classList.add('active');
    mainContent.classList.add('blur-background');
  });

  // Close modal
  closeModalButton.addEventListener('click', () => {
// Remove modal and blur effect
modal.classList.remove('active');
mainContent.classList.remove('blur-background');

// Explicitly remove 'active' class from all pages
document.querySelectorAll('.page').forEach((page) => page.classList.remove('active'));

// Add 'active' class to the home section
document.getElementById('home').classList.add('active');

// Optionally, reset the sidebar button active state (if needed)
document.querySelectorAll('.sidebar-btn').forEach((btn) => btn.classList.remove('active'));
document.querySelector('[data-target="home"]').classList.add('active');
});