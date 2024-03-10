# MB Teste Técnico

Este projeto foi desenvolvido como um teste técnico no processo seletivo para o cargo de desenvolvedor frontend. Servidor desenvolvido com Node - Express e Frontend em Vue 3.

## O Projeto

Trata-se de um formulário com 4 etapas e envio de dados coletados.

## Para rodar localmente

Para executar o projeto, você precisa cloná-lo usando o seguinte comando:
git clone https://github.com/ericsporto/mb-project

Após clonar o repositório:
1- Rodar o servidor - Abra um terminal (bash ou powershell, etc) caminhe até a pasta server (mb-project/src/server), dentro do projeto e rode o comando `node server.js`. Se estiver tudo certo, você verá a mensagem que o servidor estará rodando na porta 3000.

2- Rodar o frontend - Abra o projeto no VS code. Abra um terminal e rode o comando `npm install` para instalar as dependências. Após o término, `npm run dev` para rodar o projeto que deverá estar rodando no endereço: `http://localhost:5173/`


## Testes e comportamento esperado
Após preencher todo formulário (com a opção de voltar etapas e edição dos dados preenchidos) e confirmar o mesmo, o usuário deve ser possibilitado de enviar os dados de cadastro através de uma requisição para o servidor. O mesmo responderá com mensagem de sucesso no cadastro e retornará, através de uma nova requisição, uma página HTML, que será renderizada com os dados recebidos e cadastrados em uma nova aba.
Possuímos dois tipos de cadastros, pessoa Física e pessoa Jurídica, que deverão funcionar perfeitamente tanto quanto ao cadastro de campos diferentes quanto ao HTML renderizado.

