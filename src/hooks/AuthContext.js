import React, { createContext, useCallback, useState, useContext } from "react";
import api from "../services/api";
import { useHistory } from 'react-router-dom';

import { toast } from "react-toastify";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const history = useHistory();

  const [data, setData] = useState(() => {
    const token = localStorage.getItem("@Psichologist:token");
    const psychologist = localStorage.getItem("@Psichologist:psychologist");

    const token_pat = localStorage.getItem("@Patient:token");
    const patient = localStorage.getItem("@Patient:patient");

    if (token && psychologist) {
      api.defaults.headers.Authorization = `Bearer ${token}`;

      const psy = JSON.parse(psychologist);

      return { token, psychologist: psy };
    }

    if (token_pat && patient) {
      api.defaults.headers.Authorization = `Bearer ${token_pat}`;

      const pat = JSON.parse(patient);

      return { token_pat, patient: pat };
    }

    return {};
  });

  const loginPsychologist = useCallback(async ({ email, password }) => {
    try {
      const response = await api.post("sessionpsychologist", {
        psy_email: email,
        psy_password: password,
      });

      const { token, psychologist } = response.data;

      localStorage.setItem("@Psichologist:token", token);
      localStorage.setItem(
        "@Psichologist:psychologist",
        JSON.stringify(psychologist)
      );

      api.defaults.headers.Authorization = `Bearer ${response.data.token}`;

      setData({ token, psychologist });
    } catch (error) {
      toast.error(`Erro ao fazer login! ${error.response.data.error}`);
    }
  }, []);

  const loginPatient = useCallback(async ({ email, password }) => {
    try {
      const response = await api.post("sessionpatient", {
        pat_email: email,
        pat_password: password,
      });

      const { token, patient } = response.data;

      localStorage.setItem("@Patient:token", token);
      localStorage.setItem("@Patient:patient", JSON.stringify(patient));

      api.defaults.headers.Authorization = `Bearer ${response.data.token}`;

      setData({ token, patient });
    } catch (error) {
      toast.error(`Erro ao fazer login! ${error.response.data.error}`);
    }
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem("@Psichologist:token");
    localStorage.removeItem("@Psichologist:psychologist");

    localStorage.removeItem("@Patient:token");
    localStorage.removeItem("@Patient:patient");

    history.push('/');
    setData({});
  }, [history]);

  return (
    <AuthContext.Provider
      value={{
        psychologist: data.psychologist,
        patient: data.patient,
        loginPatient,
        loginPsychologist,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
