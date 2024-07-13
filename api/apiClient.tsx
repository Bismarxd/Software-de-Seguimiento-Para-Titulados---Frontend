import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000', // Cambia esto a tu URL API
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar el token al header Authorization
apiClient.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default apiClient;