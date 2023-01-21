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
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?APPID=${key.API_KEY}`,
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => {
  console.log('Listening to port:', PORT);
});
