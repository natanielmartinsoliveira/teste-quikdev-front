import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000', // URL base da sua API
  timeout: 5000, // Tempo máximo de espera por uma resposta
});

// Adicionar interceptor para incluir o access_token em todas as requisições
axiosInstance.interceptors.request.use(
  config => {
    const userData = localStorage.getItem('user') || '{}'; // Obtém o access_token do localStorage
    const user = JSON.parse(userData);
    const accessToken = user?.access_token;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`; // Adiciona o token de acesso aos cabeçalhos
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default axiosInstance;