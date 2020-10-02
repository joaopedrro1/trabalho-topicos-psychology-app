import React, { useState, useEffect, useRef, createRef } from "react";
import "./index.css";
import io from "socket.io-client";
import Enviar from "../../images/enviar.svg";
import api from "../../services/api";

function ChatPsicologo(props) {
  const [text, setText] = useState("");
  const [history, setHistory] = useState([]);
  const [call, setCall] = useState({});
  const [observation, setObservation] = useState("");

  const [isOpen, setIsOpen] = useState(true);

  const [socket, setSocket] = useState(io("http://localhost:3333"));

  const chatRef = createRef();
  const chatWriterRef = createRef();

  const id = props.computedMatch.params.sala;

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

  async function close(id) {
    setIsOpen(false);

    await api.post(`http://localhost:3333/Call/${id}`, {
      cal_note: observation,
    });
    alert("Atendimento encerrado");
  }

  useEffect(async () => {
    socket.emit("transfer_room", id);

    await getCall(id);
    await getHistory(id);

    socket.on("text", function (data) {
      setHistory((prevHistory) => [
        ...prevHistory,
        { text: data.text, isUser: false },
      ]);
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
            <div className="btn-back-content"></div>
            <div className="psy-info-content">
              Você está falando com{" "}
              {call.fk_patients === undefined ? "" : call.fk_patients.pat_name}
              <button
                data-toggle="modal"
                data-target="#encerrarModal"
                className={isOpen ? "btn-close " : "none"}
              >
                Encerrar atendimento
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
        </div>
        <div className={isOpen ? "chat-writer " : "none"} ref={chatWriterRef}>
          <input
            type="text"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
          ></input>
          <button
            className="btn-send"
            onClick={() => {
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
              }
            }}
          >
            <img src={Enviar} style={{ fill: "white", width: "30px" }} />
          </button>
        </div>
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
                <p>Se necessário, deixe uma observação sobre o paciente:</p>
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
              >
                Salvar e fechar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatPsicologo;
