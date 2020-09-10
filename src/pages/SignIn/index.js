import React from 'react';
import './index.css';
import Img1 from '../../images/img1.png';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { Form, Input } from '@rocketseat/unform';
import { signInRequest } from '../../store/module/auth/actions';


const schema = Yup.object().shape({
    email: Yup.string()
      .email('Insira um e-mail válido')
      .required('O e-mail é obrigatório'),
    password: Yup.string().required('A senha é obrigatória'),
  });
  
  export default function SignIn() {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.auth.loading);
  
    function handleSubmit({ email, password }) {
      dispatch(signInRequest(email, password));
    }

    return (
      <div className="login">
        <div class="form-login">
        <img className="img-destaque" src={Img1} />
        <h2 className="form-title">Psicológo</h2>
        <p className="form-desc">Faça seu login na plataforma</p>
        <Form onSubmit={handleSubmit} schema={schema}>
            <div class="col-md-12">
              <Input type="email" name="email" placeholder="E-mail" />
            </div>
            <div class="col-md-12">
              <Input type="password" name="password" placeholder="Senha" />
            </div>
            <button className="btn-login btn-primary">
              Entrar
            </button>
          </Form>
          <p>
          <a className="forgot-pass-link">
            Esqueceu sua senha?
          </a>
          <a class="signup-link">
            Cadastre-se
          </a>
          </p>
        </div>
      </div>
    );
  }

  //export default SignIn;