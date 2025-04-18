import axios from 'axios';
import { API_BASE_URL } from '@env';
import { getToken } from '../services/AuthService';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json"
  },
});

api.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getUserProfile = async () => {
  const token = await getToken(); // tu función para leer el JWT

  const response = await api.get('/profile', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data; // contiene userId, email, expiration, role
};


export const getWorkshopsForUser = async (userId) => {
  try {
    const response = await api.get(`/activity/users/${userId}/workshops`);
    if (response.data.type === 'ERROR') {
      throw new Error(response.data.message); // Para capturarlo en el componente
    }
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al obtener talleres');
  }
};

export default api;