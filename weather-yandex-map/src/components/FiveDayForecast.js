import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function FiveDayForecast({ data }) {
  if (!data.length) return null;

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 900, settings: { slidesToShow: 1 } }
    ]
  };

  return (
    <div className="five-day-forecast card">
      <Slider {...settings}>
        {data.map(day => {
          const date = new Date(day.dt * 1000).toLocaleDateString('ru-RU', {
            weekday: 'short',
            day: 'numeric',
            month: 'numeric',
          });
          const iconUrl = `http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;

          return (
            <div key={day.dt} className="forecast-day" style={{ padding: '0 8px' }}>
              <h4>{date}</h4>
              <img src={iconUrl} alt={day.weather[0].description} />
              <div style={{ fontSize: 16, fontWeight: 500 }}>{day.weather[0].description}</div>
              <div>Температура: {Math.round(day.main.temp)}°C</div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}