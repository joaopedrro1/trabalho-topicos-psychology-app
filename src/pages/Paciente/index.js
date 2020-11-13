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
import getDay from "date-fns/getDay";
import parseISO from "date-fns/parseISO";

import { getHours, getMinutes, isAfter } from "date-fns";
import formatDay from "../../utils/FormatDay";
import WeekInMinutes from "../../utils/WeekInMinutes";
import { addMinutes } from "date-fns/esm";

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
  const [psychologists, setPsychologists] = useState([]);
  const [psySelected, setPsySelected] = useState();
  const [availabilitys, setAvailabilitys] = useState([]);
  const [status, setStatus] = useState(true);
  const [reloadCalls, setReloadCalls] = useState(false);

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

  async function handleSchedulerCall(psychologist_id, cal_start) {
    try {
      toast.success("Agendamento realizado");
      const patient_id = JSON.parse(localStorage.getItem("@Patient:patient"))
        .id;
      const call = await api.post("call", {
        patient_id: patient_id,
        psychologist_id: psychologist_id,
        cal_start: cal_start,
      });
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

  function toHours(availability) {
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
      from: `${fromHours < 10 ? "0" + fromHours + ":00" : fromHours + ":00"}`,
      to: `${toHours < 10 ? "0" + toHours + ":00" : toHours + ":00"}`,
    };
  }

  async function loadPsychologists() {
    const response = await api.get("psychologist/list");

    const data = response.data.map((psy) => ({
      ...psy,
    }));
    setPsychologists(data);
  }

  async function loadCalls() {
    const response = await api.get("patient/calls");

    const data = response.data.map((call) => ({
      ...call,
      cal_start_t: call.cal_start,
      cal_start: new Intl.DateTimeFormat("pt-br").format(
        new Date(call.cal_start)
      ),
      cal_end: call.cal_end
        ? `${new Intl.DateTimeFormat("pt-br").format(new Date(call.cal_end))}`
        : null,
      cal_hour_start: `${new Date(call.cal_start).getHours()}:${String(
        new Date(call.cal_start).getMinutes()
      ).padStart(2, "0")}`,
      cal_hour_end: call.cal_end
        ? `${new Date(call.cal_end).getHours()}:${String(
            new Date(call.cal_end).getMinutes()
          ).padStart(2, "0")}`
        : null,
    }));
    setCalls(data);
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
    loadCalls();
    loadPsychologists();
  }, []);

  useEffect(() => {
    loadCalls();
  }, [reloadCalls]);
  //  console.log(calls && calls);

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
        <br></br>
        <span className="relod" onClick={() => setReloadCalls(!reloadCalls)}>
          Recarregar Chamadas Anônimas
        </span>

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
                    {isAfter(new Date(call.cal_start_t), new Date())
                      ? "Conversa Agendada"
                      : "Conversa Iniciada"}
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
                  {!isAfter(new Date(call.cal_start_t), new Date()) ? (
                    <a href={"/chat/" + call.id + "/"}>
                      <button className="btn-view btn-primary">Ver</button>
                    </a>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <hr className="divisor-section"></hr>
            </div>
          ))}
      </div>
      <div className="call-scheduler">
        <div className="container">
          <h4 className="call-scheduler -title">AGENDAR ATENDIMENTO</h4>
        </div>
        <div className="small-container">
          <select
            value={psySelected || ""}
            onChange={(v) => {
              setPsySelected(v.target.value);

              setAvailabilitys(
                psychologists[v.target.value].fk_psy_availability
              );
            }}
          >
            <option value="" disabled hidden>
              Selecione
            </option>

            {psychologists.map((value, index) => {
              return (
                <option key={index} value={index}>
                  {value.psy_name}
                </option>
              );
            })}
          </select>

          {availabilitys.length > 0 ? (
            <>
              Horarios disponiveis:
              <table style={{ width: "100%" }}>
                <tbody>
                  {availabilitys.map((value, index) => {
                    const horario = toHours(value);
                    let horarioLivre = true;

                    psychologists[psySelected].fk_calls.map(
                      (valueCalls, index) => {
                        if (
                          getDay(parseISO(valueCalls.cal_start)) ===
                          horario.week_day
                        ) {
                          const minutesStart =
                            getHours(parseISO(valueCalls.cal_start)) * 60 +
                            getMinutes(parseISO(valueCalls.cal_start));

                          if (
                            minutesStart >= value.from &&
                            minutesStart <= value.to
                          ) {
                            //    console.log("Horario indisponivel");
                            horarioLivre = false;
                          }
                        }
                      }
                    );
                    if (horarioLivre) {
                      return (
                        <tr key={index}>
                          <td>{formatDay(horario.week_day)}</td>
                          <td>{horario.from}</td>
                          <td>{horario.to}</td>
                          <td>
                            <button
                              onClick={(e) => {
                                const minutosAtual = WeekInMinutes(
                                  getDay(Date.now()),
                                  getHours(Date.now()),
                                  getMinutes(Date.now())
                                );

                                const minutosAgendado = WeekInMinutes(
                                  horario.week_day,
                                  value.from / 60,
                                  value.from / 60 / 60
                                );

                                let horarioAgendamento = 0;

                                if (minutosAtual > minutosAgendado) {
                                  horarioAgendamento = addMinutes(
                                    Date.now(),
                                    10080 - minutosAtual + minutosAgendado
                                  );
                                } else {
                                  horarioAgendamento = addMinutes(
                                    Date.now(),
                                    minutosAgendado - minutosAtual
                                  );
                                }

                                handleSchedulerCall(
                                  psychologists[psySelected].id,
                                  horarioAgendamento
                                );

                                const newAvailabilitys = availabilitys.filter(
                                  (value, indexFilter) => {
                                    return index !== indexFilter;
                                  }
                                );
                                setAvailabilitys(newAvailabilitys);
                              }}
                              className="btn-agendar btn-primary"
                            >
                              Agendar
                            </button>
                          </td>
                        </tr>
                      );
                    }
                  })}
                </tbody>
              </table>
            </>
          ) : (
            ""
          )}
        </div>
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
              <button type="submit" className="btn-primary btn-editar">
                Editar
              </button>

              <button
                onClick={handleDelete}
                type="button"
                className="btn-delete btn-secondary"
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
