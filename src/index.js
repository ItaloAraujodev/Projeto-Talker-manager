const express = require('express');
const bodyParser = require('body-parser');
const pessoas = require('./talker.json');
const readTalkerFile = require('./utils/readFiles')

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar.
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker',  async (_request, response) => {
  const talker = await readTalkerFile();
  return response.status(200).json(talker);
});