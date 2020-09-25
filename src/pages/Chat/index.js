import React, { useState, useEffect, useRef, createRef } from "react";
import "./index.css";
import io from "socket.io-client";
import Enviar from "../../images/enviar.svg";
import api from "../services/api";

function Chat(props) {
  const [texto, setTexto] = useState();
  const [conversa, setConversa] = useState([]);
  const [socket, setSocket] = useState(io("http://localhost:3333"));
  const chatRef = createRef();

  async function getHistorico(id) {
    api
      .post(`http://localhost:3333/Call/${id}/history`)
      .then(function (response) {
        console.log(response);
      });
  }

  useEffect(() => {
    socket.emit("transfer_room", props.match.params.sala);
    getHistorico(props.match.params.sala);
    socket.on("text", function (data) {
      setConversa((prevConversa) => [
        ...prevConversa,
        { text: data.text, isUser: false },
      ]);
    });
  }, []);

  useEffect(() => {
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [conversa]);

  return (
    <div className="painel">
      <div className="top-bar">
        <div className="container">
          <div className="top-bar-content">
            <div className="btn-back-content"></div>
            <div className="psy-info-content">
              Você está conversando com <b>João</b>
              <br />
              Psicologo da plataforma
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="chat" ref={chatRef}>
          {conversa.map((element, index) => {
            let classeCss = "isUserBallon";
            if (!element.isUser) classeCss = "isNotUserBallon";
            return (
              <div key={`balao${index}`} className="linha">
                <div className={"ballon " + classeCss}>{element.text}</div>
              </div>
            );
          })}
        </div>
        <div className="chat-writer">
          <input
            type="text"
            value={texto}
            onChange={(e) => {
              setTexto(e.target.value);
            }}
          ></input>
          <button
            className="btn-send"
            onClick={() => {
              var text = texto;
              if (text != "" && text != null) {
                setConversa((prevConversa) => [
                  ...prevConversa,
                  { text: text, isUser: true },
                ]);

                socket.emit("text", {
                  text: text,
                  room: props.match.params.sala,
                  isUser: true,
                });
              }
            }}
          >
            <img src={Enviar} style={{ fill: "white", width: "30px" }} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
