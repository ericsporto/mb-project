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

// Array para armazenar os dados temporários
let registrationData = {};

// Endpoint POST para receber os dados do formulário
app.post('/registration', (req, res) => {
  // Verificar se todos os campos foram preenchidos
  const { social_name, email, social_phone, cpf, birth_date, password } = req.body;
  if (!social_name || !email || !social_phone || !cpf || !birth_date || !password) {
    return res.status(400).json({ error: 'Todos os campos devem ser preenchidos' });
  }

  // Armazenar os dados temporariamente
  registrationData = req.body;

  // Simular sucesso e enviar resposta
  res.status(200).json({ message: 'Cadastro realizado com sucesso!' });
});

// Endpoint GET para renderizar a página de registro
app.get('/registration', (req, res) => {
  // Criar página HTML dinâmica com os dados do payload
  const html = `
    <html>
      <head>
        <title>Detalhes do Registro</title>
      </head>
      <body>
        <h1>Detalhes do Registro</h1>
        <p><strong>Email:</strong> ${registrationData.email}</p>
        <p><strong>Nome:</strong> ${registrationData.social_name}</p>
        <p><strong>CPF:</strong> ${registrationData.cpf}</p>
        <p><strong>Data de Nascimento:</strong> ${registrationData.birth_date}</p>
        <p><strong>Telefone Social:</strong> ${registrationData.social_phone}</p>
        <p><strong>Senha:</strong> ${registrationData.password}</p>
      </body>
    </html>
  `;

  // Enviar a página HTML como resposta
  res.send(html);
});


app.listen(PORT, () => {
  console.log(`Servidor Express rodando na porta ${PORT}`);
});
