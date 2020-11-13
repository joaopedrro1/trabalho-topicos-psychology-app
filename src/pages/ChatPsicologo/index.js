import React, { useState, useEffect, useRef, createRef } from "react";
import "./index.css";
import io from "socket.io-client";
import Enviar from "../../images/enviar.svg";
import api from "../../services/api";
import { useAuth } from "../../hooks/AuthContext";
import { useHistory } from "react-router-dom";
import {
  initializeNotification,
  sendNotification,
} from "../../utils/sendNotification";
import Back from "../../images/back.svg";
import { Link } from "react-router-dom";

function ChatPsicologo(props) {
  const [text, setText] = useState("");
  const [history, setHistory] = useState([]);
  const [call, setCall] = useState({
    id: 0,
    patient_id: null,
    psychologist_id: null,
    cal_start: "2020-10-12T17:38:26.715Z",
    cal_end: null,
    cal_note: null,
    createdAt: "2020-10-12T17:38:26.719Z",
    updatedAt: "2020-10-12T17:46:03.224Z",
    fk_patients: null,
    fk_psychologists: null,
  });
  const [observation, setObservation] = useState("");

  const [isOpen, setIsOpen] = useState(true);

  const [socket, setSocket] = useState(io("http://localhost:3333"));

  const chatRef = createRef();
  const chatWriterRef = createRef();

  const { psychologist } = useAuth();
  const id = props.computedMatch.params.sala;
  const historyRoute = useHistory();

  async function getCall(id) {
    await api.get(`http://localhost:3333/Call/${id}`).then(function (response) {
      setCall(response.data);
      if (response.data.cal_end != null) {
        setIsOpen(false);
      }
    });
  }

  async function getHistory(id) {
    await api
      .get(`http://localhost:3333/Call/${id}/history`)
      .then(function (response) {
        if (response.data.length > 0)
          response.data.map((element) => {
            setHistory((prevHistory) => [
              ...prevHistory,
              { text: element.ath_text, isUser: !element.ath_user },
            ]);
          });
      });
  }

  async function setPsy() {
    await api.put(`/call/${id}`, {
      psychologist_id: psychologist.id,
    });
  }

  async function close(id) {
    setIsOpen(false);
    setCall({ ...call, cal_note: observation });

    await api.post(`http://localhost:3333/Call/${id}`, {
      cal_note: observation,
    });

    alert("Atendimento encerrado");
    // historyRoute.goBack();
  }

  useEffect(async () => {
    socket.emit("transfer_room", id);

    await getCall(id);
    await getHistory(id);
    await setPsy();

    initializeNotification();

    socket.on("text", function (data) {
      setHistory((prevHistory) => [
        ...prevHistory,
        { text: data.text, isUser: false },
      ]);

      sendNotification(
        "Nova mensagem do Paciente",
        {
          title: "Nova mensagem do Paciente",

          body: data.text,
        },
        () => {
          window.focus();
        }
      );
    });
  }, []);

  useEffect(() => {
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [history]);

  return (
    <div className="painel">
      <div className="top-bar">
        <div className="container">
          <div className="top-bar-content">
            <div className="psy-info-content">
              <img className="btn-back back" src={Back} alt="" />
              Você está falando com{" "}
              {call.fk_patients == null
                ? "Usuário anonimo"
                : call.fk_patients.pat_name}
            </div>
            <div className="btn-holder">
              <button
                data-toggle="modal"
                data-target="#encerrarModal"
                className={isOpen ? "btn-close " : "none"}
              >
                Encerrar
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="chat" ref={chatRef}>
          {history.map((element, index) => {
            let classeCss = "isUserBallon";
            if (!element.isUser) classeCss = "isNotUserBallon";
            return (
              <div key={`balao${index}`} className="linha">
                <div className={"ballon " + classeCss}>{element.text}</div>
              </div>
            );
          })}
          {call.cal_note != null ? (
            <div key={`note`} className="linha">
              <div className={"ballon isUserBallon"}>
                Nota do psicologo: <p>{call.cal_note}</p>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
        <form className={isOpen ? "chat-writer " : "none"} ref={chatWriterRef}>
          <input
            type="text"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
          ></input>
          <button
            className="btn-send"
            onClick={(e) => {
              e.preventDefault();

              if (text != "" && text != null) {
                setHistory((prevHistory) => [
                  ...prevHistory,
                  { text: text, isUser: true },
                ]);

                socket.emit("text", {
                  text: text,
                  room: id,
                  isUser: false,
                });
                setText("");
              }
            }}
          >
            <img src={Enviar} />
          </button>
        </form>
      </div>

      <div
        className="modal fade"
        id="encerrarModal"
        role="dialog"
        aria-labelledby="encerrarModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="encerrarModalLabel">
                Encerrar atendimento?
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Fechar"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                Deixe uma observação sobre esse atendimento:
                <textarea
                  onChange={(e) => {
                    setObservation(e.target.value);
                  }}
                  value={observation}
                  className="form-control col-12"
                ></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Não
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => close(id)}
                data-dismiss="modal"
              >
                Sim
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatPsicologo;
