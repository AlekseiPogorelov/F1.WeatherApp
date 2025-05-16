import axios from 'axios';

const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;
const GEO_API_URL = 'https://api.openweathermap.org/geo/1.0/direct';
const ONE_CALL_API_URL = 'https://api.openweathermap.org/data/2.5/onecall';

// Получить координаты города
export async function fetchCoordinates(city) {
  const response = await axios.get(GEO_API_URL, {
    params: { q: city, limit: 1, appid: API_KEY },
  });
  if (!response.data.length) throw new Error('Город не найден');
  return response.data[0]; // содержит lat и lon
}

// Получить данные погоды по координатам
export async function fetchWeather(lat, lon) {
  const response = await axios.get(ONE_CALL_API_URL, {
    params: {
      lat,
      lon,
      exclude: 'minutely,hourly,alerts',
      units: 'metric',
      lang: 'ru',
      appid: API_KEY,
    },
  });
  return response.data;
}