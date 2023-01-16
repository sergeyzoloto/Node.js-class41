import express from 'express';
const PORT = 3000;

const app = express();

app.get('/', (req, res) => {
  res.send('hello from backend to frontend!');
});

app.post('/weather', (req, res) => {
  const cityName = req.body.cityName;
  res.send(cityName);
});

app.listen(PORT, () => {
  console.log(PORT);
});
