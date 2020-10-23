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

const schema = Yup.object().shape({
  psy_name: Yup.string().required("O Nome é obrigatório!"),
  psy_email: Yup.string()
    .email("Insira um E-mail válido!")
    .required("O E-mail é obrigatório!"),
  psy_password: Yup.string().typeError("A Senha é obrigatória!"),
  psy_data_nasc: Yup.string().required("Data de nascimento obrigatória"),
  psy_crp: Yup.string().required("O CRP é obrigatório!"),
  psy_cpf: Yup.string().required("O CPF é obrigatório!"),
  psy_city: Yup.string().required("A cidade é obrigatória!"),
});

function Psicologo() {
  const { signOut } = useAuth();
  const [dados, setDados] = useState();
  const [calls, setCalls] = useState();
  const [status, setStatus] = useState(false);
  const [availabilities, setAvailabilities] = useState([
    { week_day: 0, from: "", to: "" },
  ]);
  const [myAvailabilities, setMyAvailabilities] = useState();

  function handleSingOut() {
    signOut();
  }

  async function handleDelete() {
    try {
      await api.delete("psychologist");

      toast.success("Conta excluida com sucesso!");
      signOut();
    } catch (error) {
      toast.error("Erro ao excluir conta!");
    }
  }

  async function handleEdit(data) {
    try {
      await api.put("psychologist", {
        psy_name: data.psy_name,
        psy_email: data.psy_email,
        psy_password: data.psy_password,
        psy_data_nasc: data.psy_data_nasc,
        psy_crp: data.psy_crp,
        psy_cpf: data.psy_cpf,
        psy_city: data.psy_city,
      });

      toast.success("Editado com sucesso!");
    } catch (error) {
      toast.error("Erro ao editar, verifique seus dados!");
    }
  }

  function handleAvailabilities() {
    setAvailabilities([...availabilities, { week_day: 0, from: "", to: "" }]);
  }

  function setItemAvailability(position, field, value) {
    const updateAvailabilities = availabilities.map((availability, index) => {
      if (index === position) {
        return { ...availability, [field]: value };
      }

      return availability;
    });

    setAvailabilities(updateAvailabilities);
  }

  async function createAvailability(e) {
    e.preventDefault();

    try {
      await api.post("psy-availability", {
        availabilities: availabilities,
      });

      setStatus(!status);
      setAvailabilities([{ week_day: 0, from: "", to: "" }]);

      toast.success("Diponibilidade cadastrada com sucesso!");
    } catch (error) {
      toast.error("Erro ao cadastrada siponibilidade  dado!");
    }
  }

  async function deleteAvailability(id) {
    try {
      await api.delete(`psy-availability/${id}`);

      setStatus(!status);

      toast.success("Diponibilidade excluida com sucesso!");
    } catch (error) {
      toast.error("Erro ao excluir disponibilidade!");
    }
  }

  useEffect(() => {
    async function loadDados() {
      try {
        const response = await api.get("psychologist");
        setDados(response.data);
        toast.success("Dados consultados com sucesso!");
      } catch (error) {
        toast.error("Erro ao carregar dado!");
      }
    }

    loadDados();
  }, []);

  useEffect(() => {
    async function loadAvailabilities() {
      const response = await api.get("psy-availability");

      const availabilitiesData = response.data;

      const formatData = availabilitiesData.map((availability) => {
        const fromMinutes = availability.from % 60;
        const toMinutes = availability.to % 60;

        if (fromMinutes > 0 || toMinutes > 0) {
          const fromHours = Math.floor(availability.from / 60);
          const toHours = Math.floor(availability.to / 60);

          return {
            ...availability,
            from: `${fromHours < 10 ? "0" + fromHours : fromHours}:${
              fromMinutes < 10 ? "0" + fromMinutes : fromMinutes
            }`,
            to: `${toHours < 10 ? "0" + toHours : toHours}:${
              toMinutes < 10 ? "0" + toMinutes : toMinutes
            }`,
          };
        }

        const fromHours = availability.from / 60;
        const toHours = availability.to / 60;

        return {
          ...availability,
          from: `${
            fromHours < 10 ? "0" + fromHours + ":00" : fromHours + ":00"
          }`,
          to: `${toHours < 10 ? "0" + toHours + ":00" : toHours + ":00"}`,
        };
      });

      setMyAvailabilities(formatData);
    }

    loadAvailabilities();
  }, [status]);

  useEffect(() => {
    async function loadCalls() {
      const response = await api.get("psychologist/calls");

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
    <div className="painel-psicologo">
      <div className="top-bar">
        <div className="container">
          <div className="top-bar-content">
            <div className="psy-info-content">
              <div className="profile-pic-content">
                <img className="profile-pic" src={UserDefault} alt="" />
              </div>
              <div className="psy-info">
                <h4 className="psicologo-name">{dados && dados.psy_name}</h4>
                <h5 className="psicologo-desc">Psicólogo</h5>
              </div>
            </div>
            <div className="btn-icons-content">
              <img
                className="btn-logout logout"
                src={Logout}
                onClick={handleSingOut}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <div className="history container">
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

                    <span className="last-chat-text chat-line-2">
                      Nota: {call.cal_note}
                    </span>
                  </div>
                ) : (
                  <span className="last-chat-text chat-line-1">
                    Conversa não finalizada
                  </span>
                )}
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
              <div className="col-md-6">
                <Input type="text" name="psy_name" placeholder="Nome" />
              </div>
              <div className="col-md-6">
                <Input type="email" name="psy_email" placeholder="E-mail" />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <Input
                  type="password"
                  name="psy_password"
                  placeholder="Senha"
                />
              </div>
              <div className="col-md-6">
                <Input
                  type="date"
                  name="psy_data_nasc"
                  placeholder="Data Nasc."
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-4">
                <Input type="text" name="psy_crp" placeholder="CRP" />
              </div>
              <div className="col-md-4">
                <Input type="text" name="psy_cpf" placeholder="CPF" />
              </div>
              <div className="col-md-4">
                <Input type="text" name="psy_city" placeholder="Cidade" />
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

      <div className="edit-availability">
        <div className="small-container">
          <h4 className="edit-info-title">Diponibilidade de horário</h4>

          <div>
            <h5>Meus horários</h5>
            {myAvailabilities &&
              myAvailabilities.map((item) => (
                <div className="row hours" key={item.id}>
                  <p>
                    {item.week_day === 1
                      ? "Segunda-feira"
                      : item.week_day === 2
                      ? "Terça-feira"
                      : item.week_day === 3
                      ? "Quarta-feira"
                      : item.week_day === 4
                      ? "Quinta-feira"
                      : item.week_day === 5
                      ? "Sexta-feira"
                      : ""}
                  </p>
                  <p>das</p>
                  <p>{item.from}</p>
                  <p>até</p>
                  <p>{item.to}.</p>

                  <div
                    className="del-availability"
                    onClick={() => deleteAvailability(item.id)}
                  >
                    <p>Excluir</p>
                  </div>
                </div>
              ))}
          </div>

          <button
            onClick={handleAvailabilities}
            type="button"
            className="button-availab"
          >
            + Novo Horario
          </button>
        </div>
        <div className="small-container">
          <form onSubmit={createAvailability}>
            {availabilities &&
              availabilities.map((availability, index) => (
                <div key={index} className="row">
                  <div className="col-md-6">
                    <select
                      name="week_day"
                      value={availability.week_day || ""}
                      onChange={(e) =>
                        setItemAvailability(index, "week_day", e.target.value)
                      }
                    >
                      <option value="" disabled hidden>
                        Selecione um dia
                      </option>

                      <option value="1">Segunda-feira</option>
                      <option value="2">Terça-feira</option>
                      <option value="3">Quarta-feira</option>
                      <option value="4">Quinta-feira</option>
                      <option value="5">Sexta-feira</option>
                    </select>
                  </div>

                  <div className="col-md-3">
                    <input
                      type="time"
                      name="from"
                      value={availability.from}
                      onChange={(e) =>
                        setItemAvailability(index, "from", e.target.value)
                      }
                    />
                  </div>
                  <div className="col-md-3">
                    <input
                      type="time"
                      name="to"
                      value={availability.to}
                      onChange={(e) =>
                        setItemAvailability(index, "to", e.target.value)
                      }
                    />
                  </div>
                </div>
              ))}

            <button type="submit" className="btn-login btn-primary">
              Salvar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Psicologo;
