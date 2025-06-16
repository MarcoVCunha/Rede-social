require('dotenv').config();

//importações
const express = require('express'); //framework para criar servidores web com Node.js.
const path = require('path'); //módulo nativo do Node.js para lidar com caminhos de arquivos e diretórios.
const cors = require('cors'); //middleware que habilita CORS, permitindo requisições de outras origens.

const port = process.env.PORT; // porta onde o servidor irá escutar requisições

const app = express(); // instância do aplicativo Express

// config JSON and form data response 
app.use(express.json()); // middleware para analisar requisições JSON
app.use(express.urlencoded({ extended: false })) //permite que o servidor entenda dados de formulários enviados no formato application/x-www-form-urlencoded

// config CORS
app.use(cors({
    credentials: true,
    origin: "http://localhost:3000",
})) // habilita CORS para permitir requisições do frontend localizado em http://localhost:3000

//upload directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // serve arquivos estáticos da pasta 'uploads' na URL '/uploads'

// DB connection
require('./config/db.js'); // importa e executa a configuração de conexão com o banco de dados

// routes
const router = require('./routes/Router.js') // importa as rotas definidas no arquivo Router.js

app.use(router) // usa o router para definir as rotas da aplicação

app.listen(port, () => {
    console.log(`app rodando na porta: ${port}`)
}) // inicia o servidor na porta especificada e exibe uma mensagem no console indicando que o aplicativo está rodando

module.exports = app; // exporta a instância do aplicativo Express para ser usada em outros arquivos, como testes