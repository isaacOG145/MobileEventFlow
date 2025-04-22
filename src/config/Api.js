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

// Funciones relacionadas con usuarios
export const getUserProfile = async () => {
  const token = await getToken();

  const response = await api.get('/profile', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data; // contiene userId, email, expiration, role
};

export const getUserInfo = async (userId) => {
  try {
    const response = await api.get(`/user/findId/${userId}`);

    if (response.data.type === 'ERROR') {
      throw new Error(response.data.message); // Para capturarlo en el componente
    }
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al obtener las inscripciones');
  }
}

export const updatePassword = async (id, password) => {
  try {
    const response = await api.put('/user/updatePassword', {
      id: id,
      password: password
    });

    const { type, text } = response.data;

    if (type === 'ERROR' || type === 'WARNING') {
      const customError = new Error(text);
      customError.response = { data: response.data };
      throw customError;
    }

    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error;
    } else {
      const fallback = {
        text: 'Error al cambiar la contraseña',
        type: 'ERROR'
      };
      const fallbackError = new Error(fallback.text);
      fallbackError.response = { data: fallback };
      throw fallbackError;
    }
  }
}

export const updateUserProfile = async (id, phone) => {
  try {
    const response = await api.put('/user/updateUser', {
      id: id,
      phone: phone
    });

    const { type, text } = response.data;

    if (type === 'ERROR' || type === 'WARNING') {
      const customError = new Error(text);
      customError.response = { data: response.data };
      throw customError;
    }

    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error;
    } else {
      const fallback = {
        text: 'Error al cambiar el telefono',
        type: 'ERROR'
      };
      const fallbackError = new Error(fallback.text);
      fallbackError.response = { data: fallback };
      throw fallbackError;
    }
  }
}

export const cancelUser = async () => {
  try{
    const user = getUserProfile();
    const response = await api.put(`/user/change-status/${user.userId}`);

    const { type, text } = response.data;

    if (type === 'ERROR' || type === 'WARNING') {
      const customError = new Error(text);
      customError.response = { data: response.data };
      throw customError;
    }

    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error;
    } else {
      const fallback = {
        text: 'Error al borrar la cuenta ',
        type: 'ERROR'
      };
      const fallbackError = new Error(fallback.text);
      fallbackError.response = { data: fallback };
      throw fallbackError;
    }
  }
}

// Funciones relacionadas con actividades/eventos
export const getEventById = async (activityId) => {
  try {
    const response = await api.get(`/activity/findById/${activityId}`);
    const { data } = response;

    if (!data || data.type !== 'SUCCESS' || !data.result) {
      throw new Error(data?.text || 'Respuesta inválida del servidor');
    }

    return data;
  } catch (error) {
    console.error('Error en encontrar asignaciones:', error);

    if (error.response) {
      throw new Error(error.response.data?.text || error.response.data?.message || 'Error al obtener la asignación');
    } else if (error.request) {
      throw new Error('No se recibió respuesta del servidor');
    } else {
      throw new Error(error.message || 'Error al configurar la solicitud');
    }
  }
}

export const getAssingments = async (userId) => {
  try {
    const response = await api.get(`/activity/assignment/findByChecker/${userId}`);
    const { data } = response;

    if (!data || data.type !== 'SUCCESS' || !data.result) {
      throw new Error(data?.text || 'Respuesta inválida del servidor');
    }

    return data;
  } catch (error) {
    console.error('Error en encontrar asignaciones:', error);

    if (error.response) {
      throw new Error(error.response.data?.text || error.response.data?.message || 'Error al obtener la inscripción');
    } else if (error.request) {
      throw new Error('No se recibió respuesta del servidor');
    } else {
      throw new Error(error.message || 'Error al configurar la solicitud');
    }
  }
};

