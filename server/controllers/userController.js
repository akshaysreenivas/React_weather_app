const axios = require("axios");



async function callApi(baseUrl, req, res, next) {
    axios.get(baseUrl)
        .then((result) => {
            const weather = result.data;
            //  using the data got to set up a response
            let place = `${weather.name}, ${weather.sys.country}`;
            // calculating the current timezone using the data fetched
            let weatherTimezone = `${new Date(
                weather.dt * 1000 - weather.timezone * 1000
            )}`;
            let weatherTemp = `${weather.main.temp}`;
            let weatherPressure = `${weather.main.pressure}`;
            //  fetching the weather icon and its size using the icon data
            let weatherIcon = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
            let weatherDescription = `${weather.weather[0].description}`;
            let humidity = `${weather.main.humidity}`;
            let clouds = `${weather.clouds.all}`;
            let visibility = `${weather.visibility}`;
            let main = `${weather.weather[0].main}`;
            let weatherFahrenheit = (weatherTemp * 9) / 5 + 32;

            // round off the value of the degrees fahrenheit calculated into two decimal places
            function roundToTwo(num) {
                return +(Math.round(num + "e+2") + "e-2");
            }

            weatherFahrenheit = roundToTwo(weatherFahrenheit);

            let response = {
                place: place,
                temp: weatherTemp,
                pressure: weatherPressure,
                icon: weatherIcon,
                description: weatherDescription,
                timezone: weatherTimezone,
                humidity: humidity,
                fahrenheit: weatherFahrenheit,
                clouds: clouds,
                visibility: visibility,
                main: main,
                wind: weather.wind,
                error: null,
            };
            res.status(200).json(response);
        }).catch((err) => {
            console.log(err);
            next({ statusCode: 404, message: "city not found" });
        });
}


// weather data by city location 

module.exports.getSearchLocationWeather = async (req, res, next) => {
    try {
        const city = req.query.city;
        console.log(city);
        if (!city) return res.status(400).json({ message: "city not found" });
        //build api URL with city and api key
        // eslint-disable-next-line no-undef
        const baseUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.WEATHER_APT_KEY}`;
        callApi(baseUrl, req, res, next);
    } catch (err) {
        next(err);
    }
};


// weather data by latitude and longitude 

module.exports.getCurrentLocationWeather = async (req, res, next) => {
    try {
        const latitude = req.query.lat;
        const longitude = req.query.lon;
        console.log(latitude, longitude);
        if (!longitude || !latitude) return res.status(400).json({ message: "city not found" });
        //build api URL with city and api key
        // eslint-disable-next-line no-undef
        const baseURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.WEATHER_APT_KEY}&units=metric`;
        callApi(baseURL, req, res, next);
    } catch (err) {
        next(err);
    }
};