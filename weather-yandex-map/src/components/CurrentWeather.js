import React from 'react';

export default function CurrentWeather({ data }) {
  if (!data) return null;
  const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  return (
    <div className="current-weather card">
      <h2>
        {data.name}, {data.sys.country}
      </h2>
      <img src={iconUrl} alt={data.weather[0].description} />
      <div className="description">{data.weather[0].description}</div>
      <div>Температура: <b>{Math.round(data.main.temp)}°C</b></div>
      <div>Ветер: <b>{data.wind.speed} м/с</b></div>
      <div>Влажность: <b>{data.main.humidity}%</b></div>
    </div>
  );
}
