import React from 'react';
import './index.css';
import Img1 from '../../images/img1.png';

import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { useAuth } from '../../hooks/AuthContext';
import { Link } from 'react-router-dom';

const schema = Yup.object().shape({
  psy_email: Yup.string()
    .email('Insira um E-mail válido!')
    .required('O E-mail é obrigatório!'),
  psy_password: Yup.string().required('A Senha é obrigatória!'),
});

function SignInPsy(){
  const { loginPsychologist } = useAuth();

  function handleSubmit(data) {
    loginPsychologist({ email: data.psy_email, password: data.psy_password});
  }

    return (
      <div className="login">
        <div className="form-login">
          <img className="img-destaque" src={Img1} alt="Imagem" />
          <h2 className="form-title">Psicológo</h2>
          <p className="form-desc">Faça seu login na plataforma</p>

          <Form onSubmit={handleSubmit} schema={schema}>
            <div className="col-md-12">
              <Input  type="email"  name="psy_email" placeholder="E-mail"/>
            </div>
            <div className="col-md-12">
              <Input type="password"  name="psy_password" placeholder="Senha"/>
            </div>
            <button type="submit" className="btn-login btn-primary">
              Entrar
            </button>
          </Form>

          <p>
          <a className="forgot-pass-link">
            Esqueceu sua senha?
          </a>
          <Link to="/cadastro-psicologo" className="signup-link">
            Cadastre-se
          </Link>
          </p>
        </div>
      </div>
    );
  }

  export default SignInPsy;
