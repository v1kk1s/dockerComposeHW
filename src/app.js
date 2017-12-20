const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const band = {
  name: 'Make it snow',
  author: 'Frank Sinatra',
};

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/volumes/app.html'));
});

app.get('/get', (req, res) => {
  const { name } = req.query;
  res.send(band[name]);

  console.log('send name: ', band[name], req.query);
});

app.post('/set', (req, res) => {
  const keys = Object.keys(req.body);

  keys.map(key => (band[key] = req.body[key]));
  res.send(band);

  console.log('Request: ', req.body);
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
