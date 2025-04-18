import React, { createContext, useEffect, useState } from 'react';
import { getToken, saveToken, removeToken, getUserRole, saveUserRole, clearAuthData } from '../services/AuthService';
import { getUserProfile } from '../config/Api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // datos del usuario (opcional)
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true); // para pantalla de carga

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = await getToken();
        const savedRole = await getUserRole();

        if (token && savedRole) {
          const profile = await getUserProfile();
          setUser(profile);
          setRole(savedRole);
        }
      } catch (error) {
        console.log("Error inicializando sesión:", error);
        await clearAuthData();
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);


  const updateAuthState = async (jwt, role) => {
    try {
      const profile = await getUserProfile();
      setUser(profile);
      setRole(role);
      await saveToken(jwt);
      await saveUserRole(role);
    } catch (error) {
      console.log("Error updating auth state:", error);
      await clearAuthData();
      throw error;
    }
  };


  // Cerrar sesión
  const logout = async () => {
    await clearAuthData();
    setUser(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ user, role, loading,  updateAuthState, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
