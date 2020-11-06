import React, { useState, useEffect, useRef, createRef } from "react";
import "./index.css";
import io from "socket.io-client";
import Enviar from "../../images/enviar.svg";
import api from "../../services/api";

function Chat(props) {
  const [text, setText] = useState();
  const [conversa, setConversa] = useState([]);
  const [socket, setSocket] = useState(io("http://localhost:3333"));
  const [call, setCall] = useState({});
  const [isOpen, setIsOpen] = useState(true);

  const chatRef = createRef();
  const chatWriterRef = createRef();

  async function getCall(id) {
    api.get(`http://localhost:3333/Call/${id}`).then(async function (response) {
      setCall(response.data);

      if (response.data.cal_end != null) {
        setIsOpen(false);
      }
    });
  }

  async function getHistorico(id) {
    api
      .get(`http://localhost:3333/Call/${id}/history`)
      .then(function (response) {
        console.log(response);

        response.data.map((element) => {
          setConversa((prevConversa) => [
            ...prevConversa,
            { text: element.ath_text, isUser: element.ath_user },
          ]);
        });
      });
  }

  useEffect(() => {
    console.log(props.computedMatch.params.sala);
    socket.emit("transfer_room", props.computedMatch.params.sala);
    getHistorico(props.computedMatch.params.sala);
    getCall(props.computedMatch.params.sala);
    socket.on("text", function (data) {
      setConversa((prevConversa) => [
        ...prevConversa,
        { text: data.text, isUser: false },
      ]);
    });
  }, []);

  useEffect(() => {
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
    getCall(props.computedMatch.params.sala);
  }, [conversa]);

  return (
    <div className="painel">
      <div className="top-bar">
        <div className="container">
          <div className="top-bar-content">
            <div className="btn-back-content"></div>
            <div className="psy-info-content">
              Você está conversando com{" "}
              {call.fk_psychologists == undefined
                ? "..."
                : call.fk_psychologists.psy_name}
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
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              if (text != "" && text != null) {
                setConversa((prevConversa) => [
                  ...prevConversa,
                  { text: text, isUser: true },
                ]);

                socket.emit("text", {
                  text: text,
                  room: props.computedMatch.params.sala,
                  isUser: true,
                });
                setText("");
              }
            }}
          >
            <img src={Enviar} style={{ fill: "white", width: "30px" }} />
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
