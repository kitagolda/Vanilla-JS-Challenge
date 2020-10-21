const API_KEY = '3265874a2c77ae4a04bb96236a642d2f';

const url = (location) => `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`;

async function getWeatherByLocation(location){
    const data = await(await (await fetch(url(location))).json())

    console.log(data);
}

getWeatherByLocation('London');