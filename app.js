const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const path = require('path');
require('dotenv').config();

const app = express();
const port = 3000;

// Middleware
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.render('weather', { weatherData: null });
});

app.post('/weather', async (req, res) => {
  const location = req.body.city;
  const apiKey = process.env.APIKEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

  try {
    const response = await axios.get(url);
    const weatherData = response.data;
    res.render('weather', { weatherData });
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.render('weather', { weatherData: null });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
