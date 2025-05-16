import React from 'react';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';

export default function WeatherMap({ coords }) {
  if (!coords) return null;

  const defaultState = {
    center: [coords.lat, coords.lon],
    zoom: 9,
  };

  return (
    <YMaps>
      <Map defaultState={defaultState} width="100%" height="100%">
        <Placemark geometry={[coords.lat, coords.lon]} />
      </Map>
    </YMaps>
  );
}
