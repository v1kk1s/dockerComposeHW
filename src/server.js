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
  request(`http://app:3001/get/?name=${req.params.name}`, (err, resp, body) => {
    console.log('receive name: ', body);
    res.send(body);
  });
});

app.post('/set-in-object', (req, res) => {
  console.log('Set name: ', req.body);
  res.send(req.body);

  request.post('http://app:3001/set').form(req.body);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
