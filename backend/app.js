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

// routes
const router = require('./routes/Router.js')

app.use(router)

app.listen(port, () => {
    console.log(`app rodando na porta: ${port}`)
})