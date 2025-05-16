import React, { useState } from 'react';

export default function CitySelector({ onCitySelect }) {
  const [input, setInput] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (input.trim()) {
      onCitySelect(input.trim());
    }
  };

  return (
    <form className="city-selector-form" onSubmit={handleSubmit}>
      <input
        className="city-selector-input"
        type="text"
        placeholder="Введите город"
        value={input}
        onChange={e => setInput(e.target.value)}
        autoComplete="off"
      />
      <button className="city-selector-btn" type="submit">
        Показать погоду
      </button>
    </form>
  );
}