export const getEventsForOwner = async (userId) => {
  try {
    const response = await api.get(`/activity/events/byOwner/${userId}`)

    if (response.data.type === 'ERROR') {
      throw new Error(response.data.message);
    }

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al obtener las inscripciones');
  }
}

export const getworkshopsForOwner = async (userId) => {
  try {
    const response = await api.get(`/activity/workshops/byOwner/${userId}`)

    if (response.data.type === 'ERROR') {
      throw new Error(response.data.message);
    }

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al obtener las inscripciones');
  }
}

export const getActivitiesForUser = async (userId) => {
  try {
    const response = await api.get(`/activity/users/${userId}/activities`);

    if (response.data.type === 'ERROR') {
      throw new Error(response.data.message);
    }

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al obtener las inscripciones');
  }
}

// Funciones relacionadas con talleres/workshops
export const getWorkshopsForUser = async (userId) => {
  try {
    const response = await api.get(`/activity/users/${userId}/workshops`);
    if (response.data.type === 'ERROR') {
      throw new Error(response.data.message);
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
      const customError = new Error(text);
      customError.response = { data: response.data };
      throw customError;
    }

    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error;
    } else {
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

// Funciones relacionadas con inscripciones
export const getUserActivityInscription = async (userId, activityId) => {
  try {
    if (!userId) {
      throw new Error('Falta el usuario');
    } else if (!activityId) {
      throw new Error('Falta la actividad');
    }

    const response = await api.get('/user-activities/findByUserAndActivity', {
      params: { userId, activityId }
    });

    const { data } = response;

    if (!data || data.type !== 'SUCCESS' || !data.result) {
      throw new Error(data?.text || 'Respuesta inválida del servidor');
    }

    return data.result;
  } catch (error) {
    console.error('Error en getUserActivityInscription:', error);

    if (error.response) {
      throw new Error(error.response.data?.text ||
        error.response.data?.message ||
        'Error al obtener la inscripción');
    } else if (error.request) {
      throw new Error('No se recibió respuesta del servidor');
    } else {
      throw new Error(error.message || 'Error al configurar la solicitud');
    }
  }
};

export const getUserActivities = async (activityId) => {
  try {
    const response = await api.get(`/user-activities/findByActivity/${activityId}`);
    const { data } = response;

    if (!data || data.type !== 'SUCCESS' || !data.result) {
      throw new Error(data?.text || 'Respuesta inválida del servidor');
    }
    return response.data;
  } catch (error) {
    console.error('Error en encontrar asignaciones:', error);

    if (error.response) {
      throw new Error(error.response.data?.text || error.response.data?.message || 'Error al obtener la asignación');
    } else if (error.request) {
      throw new Error('No se recibió respuesta del servidor');
    } else {
      throw new Error(error.message || 'Error al configurar la solicitud');
    }
  }
}

export const confirmInscription = async (token) => {
  try {
    const response = await api.put('/user-activities/confirm', {
      token: token
    });

    console.log(response);

    const { type, text } = response.data;

    if (type === 'ERROR' || type === 'WARNING') {
      const customError = new Error(text);
      customError.response = { data: response.data };
      throw customError;
    }
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error;
    } else {
      const fallback = {
        text: 'Error al confirmar',
        type: 'ERROR'
      };
      const fallbackError = new Error(fallback.text);
      fallbackError.response = { data: fallback };
      throw fallbackError;
    }
  }
}

export const cancelInscription = async (inscriptionId) => {
  try {
    const response = await api.put('/user-activities/cancel', {
      id: inscriptionId
    });

    const { type, text } = response.data;

    if (type === 'ERROR' || type === 'WARNING') {
      const customError = new Error(text);
      customError.response = { data: response.data };
      throw customError;
    }

    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error;
    } else {
      const fallback = {
        text: 'Error al cancelar la inscripcion',
        type: 'ERROR'
      };
      const fallbackError = new Error(fallback.text);
      fallbackError.response = { data: fallback };
      throw fallbackError;
    }
  }
}

export default api;