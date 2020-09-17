import React from 'react';
import './index.css';
import Img1 from '../../images/img1.png';
import Edit from '../../images/edit.svg';
import Clock from '../../images/clock.svg';
import Logout from '../../images/logout.svg';

function Paciente() {
    return (
      <div className="painel">
        <div className="top-bar">
        <div className="container">
        <div className="top-bar-content">
            <div className="profile-pic-content">
                <img className="profile-pic" src={Img1} />
            </div>
            <div class="psy-info-content">
                <h4 className="paciente-name">João Pedro</h4>
                <h5 className="paciente-desc">Paciente</h5>
            </div>
            <div class="btn-icons-content">
                <img className="btn-edit" src={Edit} />
                <img className="btn-logout" src={Logout} />
            </div>
            </div>
        </div>
        </div>
        <div className="history container">
            <h4 class="history-title">Histórico</h4> 
            <div className="history-content history-1 small-container align-center">
                <div className="row">
                    <div className="col-md-2 align-right clock-icon">
                    <img className="clock" src={Clock} />
                    </div>
                    <div className="col-md-10 last-chat">
                        <span className="last-chat-text chat-line-1">Conversa iniciada com o Psicológo <b>João</b></span>
                        <span className="last-chat-text chat-line-2">as 14h terminada as 14h30</span>
                    </div>
                </div>
            </div>
            <hr className="divisor-section"></hr>
            <div className="history-content history-2 small-container align-center">
                <div className="row">
                    <div className="col-md-2 align-right clock-icon">
                    <img className="clock" src={Clock} />
                    </div>
                    <div className="col-md-10 last-chat">
                        <span className="last-chat-text chat-line-1">Conversa iniciada com o Psicológo <b>Pedro</b></span>
                        <span className="last-chat-text chat-line-2">as 14h terminada as 14h30</span>
                    </div>
                </div>
            </div>
            <hr className="divisor-section"></hr>
        </div>
        <div className="edit-info">
            <div class="container">
            <h4 className="edit-info-title">Editar informações</h4>
            </div>
            <div class="small-container">
            <form>
            <div class="row">
            <div class="col-md-6">
              <input type="email" name="email" placeholder="Nome">
              </input>
            </div>
            <div class="col-md-6">
              <input type="email" placeholder="E-mail">
              </input>
            </div>
            </div>
            <div class="row">
            <div class="col-md-4">
              <input type="date" name="data-nasc" placeholder="Data Nasc.">
              </input>
            </div>
            <div class="col-md-4">
              <input type="password" placeholder="Senha">
              </input>
            </div>
            <div class="col-md-4">
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

  export default Paciente;