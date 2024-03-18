const url ='https://api.openweathermap.org/data/2.5/weather?'
const icon_url = 'https://openweathermap.org/img/wn/'
const api_key = '' // Replace 'YOUR_API_KEY' with your actual API key

const temp_span = document.querySelector("#temp")
const speed_span = document.querySelector("#speed")
const description_span = document.querySelector("#description")
const icon_img = document.querySelector("#weatherIcon")

document.getElementById("fetchWeatherButton").addEventListener("click", () => {
    const location = document.getElementById("locationInput").value
    getWeatherByLocation(location)
});

function getWeatherByLocation(location) {
    const address = `${url}q=${location}&units=metric&appid=${api_key}`
    axios.get(address)
        .then(response => {
            const json = response.data
            temp_span.innerHTML = json.main.temp + '&#8451;'
            speed_span.innerHTML = json.wind.speed + ' m/s'
            description_span.innerHTML = json.weather[0].description
            const image = icon_url + json.weather[0].icon + '@2x.png'
            icon_img.src = image
            icon_img.style.display = 'block'
        })
        .catch(error => {
            alert("Weather data not found for the entered location. Please try again.")
            console.error(error)
        })
}