import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import requests
from dotenv import load_dotenv
from datetime import datetime, timedelta

# Load environment variables from your .env file
load_dotenv()
app = Flask(__name__)
CORS(app)

# --- Configuration ---
# Correctly load the API key and MongoDB URI from your .env file
OPENWEATHER_API_KEY = os.getenv("OPENWEATHER_API_KEY")
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/weatherApp")

# A crucial check to ensure the API Key is loaded
if not OPENWEATHER_API_KEY:
    print("FATAL ERROR: OPENWEATHER_API_KEY is not set in the .env file.")

# --- Database Connection ---
try:
    client = MongoClient(MONGO_URI)
    db = client.get_database()
    # Using a collection to log each API call for potential history features
    weather_collection = db.weather_data
    print("MongoDB connected successfully.")
except Exception as e:
    print(f"Error connecting to MongoDB: {e}")
    weather_collection = None

# --- API Route for City Search ---
@app.route("/weather/city/<city_name>", methods=["GET"])
def get_weather_by_city(city_name):
    if not OPENWEATHER_API_KEY:
        return jsonify({"error": "Server is missing API key configuration"}), 500

    params = {
        'q': city_name,
        'appid': OPENWEATHER_API_KEY,
        'units': 'metric'  # Use metric units (Celsius)
    }
    try:
        response = requests.get("https://api.openweathermap.org/data/2.5/weather", params=params)
        # Raise an exception for bad status codes (4xx or 5xx)
        response.raise_for_status()
        data = response.json()
        # Log the successful API call to the database
        if weather_collection is not None:
            weather_collection.insert_one(data.copy())
        return jsonify(data)
    except requests.exceptions.HTTPError as err:
        if err.response.status_code == 404:
            return jsonify({"error": "City not found. Please check the spelling."}), 404
        return jsonify({"error": "An error occurred with the weather service."}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# --- API Route for Coordinates Search ---
@app.route('/weather/coords', methods=['POST'])
def get_weather_by_coords():
    if not OPENWEATHER_API_KEY:
        return jsonify({"error": "Server is missing API key configuration"}), 500

    req_data = request.get_json()
    lat, lon = req_data.get('lat'), req_data.get('lon')

    if not lat or not lon:
        return jsonify({"error": "Latitude and longitude are required."}), 400

    params = {
        'lat': lat,
        'lon': lon,
        'appid': OPENWEATHER_API_KEY,
        'units': 'metric'
    }
    try:
        response = requests.get("https://api.openweathermap.org/data/2.5/weather", params=params)
        response.raise_for_status()
        data = response.json()
        if weather_collection is not None:
            weather_collection.insert_one(data.copy())
        return jsonify(data)
    except Exception as e:
        return jsonify({"error": "Could not fetch weather data for your location."}), 500

if __name__ == '__main__':
    # Use debug=True for development to see detailed errors
    app.run(port=5000, debug=True)

