import React, { useState, useEffect } from 'react';

// LiveClock Component for real-time display
function LiveClock() {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timerId = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timerId);
    }, []);

    const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    return (
        <div className="live-clock-container">
            <p className="location-text">Karur, Tamil Nadu</p>
            <div className="time-display">{currentTime.toLocaleTimeString('en-IN', timeOptions)}</div>
            <div className="date-display">{currentTime.toLocaleDateString('en-IN', dateOptions)}</div>
        </div>
    );
}

// Main Home Page Component
function Homeparticular() {
    return (
        <main>
            <section className="hero">
                <LiveClock />
                <h1>Welcome to Cerebrolytix</h1>
                <p>Your gateway to real-time weather updates across the globe.</p>
            </section>
            <section className="features">
                <div className="feature-card">
                    <h3>🌍 Global Search</h3>
                    <p>Find weather details for any city in the world.</p>
                </div>
                <div className="feature-card">
                    <h3>📍 Localized Updates</h3>
                    <p>Get instant weather reports for your location.</p>
                </div>
                <div className="feature-card">
                    <h3>📊 Detailed Stats</h3>
                    <p>See temperature, humidity, wind speed, and more.</p>
                </div>
            </section>
        </main>
    );
}

export default Homeparticular;

