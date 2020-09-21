import React from 'react';
import './index.css';
import Img5 from '../../images/img5.png';


function SignUpPsy() {
    return (
      <div className="login">
        <div className="form-login">
        <img className="img-destaque" src={Img5} />
        <h2 className="form-title">Psicológo</h2>
        <p className="form-desc">Faça seu cadastro na plataforma</p>
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
            <button className="btn-login btn-primary">
              Cadastrar
            </button>
          </form>
        </div>
      </div>
    );
  }

  export default SignUpPsy;