import React, { useEffect, useState } from "react";
import "./index.css";
import Clock from "../../images/clock.svg";
import Logout from "../../images/logout.svg";

import UserDefault from "../../images/img-4.png";

import { useAuth } from "../../hooks/AuthContext";
import { Form, Input } from "@rocketseat/unform";
import * as Yup from "yup";
import api from "../../services/api";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

const schema = Yup.object().shape({
  pat_name: Yup.string().required("O Nome é obrigatório!"),
  pat_email: Yup.string()
    .email("Insira um E-mail válido!")
    .required("O E-mail é obrigatório!"),
  pat_password: Yup.string().typeError("A Senha é obrigatória!"),
});

function Paciente() {
  const history = useHistory();

  const { signOut } = useAuth();
  const [dados, setDados] = useState();
  const [calls, setCalls] = useState();
  const [status, setStatus] = useState(true);

  const { patient } = useAuth();

  function handleSingOut() {
    signOut();
  }

  async function handleDelete() {
    try {
      await api.delete("patient");

      toast.success("Conta excluida com sucesso!");
      signOut();
      history.push("/");
    } catch (error) {
      toast.error("Erro ao excluir conta!");
    }
  }

  async function handleStartChat() {
    try {
      toast.success("Iniciando atendimento!");

      const call = await api.post("call", {
        patient_id: patient.id,
      });
      history.push(`/chat/${call.data.id}`);
    } catch (error) {
      toast.error("Erro ao iniciar atendimento");
    }
  }

  async function handleEdit(data) {
    try {
      await api.put("patient", {
        pat_name: data.pat_name,
        pat_email: data.pat_email,
        pat_password: data.pat_password,
      });

      setStatus(!status);

      toast.success("Editado com sucesso!");
    } catch (error) {
      toast.error("Erro ao editar, verifique seus dados!");
    }
  }

  useEffect(() => {
    async function loadDados() {
      try {
        const response = await api.get("patient");
        setDados(response.data);

        toast.success("Dados consultados com sucesso!");
      } catch (error) {
        toast.error("Erro ao carregar dado!");
      }
    }

    loadDados();
  }, [status]);

  useEffect(() => {
    async function loadCalls() {
      const response = await api.get("patient/calls");

      const data = response.data.map((call) => ({
        ...call,
        cal_start: new Intl.DateTimeFormat("pt-br").format(
          new Date(call.cal_start)
        ),
        cal_end: call.cal_end
          ? `${new Intl.DateTimeFormat("pt-br").format(new Date(call.cal_end))}`
          : null,
        cal_hour_start: `${new Date(call.cal_start).getHours()}:${new Date(
          call.cal_start
        ).getMinutes()}`,
        cal_hour_end: call.cal_end
          ? `${new Date(call.cal_end).getHours()}:${new Date(
              call.cal_end
            ).getMinutes()}`
          : null,
      }));
      setCalls(data);
    }

    loadCalls();
  }, []);

  console.log(calls && calls);

  return (
    <div className="painel-paciente">
      <div className="top-bar">
        <div className="container">
          <div className="top-bar-content">
            <div className="user-info-content">
              <div className="profile-pic-content">
                <img className="profile-pic" src={UserDefault} alt="" />
              </div>
              <div className="user-info">
                <h4 className="paciente-name">{dados && dados.pat_name}</h4>
                <h5 className="paciente-desc">Paciente</h5>
              </div>
            </div>
            <div className="btn-icons-content">
              <img
                className="btn-logout logout"
                src={Logout}
                alt=""
                onClick={handleSingOut}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="history container">
        <button onClick={handleStartChat} className="btn-primary">
          Quero conversar
        </button>

        <h4>HISTÓRICO</h4>
        {calls &&
          calls.map((call) => (
            <div key={call.id}>
              <hr className="divisor-section"></hr>
              <div className="history-content history-2 container align-center">
                <div className="clock-icon">
                  <img className="clock" src={Clock} alt="" />
                </div>
                <div className="last-chat">
                  <span className="last-chat-text chat-line-1">
                    Conversa iniciada
                  </span>
                  <span className="last-chat-text chat-line-2">
                    Dia {call.cal_start} às {call.cal_hour_start}
                  </span>
                </div>

                {call.cal_end ? (
                  <div className="last-chat">
                    <span className="last-chat-text chat-line-1">
                      Conversa finalizada
                    </span>
                    <span className="last-chat-text chat-line-2">
                      Dia {call.cal_end} às {call.cal_hour_end}
                    </span>
                  </div>
                ) : (
                  ""
                )}
                <div className="last-chat">
                  <a href={"/chat/" + call.id + "/"}>
                    <button className="btn-login btn-primary">Ver</button>
                  </a>
                </div>
              </div>
              <hr className="divisor-section"></hr>
            </div>
          ))}
      </div>
      <div className="edit-info">
        <div className="container">
          <h4 className="edit-info-title">Editar informações</h4>
        </div>
        <div className="small-container">
          <Form onSubmit={handleEdit} initialData={dados} schema={schema}>
            <div className="row">
              <div className="col-md-4">
                <Input type="text" name="pat_name" placeholder="Nome" />
              </div>
              <div className="col-md-4">
                <Input type="email" name="pat_email" placeholder="E-mail" />
              </div>
              <div className="col-md-4">
                <Input
                  type="password"
                  name="pat_password"
                  placeholder="Senha"
                />
              </div>
            </div>

            <div className="buttons-form">
              <button type="submit" className="btn-login btn-primary">
                Editar
              </button>

              <button
                onClick={handleDelete}
                type="button"
                className="btn-secondary btn-decline"
              >
                Excluir conta
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Paciente;
