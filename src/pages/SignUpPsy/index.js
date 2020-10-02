import React from "react";
import "./index.css";
import Img5 from "../../images/img-4.png";

import { Form, Input } from "@rocketseat/unform";
import * as Yup from "yup";
import { Link, useHistory } from "react-router-dom";
import api from "../../services/api";
import { toast } from "react-toastify";

const schema = Yup.object().shape({
  psy_name: Yup.string().required("O Nome é obrigatório!"),
  psy_email: Yup.string()
    .email("Insira um E-mail válido!")
    .required("O E-mail é obrigatório!"),
  psy_password: Yup.string().required("A Senha é obrigatória!"),
  psy_data_nasc: Yup.string().required("Data de nascimento obrigatória"),
  psy_crp: Yup.string().required("O CRP é obrigatório!"),
  psy_cpf: Yup.string().required("O CPF é obrigatório!"),
  psy_city: Yup.string().required("A cidade é obrigatória!"),
});

function SignUpPsy() {
  const history = useHistory();

  async function handleSubmit(data) {
    try {
      await api.post("psychologist", {
        psy_name: data.psy_name,
        psy_email: data.psy_email,
        psy_password: data.psy_password,
        psy_data_nasc: data.psy_data_nasc,
        psy_crp: data.psy_crp,
        psy_cpf: data.psy_cpf,
        psy_city: data.psy_city,
      });

      history.push("/login-psicologo");
      toast.success("Cadastrado com sucesso!");
    } catch (error) {
      toast.error("Erro ao cadastrar-se, verifique seus dados!");
    }
  }

  return (
    <div className="login">
      <div className="form-login">
        <img className="img-destaque" src={Img5} />
        <h2 className="form-title">Psicológo</h2>
        <p className="form-desc">Faça seu cadastro na plataforma</p>

        <Form onSubmit={handleSubmit} schema={schema}>
          <div className="row">
            <div className="col-md-6">
              <Input type="text" name="psy_name" placeholder="Nome" />
            </div>
            <div className="col-md-6">
              <Input type="email" name="psy_email" placeholder="E-mail" />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <Input type="password" name="psy_password" placeholder="Senha" />
            </div>
            <div className="col-md-6">
              <Input
                type="date"
                name="psy_data_nasc"
                placeholder="Data Nasc."
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-4">
              <Input type="text" name="psy_crp" placeholder="CRP" />
            </div>
            <div className="col-md-4">
              <Input type="text" name="psy_cpf" placeholder="CPF" />
            </div>
            <div className="col-md-4">
              <Input type="text" name="psy_city" placeholder="Cidade" />
            </div>
          </div>
          <button type="submit" className="btn-login btn-primary">
            Cadastrar
          </button>

          <Link to="/login-psicologo" className="signup-link">
            Voltar / Login
          </Link>
        </Form>
      </div>
    </div>
  );
}

export default SignUpPsy;
