// URL base da API que será usada para fazer as requisições HTTP (ex: login, cadastro, etc)
export const api = "http://localhost:5000/api";

// URL base para acessar os arquivos enviados (ex: imagens de perfil)
export const uploads = "http://localhost:5000/uploads";

// Função que retorna a configuração da requisição HTTP com base nos parâmetros fornecidos
export const requestConfig = (method, data, token = null, image = null) => {
  let config;

  // Caso esteja enviando uma imagem
  if (image) {
    config = {
      method, // Método da requisição (POST, PUT, etc)
      body: data, // Aqui, o 'data' é do tipo FormData (contém a imagem)
      headers: {}, // Não define Content-Type porque o navegador faz isso automaticamente para FormData
    };
  }
  // Caso seja uma requisição DELETE ou sem corpo de dados
  else if (method === "DELETE" || data === null) {
    config = {
      method, // Método DELETE ou outro sem corpo
      headers: {},
    };
  }
  // Caso comum: envio de dados em formato JSON
  else {
    config = {
      method, // Método HTTP (ex: POST)
      body: JSON.stringify(data), // Converte os dados do objeto JS para uma string JSON
      headers: {
        "Content-Type": "application/json", // Informa que o conteúdo enviado é JSON
      },
    };
  }

  // Se houver token de autenticação (JWT), adiciona ao header
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Define o token como Bearer Token no header
  }

  return config;
};
