import React, { useState } from 'react';
import WeatherCard from './WeatherCard';

function Mycity() {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const getLocationWeather = () => {
        if (!navigator.geolocation) {
            setError('Geolocation is not supported by your browser.');
            return;
        }
        setLoading(true);
        setError('');
        setWeatherData(null);
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            try {
                const response = await fetch(`http://localhost:5000/weather/coords`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ lat: latitude, lon: longitude }),
                });
                const data = await response.json();
                 if (!response.ok) {
                    throw new Error(data.error || 'Could not fetch weather data for your location.');
                }
                setWeatherData(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }, () => {
            setError('Unable to retrieve your location. Please enable location services.');
            setLoading(false);
        });
    };

    return (
        <div className="weather-container">
            <h2>Your Local Weather</h2>
            <button onClick={getLocationWeather} disabled={loading} className="location-btn">
                {loading ? 'Fetching...' : 'Get My Location Weather'}
            </button>
            {loading && <div className="loading-spinner"></div>}
            {error && <div className="error-message">{error}</div>}
            {weatherData && <WeatherCard weather={weatherData} />}
        </div>
    );
}

export default Mycity;

