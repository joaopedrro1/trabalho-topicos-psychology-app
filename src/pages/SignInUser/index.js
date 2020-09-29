import React from 'react';
import './index.css';
import Img1 from '../../images/img1.png';


function SignInUser(){
    return (
      <div className="login">
        <div class="form-login">
        <img className="img-destaque" src={Img1} alt="" />
        <h2 className="form-title">Usuário</h2>
        <p className="form-desc">Faça seu login na plataforma</p>
        <form>
            <div class="col-md-12">
              <input type="email" name="email" placeholder="E-mail"/>
            </div>
            <div class="col-md-12">
              <input type="password" name="password" placeholder="Senha"/>
            </div>
            <button className="btn-login btn-primary">
              Entrar
            </button>
        </form>
          <p>

          <a href class="signup-link">
            Cadastre-se
          </a>
          </p>
        </div>
      </div>
    );
  }

  export default SignInUser;
