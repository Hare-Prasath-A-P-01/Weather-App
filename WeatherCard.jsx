import React from 'react';

const WeatherCard = ({ weather }) => {
    // If there's no weather data, don't render anything
    if (!weather) {
        return null;
    }

    const { name, main, weather: weatherDetails, wind, sys } = weather;
    const iconUrl = `https://openweathermap.org/img/wn/${weatherDetails[0].icon}@2x.png`;

    return (
        <div className="weather-card animate-fade-in">
            <h3 className="city-name">{name}, {sys.country}</h3>
            <div className="weather-main">
                <img src={iconUrl} alt={weatherDetails[0].description} className="weather-icon" />
                <p className="temperature">{Math.round(main.temp)}°C</p>
            </div>
            <p className="weather-description">{weatherDetails[0].main} ({weatherDetails[0].description})</p>
            <div className="weather-details">
                <div className="detail-item">
                    <p className="detail-label">Feels Like</p>
                    <p className="detail-value">{Math.round(main.feels_like)}°C</p>
                </div>
                <div className="detail-item">
                    <p className="detail-label">Humidity</p>
                    <p className="detail-value">{main.humidity}%</p>
                </div>
                <div className="detail-item">
                    <p className="detail-label">Wind Speed</p>
                    <p className="detail-value">{wind.speed} m/s</p>
                </div>
                <div className="detail-item">
                    <p className="detail-label">Pressure</p>
                    <p className="detail-value">{main.pressure} hPa</p>
                </div>
            </div>
        </div>
    );
};

export default WeatherCard;

