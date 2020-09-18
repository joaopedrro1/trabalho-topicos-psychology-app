import React from "react";
import "./index.css";
import Img1 from "../../images/img1.png";
import Edit from "../../images/edit.svg";
import Clock from "../../images/clock.svg";
import Logout from "../../images/logout.svg";

function Ballon(text, isUser) {
  let classe = "isUserBallon";
  if (!isUser) classe = "isNotUserBallon";
  return <div class={"ballon " + classe}>text</div>;
}

function Chat() {
  return (
    <div className="painel">
      <div className="top-bar">
        <div className="container">
          <div className="top-bar-content">
            <div className="btn-back-content">
              <img className="btn-edit" src={Edit} />
            </div>
            <div class="psy-info-content">
              Você está conversando com <b>João</b>
              <br />
              Psicólogo da plataforma
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="chat">
          {Ballon("teste user", true)}
          {Ballon("teste user", false)}
        </div>
        <div>
          <input type="text"></input>
        </div>
      </div>
    </div>
  );
}

export default Chat;
