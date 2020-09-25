import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

import { toast } from 'react-toastify';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    const token = localStorage.getItem('@Psichologist:token');
    const psychologist = localStorage.getItem('@Psichologist:psychologist');

    if (token && psychologist) {
      api.defaults.headers.Authorization = `Bearer ${token}`;

      const psy = JSON.parse(psychologist);

      return { token, psychologist: psy};
    }

    return {};
  });

  const loginPsychologist = useCallback(async ({ email, password }) => {
    try {
      const response = await api.post('sessionpsychologist', {
        psy_email: email,
        psy_password: password,
      });

      const { token, psychologist } = response.data;

      localStorage.setItem('@Psichologist:token', token);
      localStorage.setItem('@Psichologist:psychologist', JSON.stringify(psychologist));

      api.defaults.headers.Authorization = `Bearer ${response.data.token}`;

      setData({ token, psychologist });

    } catch (error) {
      toast.error(`Erro ao fazer login! ${error.response.data.error}`);
    }
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@Psichologist:token');
    localStorage.removeItem('@Psichologist:psychologist');

    setData({});
  }, []);

  return (
    <AuthContext.Provider value={{ psychologist: data.psychologist, loginPsychologist, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
