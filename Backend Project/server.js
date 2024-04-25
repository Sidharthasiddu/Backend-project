const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 6000; // Changed port to 6000

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/weatherDB', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

// Define a schema for weather data
const weatherSchema = new mongoose.Schema({
  city: String,
  temperature: Number,
  humidity: Number,
  windSpeed: Number
});

// Create a Mongoose model for weather data
const WeatherData = mongoose.model('WeatherData', weatherSchema);

// Middleware
app.use(express.json());

// Route to handle storing weather data
app.post('/api/weather', async (req, res) => {
  try {
    const { city } = req.body;
    const apiKey = "39fde07296a6e12469919d4d71817d71";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    // Fetch weather data from the OpenWeatherMap API
    const response = await axios.get(apiUrl);
    const data = response.data;

    // Extract relevant weather information
    const weatherInfo = {
      city: data.name,
      temperature: data.main.temp,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed
    };

    // Create a new document using the WeatherData model
    const weatherData = new WeatherData(weatherInfo);

    // Save the weather data to the database
    await weatherData.save();

    // Respond with success message
    res.json({ message: 'Weather data saved successfully', data: weatherInfo });
  } catch (error) {
    console.error('Error saving weather data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
