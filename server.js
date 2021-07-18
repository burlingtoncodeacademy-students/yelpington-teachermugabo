const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('client/build'));

// api endpoint: return all available restaurant ids
app.get('/api', (req, res) => {
  console.log('request on /api');

  // set header - for JSON
  res.header('type/json')
  // send file
  res.setHeader('Content-Type', 'application/json');
  res.sendFile(path.resolve('api','ids.json'));
});

// api endpoint: return restaurant object
app.get('/api/:restauId', (req, res) => {
  const { restauId } = req.params;
  console.log(`request on /api/${restauId}`);

  // set header - for JSON
  res.header('type/json')

  // send file
  // TODO check whether file exists first
  const restauDir = path.resolve('api/restaurants')
  res.sendFile(path.join(restauDir,`${restauId}.json`));
});

app.listen(5000, () => console.log('Listening...'));
