import express from 'express';
const PORT = 3000;

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('hello from backend to frontend!');
});

app.post('/weather', (req, res) => {
  const cityName = req.body.cityName;
  if (!cityName) {
    res.status(400).json({ message: 'The city is not found' });
  } else {
    res.json({ message: cityName });
  }
});

app.listen(PORT, () => {
  console.log('Listening to port:', PORT);
});
