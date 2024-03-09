const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(
  cors({
    origin: 'http://localhost:5173',
  })
);

let registrationData = {};

app.post('/registration/social', (req, res) => {
  const { social_name, email, social_phone, cpf, birth_date, password } =
    req.body;
  if (
    !social_name ||
    !email ||
    !social_phone ||
    !cpf ||
    !birth_date ||
    !password
  ) {
    return res
      .status(400)
      .json({ error: 'Todos os campos devem ser preenchidos' });
  }

  registrationData = req.body;

  res.status(200).json({ message: 'Cadastro realizado com sucesso!' });
});

app.post('/registration/legal', (req, res) => {
  const { legal_name, email, legal_phone, cnpj, birth_opened, password } =
    req.body;
  if (
    !legal_name ||
    !email ||
    !legal_phone ||
    !cnpj ||
    !birth_opened ||
    !password
  ) {
    return res
      .status(400)
      .json({ error: 'Todos os campos devem ser preenchidos' });
  }

  registrationData = req.body;

  res.status(200).json({ message: 'Cadastro realizado com sucesso!' });
});

app.get('/registration', (req, res) => {
  const htmlSocial = `
    <html>
      <head>
        <title>Detalhes do Registro</title>
      </head>
      <body>
        <h1>Detalhes do Registro de Pessoal Física</h1>
        <p><strong>Email:</strong> ${registrationData.email}</p>
        <p><strong>Nome:</strong> ${registrationData.social_name}</p>
        <p><strong>CPF:</strong> ${registrationData.cpf}</p>
        <p><strong>Data de Nascimento:</strong> ${registrationData.birth_date}</p>
        <p><strong>Telefone:</strong> ${registrationData.social_phone}</p>
        <p><strong>Senha:</strong> ${registrationData.password}</p>
      </body>
    </html>
  `;
  const htmlLegal = `
    <html>
      <head>
        <title>Detalhes do Registro</title>
      </head>
      <body>
        <h1>Detalhes do Registro de Pessoa Jurídica</h1>
        <p><strong>Email:</strong> ${registrationData.email}</p>
        <p><strong>Nome Fantasia:</strong> ${registrationData.legal_name}</p>
        <p><strong>CNPJ:</strong> ${registrationData.cnpj}</p>
        <p><strong>Data de ABertura:</strong> ${registrationData.birth_opened}</p>
        <p><strong>Telefone:</strong> ${registrationData.legal_phone}</p>
        <p><strong>Senha:</strong> ${registrationData.password}</p>
      </body>
    </html>
  `;
  const isLegalPerson = 'legal_name' in registrationData;
  res.send(isLegalPerson ? htmlLegal : htmlSocial);
});

app.listen(PORT, () => {
  console.log(`Servidor Express rodando na porta ${PORT}`);
});
