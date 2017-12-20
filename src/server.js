const express = require('express');
const path = require('path');
// const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('hello there! how it`s going?');
  // res.sendFile(path.join(__dirname + '/volumes/server.html'));
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
