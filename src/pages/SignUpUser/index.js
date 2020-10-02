import React from "react";
import "./index.css";
import Img1 from "../../images/img1.png";

import { Form, Input } from "@rocketseat/unform";
import * as Yup from "yup";
import { Link, useHistory } from "react-router-dom";
import api from "../../services/api";
import { toast } from "react-toastify";

const schema = Yup.object().shape({
  pat_name: Yup.string().required("O Nome é obrigatório!"),
  pat_email: Yup.string()
    .email("Insira um E-mail válido!")
    .required("O E-mail é obrigatório!"),
  pat_password: Yup.string().required("A Senha é obrigatória!"),
});

function SignUpUser() {
  const history = useHistory();

  async function handleSubmit(data) {
    try {
      await api.post("patient", {
        pat_name: data.pat_name,
        pat_email: data.pat_email,
        pat_password: data.pat_password,
      });

      history.push("/login");
      toast.success("Cadastrado com sucesso!");
    } catch (error) {
      toast.error("Erro ao cadastrar-se, verifique seus dados!");
    }
  }

  return (
    <div className="login">
      <div className="form-login">
        <img className="img-destaque" src={Img1} alt="" />
        <h2 className="form-title">Usuário</h2>
        <p className="form-desc">Faça seu cadastro na plataforma</p>

        <Form onSubmit={handleSubmit} schema={schema}>
          <div className="row">
            <div className="col-md-4">
              <Input type="text" name="pat_name" placeholder="Nome" />
            </div>
            <div className="col-md-4">
              <Input type="email" name="pat_email" placeholder="E-mail" />
            </div>
            <div className="col-md-4">
              <Input type="password" name="pat_password" placeholder="Senha" />
            </div>
          </div>

          <button type="submit" className="btn-login btn-primary">
            Cadastrar
          </button>

          <Link to="/login" className="signup-link">
            Voltar / Login
          </Link>
        </Form>
      </div>
    </div>
  );
}

export default SignUpUser;
