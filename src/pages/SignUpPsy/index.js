import React from 'react';
import './index.css';
import Img1 from '../../images/img1.png';


function SignUpPsy() {
    return (
      <div className="login">
        <div class="form-login">
        <img className="img-destaque" src={Img1} />
        <h2 className="form-title">Psicológo</h2>
        <p className="form-desc">Faça seu cadastro na plataforma</p>
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
            <button className="btn-login btn-primary">
              Cadastrar
            </button>
          </form>
        </div>
      </div>
    );
  }

  export default SignUpPsy;