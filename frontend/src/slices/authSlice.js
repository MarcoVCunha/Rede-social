// - createSlice: para criar o slice (conjunto de estado + reducers)
// - createAsyncThunk: para lidar com ações assíncronas (como chamadas de API)
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Importa o serviço de autenticação, que lida com a comunicação com a API
import authService from "../services/authService";

// Recupera o usuário do localStorage, se estiver salvo (permite manter login entre sessões)
const user = JSON.parse(localStorage.getItem("user"));

// Define o estado inicial da fatia (slice) de autenticação
const initialState = {
  user: user ? user : null, // Se houver usuário no localStorage, inicia com ele logado
  error: false, // Flag para identificar erros
  success: false, // Flag para indicar sucesso da ação
  loading: false, // Flag para exibir loading enquanto a requisição estiver em andamento
};

// Register an User and Sign in
export const register = createAsyncThunk(
  "auth/register", // Nome da ação (usado internamente pelo Redux)
  async (user, thunkAPI) => {
    // user: dados do formulário | thunkAPI: utilitários do Redux
    const data = await authService.register(user); // Chama a API para registrar o usuário

    // Check for errors
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]); // Passa o erro para o reducer
    }

    return data;
  }
);

export const authSlice = createSlice({
  name: "auth", // Nome do slice (prefixo para as ações geradas)
  initialState, // Estado inicial definido acima
  reducers: {
    // Redutor síncrono para resetar o estado (usado após login, logout, etc)
    reset: (state) => {
      state.loading = false;
      state.error = false;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
    // Quando a requisição de registro estiver em andamento (pending)
      .addCase(register.pending, (state) => {
        state.loading = true; // Mostra loading
        state.error = false;  // Limpa erro anterior (se houver)
      })
       // Quando a requisição for concluída com sucesso (fulfilled)
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false; // Finaliza o loading
        state.success = true; // Marca como sucesso
        state.error = null;  // Limpa erros
        state.user = action.payload; // Armazena os dados do usuário retornado pela API
      })
       // Quando a requisição falhar (rejected)
      .addCase(register.rejected, (state, action) => {
        state.loading = false; // Finaliza o loading
        state.error = action.payload; // Salva o erro recebido da API
        state.user = null; // Garante que o estado do usuário fique nulo
      });
  },
});

// Exporta a action 'reset' para ser usada em componentes
export const { reset } = authSlice.actions;
// Exporta o reducer para ser adicionado no store do Redux
export default authSlice.reducer;
