const apiKey = "OWIxZWI3ZjZiMGR0YTNjYTM0YTY0MDU3NDdlODg1bzE=";

    function updateBackground(weatherDescription) {
      const weatherApp = document.querySelector(".weather-app");
      let gradient;

      switch (weatherDescription.toLowerCase()) {
        case "clear sky":
          gradient = "linear-gradient(to bottom, #FFD700, #FF8C00)"; // Sunny
          break;
        case "cloudy":
        case "overcast clouds":
          gradient = "linear-gradient(to bottom, #D3D3D3, #A9A9A9)"; // Cloudy
          break;
          case "scattered clouds":
          gradient ="linear-gradient(to bottom, #A9A9A9, #DCDCDC, #87CEEB)";// scattered clouds
          break;
          case "mist":
          case "fog":
            gradient ="linear-gradient(to bottom, #BFC9CA, #E5E8E8)";// Mist or Fog
          break;
          case "clear night":
          gradient ="radial-gradient(circle, #1A1A40, #000080)";// Clear Sky
          break;
          case "Haze":
          case "dust":
          gradient ="linear-gradient(to bottom, #F4A460, #DEB887)"; // Haze or Dust
          break;
        case "rain":
        case "moderate rain":
        case "light rain":
          gradient = "linear-gradient(to bottom, #4A90E2, #50C9C3)"; // Rainy
          break;
        case "storm":
        case "thunderstorm":
          gradient = "linear-gradient(to bottom, #2C3E50, #4C6A92)"; // Stormy
          break;
        case "snow":
        case "light snow":
          gradient = "linear-gradient(to bottom, #FFFFFF, #D8EAF6)"; // Snowy
          break;
        default:
          gradient = "linear-gradient(to bottom, #f9f7fe, #eae8f5)"; // Default
      }

      weatherApp.style.background = gradient;
    }

    function search(event) {
      event.preventDefault();
      const userValue = document.querySelector("form input.search-input").value.trim();

      if (!userValue.length) return;

      const apiUrl = `https://api.shecodes.io/weather/v1/current?query=${userValue}&key=${atob(
        apiKey
      )}&units=metric`;
      axios
        .get(apiUrl)
        .then((res) => {
          const { status, temperature, city, condition, wind } = res.data;
          if (status === "not_found") {
            return alert("City not found, please try another city.");
          }

          try {
            document.querySelector("#current-city").textContent = city;
            document.querySelector(".current-temperature-value").textContent =
              Math.round(temperature.current);
            document.querySelector("img.current-temperature-icon").src = condition.icon_url;
            document.querySelector(
              "p.current-details"
            ).innerHTML = `<span id="current-date">${formatDate(
              new Date(res.data.time * 1000)
            )}</span>, ${condition.description} <br/>Humidity: <strong>${
              temperature.humidity
            }%</strong>, Wind: <strong>${wind.speed} km/h</strong>`;

            // Update the background based on weather description
            updateBackground(condition.description);
          } catch (err) {
            console.error(err.message);
          }
        })
        .catch((error) => {
          console.error("Error fetching the weather data:", error);
          alert("Unable to fetch weather data. Please try again.");
        });
    }

    function formatDate(date) {
      let minutes = date.getMinutes();
      let hours = date.getHours();
      let day = date.getDay();

      if (minutes < 10) {
        minutes = `0${minutes}`;
      }

      if (hours < 10) {
        hours = `0${hours}`;
      }

      let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];

      let formattedDay = days[day];
      return `${formattedDay} ${hours}:${minutes}`;
    }

    let searchForm = document.querySelector("#search-form");
    searchForm.addEventListener("submit", search);

    let currentDateELement = document.querySelector("#current-date");
    let currentDate = new Date();

    currentDateELement.innerHTML = formatDate(currentDate);