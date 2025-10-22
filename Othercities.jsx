import React, { useState } from 'react';
import WeatherCard from './WeatherCard';

const popularCities = ['Chennai', 'Coimbatore', 'Madurai', 'Salem', 'Trichy'];

function Othercities() {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [selectedCity, setSelectedCity] = useState('');

    const getCityWeather = async (city) => {
        setLoading(true);
        setSelectedCity(city);
        setError('');
        setWeatherData(null);
        try {
            const response = await fetch(`http://localhost:5000/weather/city/${city}`);
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Could not fetch weather data.');
            }
            setWeatherData(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="weather-container">
            <h2>Popular Cities in Tamil Nadu</h2>
            <div className="city-list">
                {popularCities.map((city) => (
                    <button
                        key={city}
                        className={`city-btn ${selectedCity === city && !error ? 'active' : ''}`}
                        onClick={() => getCityWeather(city)}
                        disabled={loading && selectedCity === city}
                    >
                        {loading && selectedCity === city ? '...' : city}
                    </button>
                ))}
            </div>
            {loading && selectedCity && <div className="loading-spinner"></div>}
            {error && <div className="error-message">{error}</div>}
            {weatherData && <WeatherCard weather={weatherData} />}
        </div>
    );
}

export default Othercities;

