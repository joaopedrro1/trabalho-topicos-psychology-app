import React from "react";
import "./index.css";
import Img1 from "../../images/img1.png";

import { Form, Input } from "@rocketseat/unform";
import * as Yup from "yup";
import { useAuth } from "../../hooks/AuthContext";
import { Link } from "react-router-dom";

const schema = Yup.object().shape({
  pat_email: Yup.string()
    .email("Insira um E-mail válido!")
    .required("O E-mail é obrigatório!"),
  pat_password: Yup.string().required("A Senha é obrigatória!"),
});

function SignInUser() {
  const { loginPatient } = useAuth();

  function handleSubmit(data) {
    loginPatient({ email: data.pat_email, password: data.pat_password });
  }

  return (
    <div className="login">
      <div class="form-login">
        <img className="img-destaque" src={Img1} alt="" />
        <h2 className="form-title">Usuário</h2>
        <p className="form-desc">Faça seu login na plataforma</p>

        <Form onSubmit={handleSubmit} schema={schema}>
          <div className="col-md-12">
            <Input type="email" name="pat_email" placeholder="E-mail" />
          </div>
          <div className="col-md-12">
            <Input type="password" name="pat_password" placeholder="Senha" />
          </div>
          <button type="submit" className="btn-login btn-primary">
            Entrar
          </button>
        </Form>

        <p>
          <Link to="/cadastro" className="signup-link">
            Cadastre-se
          </Link>
        </p>
        <p>
          <Link to="/" className="signup-link">
            Voltar / Home
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignInUser;
