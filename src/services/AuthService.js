import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'token';

export const saveToken = async (token) => {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, token);
  } catch (error) {
    console.error('Error guardando token:', error);
  }
};

export const getToken = async () => {
  try {
    return await AsyncStorage.getItem(TOKEN_KEY);
  } catch (error) {
    console.error('Error obteniendo token:', error);
    return null;
  }
};

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY);
  } catch (error) {
    console.error('Error eliminando token:', error);
  }
};

const ROLE_KEY = 'role';

export const saveUserRole = async (role) => {
  try {
    await AsyncStorage.setItem(ROLE_KEY, role);
  } catch (error) {
    console.error('Error guardando rol:', error);
  }
};

export const getUserRole = async () => {
  try {
    return await AsyncStorage.getItem(ROLE_KEY);
  } catch (error) {
    console.error('Error obteniendo rol:', error);
    return null;
  }
};

export const clearAuthData = async () => {
  try {
    await AsyncStorage.multiRemove([TOKEN_KEY, ROLE_KEY]);
  } catch (error) {
    console.error('Error limpiando datos de auth:', error);
  }
};