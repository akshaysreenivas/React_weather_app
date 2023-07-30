import { useEffect, useState } from "react";
import "../App.css";
import { locationBasedWeatherdatas, weatherdatas } from "../axios";
import ClipLoader from "react-spinners/ClipLoader";

function HomePage() {
  const [state, setState] = useState("");
  const [message, setMessage] = useState("");

  const [weather, setWeather] = useState();
  const [loading, setLoading] = useState(true);
  const searchCityWeather = () => {
    callApi(state);
  };
  async function callApi(state) {
    try {
      setLoading(true);
      const { data } = await weatherdatas(state);
      if (data) {
        setWeather(data);
      }
      setLoading(false);
      setState("");
    } catch {
      setMessage("No data available");
      setWeather();
      setLoading(false);
    }
  }

  async function success(position) {
    try {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      setLoading(true);
      // Make API call
      const { data } = await locationBasedWeatherdatas(latitude, longitude);
      if (data) {
        setWeather(data);
      }
      setLoading(false);
      setState("");
    } catch {
      setWeather();
      setMessage("No data available");
      setLoading(false);
    }
  }

  function error() {
    setMessage("Unable to retrieve your location");
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      setLoading(false);
      setMessage("Geolocation not supported enter city manually");
    }
  }, []);

  return (
    <div className="card">
      <div className="search">
        <input
          type="text"
          placeholder="enter city name"
          name="city"
          id=""
          spellCheck="false"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
        <button className="search_btn" onClick={searchCityWeather}>
          <img src="/images/search.png" alt="" />
        </button>
      </div>
      {!loading ? (
        weather ? (
          <div className="weather">
            <img src={weather.icon} alt="" className="weather-icon" />
            <h1 className="temp">{weather.temp}°C</h1>
            <h2 className="city">{weather.place}</h2>
            <h4 className="city">{weather.description}</h4>
            <div className="details">
              <div className="col">
                <img src="/images/humidity.png" alt="humidity icon" />
                <div>
                  <p className="humidity">{weather.humidity}%</p>
                  <p>Humidity</p>
                </div>
              </div>
              <div className="col">
                <img src="/images/wind.png" alt="wind icon" />
                <div>
                  <p className="humidity">{weather.wind.speed} km/h</p>
                  <p>Wind Speed</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="loader message">{message}</div>
        )
      ) : (
        <div className="loader">
          <ClipLoader
            color={"white"}
            loading={true}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}
    </div>
  );
}

export default HomePage;
