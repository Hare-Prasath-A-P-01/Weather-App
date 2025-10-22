import React, { useState } from 'react';
import WeatherCard from './WeatherCard';

function Search() {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!city) {
            setError('Please enter a city name.');
            return;
        }
        setLoading(true);
        setError('');
        setWeatherData(null);
        try {
            const response = await fetch(`http://localhost:5000/weather/city/${city}`);
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'City not found.');
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
            <h2>Search for a City</h2>
            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="E.g., London, Tokyo"
                    aria-label="City Name"
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Searching...' : 'Get Weather'}
                </button>
            </form>
            {loading && <div className="loading-spinner"></div>}
            {error && <div className="error-message">{error}</div>}
            {weatherData && <WeatherCard weather={weatherData} />}
        </div>
    );
}

export default Search;

