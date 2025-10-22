import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Homeparticular from './Homeparticular';
import Search from './Search';
import Mycity from './Mycity';
import Othercities from './Othercities';
import './App.css';

function App() {
    return (
        <Router>
            <div className="app-container">
                <nav className="main-nav">
                    <div className="nav-logo">
                        Cerebrolytix
                    </div>
                    <div className="nav-links">
                        <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Home</NavLink>
                        <NavLink to="/search" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Search</NavLink>
                        <NavLink to="/mycity" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>My City</NavLink>
                        <NavLink to="/othercities" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Popular Cities</NavLink>
                    </div>
                </nav>

                <main className="content">
                    <Routes>
                        <Route path="/" element={<Homeparticular />} />
                        <Route path="/search" element={<Search />} />
                        <Route path="/mycity" element={<Mycity />} />
                        <Route path="/othercities" element={<Othercities />} />
                    </Routes>
                </main>

                <footer className="main-footer">
                    <p>&copy; 2025 Cerebrolytix. All rights reserved.</p>
                </footer>
            </div>
        </Router>
    );
}

export default App;

