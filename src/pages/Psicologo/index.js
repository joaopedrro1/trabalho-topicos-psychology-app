import React from 'react';
import './index.css';
import Img1 from '../../images/img1.png';
import Edit from '../../images/edit.svg';
import Clock from '../../images/clock.svg';

function Psicologo() {
    return (
      <div className="painel">
        <div className="top-bar">
        <div className="container">
        <div className="row align-center">
            <div className="col-md-2">
                <img className="profile-pic" src={Img1} />
            </div>
            <div className="col-md-8">
                <h4 className="psicologo-name">João Pedro</h4>
                <h5 className="psicologo-desc">Psicológo</h5>
            </div>
            <div className="col-md-2 align-right">
                <img className="btn-edit" src={Edit} />
            </div>
            </div>
        </div>
        </div>
        <div className="call">
            <h4>Você tem uma chamada</h4>
            <div className="accept-decline">
                <button className="btn-primary btn-accept">
                    Aceitar
                </button>
                <button className="btn-secondary btn-decline">
                    Recusar
                </button>
            </div>
        </div>
        <hr className="divisor-section"></hr>
        <div className="history">
            <div className="history-content history-1 container align-center">
                <div className="row">
                    <div className="col-md-2 align-right clock-icon">
                    <img className="clock" src={Clock} />
                    </div>
                    <div className="col-md-10 last-chat">
                        <span className="last-chat-text chat-line-1">Conversa iniciada</span>
                        <span className="last-chat-text chat-line-2">as 14h terminada as 14h30</span>
                    </div>
                </div>
            </div>
            <hr className="divisor-section"></hr>
            <div className="history-content history-2 container align-center">
                <div className="row">
                    <div className="col-md-2 align-right clock-icon">
                    <img className="clock" src={Clock} />
                    </div>
                    <div className="col-md-10 last-chat">
                        <span className="last-chat-text chat-line-1">Conversa iniciada</span>
                        <span className="last-chat-text chat-line-2">as 14h terminada as 14h30</span>
                    </div>
                </div>
            </div>
            <hr className="divisor-section"></hr>
        </div>
        <div className="edit-info">
            <div className="container">
            <h4 className="edit-info-title">Editar informações</h4>
            </div>
            <div className="small-container">
            <form>
            <div className="row">
            <div className="col-md-6">
              <input type="email" name="email" placeholder="Nome">
              </input>
            </div>
            <div className="col-md-6">
              <input type="email" placeholder="E-mail">
              </input>
            </div>
            </div>
            <div className="row">
            <div className="col-md-4">
              <input type="date" name="data-nasc" placeholder="Data Nasc.">
              </input>
            </div>
            <div className="col-md-4">
              <input type="password" placeholder="Senha">
              </input>
            </div>
            <div className="col-md-4">
              <input type="password" placeholder="Confirmar senha">
              </input>
            </div>
            </div>
            <button className="btn-edit-info btn-primary">
              Editar
            </button>
          </form>
          </div>
        </div>
    </div>
    );
  }

  export default Psicologo;
