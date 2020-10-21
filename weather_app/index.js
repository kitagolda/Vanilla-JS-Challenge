const form = document.getElementById('form');
const search = document.getElementById('search');
const main = document.getElementById('main');

const API_KEY = '3265874a2c77ae4a04bb96236a642d2f';

const url = (location) => `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`;

async function getWeatherByLocation(location) {
    const data = await (await (await fetch(url(location))).json())

    addWeatherToPage(data);
}

function KtoC(K) {
    return Math.ceil(K - 273.15);
}

function addWeatherToPage(data) {
    const temp = KtoC(data.main.temp);

    const weather = document.createElement('div');
    weather.classList.add('weather');

    weather.innerHTML = `
        <h1>${data.name}</h1>
        <h2>${temp}C</h2>
        <h2>${data.weather[0].main}</h2>
        <h3>Feels like: ${KtoC(data.main.feels_like)}</h3>
        <h3>${data.weather[0].description}</h3>
        <h4>Wind speed: ${data.wind.speed} m/s</h4>
    `;

    main.appendChild(weather);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    main.innerHTML = '';

    const location = search.value;

    if(location){
        getWeatherByLocation(location);
    }
});