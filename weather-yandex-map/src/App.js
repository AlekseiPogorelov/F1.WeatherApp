import React, { useState, useEffect } from 'react';
import CitySelector from './components/CitySelector';
import CurrentWeather from './components/CurrentWeather';
import FiveDayForecast from './components/FiveDayForecast';
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';
import WeatherMap from './components/WeatherMap'; // Яндекс карта

const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;

function App() {
  const [city, setCity] = useState('');
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!city) return;
    async function fetchWeather() {
      setLoading(true);
      setError(null);
      try {
        // Текущая погода
        const currentRes = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=ru&appid=${API_KEY}`
        );
        if (!currentRes.ok) throw new Error('Город не найден');
        const currentData = await currentRes.json();
        setCurrentWeather(currentData);

        // Прогноз 5 дней
        const forecastRes = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&lang=ru&appid=${API_KEY}`
        );
        if (!forecastRes.ok) throw new Error('Ошибка при получении прогноза');
        const forecastData = await forecastRes.json();

        // Фильтруем прогноз на 5 дней по времени 12:00
        const dailyForecast = forecastData.list.filter(item =>
          item.dt_txt.includes('12:00:00')
        );
        setForecast(dailyForecast);
      } catch (err) {
        setError(err.message);
        setCurrentWeather(null);
        setForecast([]);
      } finally {
        setLoading(false);
      }
    }
    fetchWeather();
  }, [city]);

  return (
    <div className="app-container">
      <h1>Прогноз погоды</h1>
      <CitySelector onCitySelect={setCity} />
      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {(currentWeather || forecast.length > 0) && (
        <div className="weather-horizontal">
          {currentWeather && <CurrentWeather data={currentWeather} />}
          {forecast.length > 0 && <FiveDayForecast data={forecast} />}
        </div>
      )}
      {currentWeather && currentWeather.coord && (
        <div className="yandex-map-container" style={{ height: 400, margin: '20px 0' }}>
          <WeatherMap coords={{ lat: currentWeather.coord.lat, lon: currentWeather.coord.lon }} />
        </div>
      )}
    </div>
  );
}

export default App;
