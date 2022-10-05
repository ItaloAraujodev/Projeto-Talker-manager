const express = require('express');
const bodyParser = require('body-parser');
const token = require('crypto-token');
const { application } = require('express');
const readTalkerFile = require('./utils/readFiles');
const writeTalkerFile = require('./utils/writeTalkerFile');
const { validEmail, validPassword } = require('./middleware/validCampos');
const { validToken, 
validName, 
validAge, 
validTalk, 
validTalkWatchedAt, validTalkRate } = require('./middleware/validLogin');

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

app.post('/talker', 
validToken, 
validName, 
validAge, validTalk, validTalkWatchedAt, validTalkRate, async (req, res) => {
  const talker = await readTalkerFile();
  const { name, age, talk } = req.body;
  const id = talker.length + 1;
  const dados = { name, age, id, talk };

  console.log(dados);
  await writeTalkerFile([...talker, dados]);
  return res.status(201).json(dados);
});

app.put('/talker/:id', validToken, validName, 
validAge, validTalk, validTalkWatchedAt, validTalkRate, async (req, res) => {
  const talker = await readTalkerFile();
  const { id } = req.params;
  console.log(id);
  const { name, age, talk } = req.body;
  const pegando = talker.filter((element) => element.id !== Number(id));
  const result = { id: Number(id), name, age, talk };

  await writeTalkerFile([...pegando, result]);

  return res.status(200).json(result);
});

app.delete('/talker/:id', validToken, async (req, res) => {
  const { id } = req.params;
  const talker = await readTalkerFile();
  const remover = talker.filter((element) => element.id !== Number(id));
  await writeTalkerFile([...remover]);
  return res.status(204).json(remover);
});

/* -----------  /login ------------- */

app.post('/login', validEmail, validPassword, async (request, response) => 
response.status(200).json({ token: token(16) }));
