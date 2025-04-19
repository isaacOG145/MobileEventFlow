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

export const getInscriptions = async (userId) => {
  try{
    const response = await api.get(`/user-activities/findByUser/${userId}`);
    
    if (response.data.type === 'ERROR') {
      throw new Error(response.data.message); 
    }

    return response.data;  

  }catch(error){
    throw new Error(error.response?.data?.message || 'Error al obtener las inscripciones');
  }
}

export const getActivitiesForUser = async (userId) =>{
  try{
    const response = await api.get(`/activity/users/${userId}/activities`);
    
    if (response.data.type === 'ERROR') {
      throw new Error(response.data.message); 
    }

    return response.data;  

  }catch(error){
    throw new Error(error.response?.data?.message || 'Error al obtener las inscripciones');
  }
}

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

export const registerToWorkshop = async (userId, activityId) => {
  try {
    const response = await api.post('/user-activities/workshop/save', {
      userId,
      activityId
    });

    const { type, text } = response.data;

    if (type === 'ERROR' || type === 'WARNING') {
      // Lanza directamente el objeto de respuesta para que el handler lo reciba tal cual
      const customError = new Error(text);
      customError.response = { data: response.data };
      throw customError;
    }

    return response.data;

  } catch (error) {
    // Si el backend ya mandó un Message, lo propagamos tal cual
    if (error.response && error.response.data) {
      throw error;
    } else {
      // Error inesperado
      const fallback = {
        text: 'Error al inscribirse al taller',
        type: 'ERROR'
      };
      const fallbackError = new Error(fallback.text);
      fallbackError.response = { data: fallback };
      throw fallbackError;
    }
  }
};


export default api;