const tempC = document.querySelector(".temp_C");
const tempF = document.querySelector(".temp_F");
const weatherCondition = document.querySelector(".condition");
const windDirection = document.querySelector(".wind_dir");
const windDegree = document.querySelector(".wind_degree");
const humidity = document.querySelector(".humidity");
const cityInput = document.querySelector("#cityInput");
const btn = document.querySelector("#btn");
const error = document.querySelector(".error");
const weatherDetails = document.querySelector(".weather_details");
const cityName = document.querySelector(".cityName");
const weatherConditionImg = document.querySelector(".weather-img img");

// search on Enter
cityInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        btn.click();
    }
});

async function getWeather(cityName) {
    const apiKey = "5c052100e75b4e3a9aa121333250211";
    const baseUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(
        cityName
    )}&aqi=no`;
    try {
        const res = await fetch(baseUrl);
        if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
        return await res.json();
    } catch (error) {
        return { error: { message: error.message } };
    }
}

function showError(message) {
    error.textContent = message;
    error.classList.remove("hidden");
    weatherDetails.classList.add("hidden");
}

function showWeather(data) {
    cityName.textContent = data.location.name;
    tempC.textContent = ` ${data.current.temp_c} C° `;
    tempF.textContent = ` ${data.current.temp_f} °F`;
    weatherCondition.textContent = data.current.condition.text.toUpperCase();
    weatherConditionImg.src = data.current.condition.icon;
    windDirection.textContent = data.current.wind_dir;
    windDegree.textContent = data.current.wind_degree;
    humidity.textContent = data.current.humidity;

    weatherDetails.classList.remove("hidden");
    error.classList.add("hidden");
}

btn.addEventListener("click", async () => {
    const city = cityInput.value.trim();
    if (!city) return showError("City name required!");

    btn.disabled = true;
    btn.textContent = "Loading...";

    const data = await getWeather(city);

    btn.disabled = false;
    btn.textContent = "Search";

    if (data.error) return showError(data.error.message);

    showWeather(data);
    cityInput.value = "";
    console.log(data);
});
