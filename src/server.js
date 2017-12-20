const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/volumes/server.html'));
});

app.get('/get-from-object/:name', (req, res) => {
  res.send(req.params.name);
  request.get(`http://app:3001/get/?name=${req.params.name}`);
});

app.post('/set-in-object', (req, res) => {
  res.send(req.body);
  request({
    method: 'POST',
    uri: 'http://app:3001/set',
    multipart: [
      {
        'content-type': 'application/json',
        body: JSON.stringify(req.body),
      },
    ],
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
