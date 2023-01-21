import express from 'express';
import { key } from './sources/keys.js';
import fetch from 'node-fetch';
const PORT = 3000;

const app = express();
app.use(express.json());
//app.use('*/sources', express.static('sources'));

app.get('/', (req, res) => {
  res.send('hello from backend to frontend!');
});

app.post('/weather', async function (req, res) {
  try {
    const coordinatesResponse = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${req.body.cityName}&limit=1&appid=${key.API_KEY}`,
    );
    const geo = await coordinatesResponse.json();
    if (geo[0]) {
      const { lat, lon } = geo[0];

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${key.API_KEY}`,
        {
          method: 'POST',
          body: JSON.stringify(req.body),
          headers: { 'Content-Type': 'application/json' },
        },
      );
      const data = await response.json();
      res.json({
        cityName: data.name,
        weather: data.main.temp,
      });
    } else {
      res.json({ weatherText: 'City is not found!' });
    }
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => {
  console.log('Listening to port:', PORT);
});
