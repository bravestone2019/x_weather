import React, { useState } from 'react';
import './App.css'; 

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 

  const apiKey = '05c55433399c457abe1161531240309'; 

  const handleInputChange = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); 
    setError(null); 

    try {
      const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }

      const data = await response.json();
      
      if (data && data.current) {
        setWeatherData(data);
      } else {
        throw new Error('Invalid city name');
      }
    } catch (error) {
      setError('Failed to fetch weather data'); 
      alert('Failed to fetch weather data');
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input type="text" value={city} onChange={handleInputChange} placeholder="Enter city name" />
        <button type="submit">Search</button>
      </form>
      {loading && <p>Loading data...</p>} 
      {error && <p className="error">{error}</p>} 
      {weatherData && (
        <div className="weather-cards"> 
          <WeatherCard title="Temperature" value={`${weatherData.current.temp_c}°C`} />
          <WeatherCard title="Humidity" value={`${weatherData.current.humidity}%`} />
          <WeatherCard title="Condition" value={weatherData.current.condition.text} />
          <WeatherCard title="Wind Speed" value={`${weatherData.current.wind_kph} kph`} />
        </div>
      )}
    </div>
  );
}

function WeatherCard({ title, value }) {
  return (
    <div className="weather-card">
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  );
}

export default App;
