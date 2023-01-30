import express from 'express';
import { key } from './sources/keys.js';
import fetch from 'node-fetch';
const router = express.Router();

router.get('/', (req, res) => {
  res.send('hello from backend to frontend!');
});

router.post('/weather', async function (req, res) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${req.body.cityName}&appid=${key.API_KEY}`,
      {
        method: 'POST',
        body: JSON.stringify(req.body),
        headers: { 'Content-Type': 'application/json' },
      },
    );

    if (response.status === 200) {
      const data = await response.json();
      res.json({
        cityName: data.name,
        weatherText: `Temperature in ${data.name} is ${data.main.temp} °C`,
      });
    } else {
      res.status(404).send({ weatherText: 'City is not found!' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ weatherText: `ERROR: ${error}` });
  }
});

export default router;
