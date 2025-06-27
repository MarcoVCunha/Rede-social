// Importa a URL base da API e a função que configura a requisição
import { api, requestConfig } from "../utils/config";

// Register an user
const register = async (data) => {
  // Cria a configuração da requisição com o método POST e os dados do usuário
  const config = requestConfig("POST", data);

  try {
    // Envia a requisição para a rota de registro de usuário
    const res = await fetch(api + "/users/register", config)
      // Converte a resposta da API para JSON
      .then((res) => res.json())
      // Captura erros na conversão da resposta
      .catch((err) => err);

    // Se a resposta for válida, salva o usuário no localStorage
    if (res) {
      localStorage.setItem("user", JSON.stringify(res));
    }

    return res;
  } catch (error) {
    console.log(error);
  }
};

// Logout an user
const logout = () => {
  localStorage.removeItem("user");
};

// Sign in an user
const login = async (data) => {
  const config = requestConfig("POST", data);

  try {
    const res = await fetch(api + "/users/login", config)
      .then((res) => res.json())
      .catch((err) => err);

      console.log(res)
    if (res._id) {
      localStorage.setItem("user", JSON.stringify(res));
    }

    return res;
  } catch (error) {
    console.log(error);
  }
};

// Cria um objeto com os métodos
const authService = {
  register,
  logout,
  login,
};

export default authService;
