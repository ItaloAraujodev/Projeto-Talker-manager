const express = require('express');
const bodyParser = require('body-parser');
const token = require('crypto-token');
const readTalkerFile = require('./utils/readFiles');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

const verify = async (req, res, next) => {
  const talker = await readTalkerFile();
  const { id } = req.params;
  const pegandoId = talker.some((element) => element.id === Number(id));

  if (!pegandoId) {
    return res.status(404).json({
      message: 'Pessoa palestrante não encontrada',
    });
  }
  next();
};

// não remova esse endpoint, e para o avaliador funcionar.
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

/* -----------  INICIANDO ------------- */

app.get('/talker', async (_request, response) => {
  const talker = await readTalkerFile();
  return response.status(200).json(talker);
});

app.get('/talker/:id', verify, async (req, res) => {
    const talker = await readTalkerFile();
    const { id } = req.params;
    const pegandoId = talker.find((element) => element.id === Number(id));
    return res.status(200).json(pegandoId);
});

/* -----------  /login ------------- */

app.post('/login', async (request, response) => {
    const { email, password } = request.body;
    console.log(email, password);
    console.log(token(16));
    return response.status(200).json({ token: token(16) });   
});
