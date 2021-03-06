import React from "react";
import "./index.css";
import Img1 from "../../images/img1.png";
import Img2 from "../../images/img2.png";
import Img3 from "../../images/img3.png";
import Img4 from "../../images/img-4.png";
import api from "../../services/api.js";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

function Home() {
  async function handleStartChat() {
    try {
      toast.success("Iniciando atendimento!");

      const call = await api.post("call", {
        patient_id: null,
      });
      history.push(`/chat-anonimo/${call.data.id}`);
    } catch (error) {
      toast.error("Erro ao iniciar atendimento");
    }
  }

  const history = useHistory();

  return (
    <div className="home">
      <div className="slide-home">
        <div className="slide-content">
          <h1>Precisa de ajuda?</h1>
          <p>
            Nós estamos aqui para te ouvir, clique no botão agora e fale com um
            psicólogo imediatamente
          </p>
          <button onClick={handleStartChat} className="btn-primary">
            Quero conversar
          </button>
        </div>
      </div>
      <div className="first-section container">
        <h2>Como funciona?</h2>
        <hr className="divisor"></hr>
        <div className="row">
          <div className="col-md-3 steps">
            <img className="step-img" src={Img1} />
            <h4 className="steps-title">1. Rápido</h4>
            <p>
              Clique no botão "Quero Conversar" no slide acima e converse com um
              psicológo registrado em nossa platafoma
            </p>
          </div>
          <div className="col-md-3 steps">
            <img className="step-img" src={Img2} />
            <h4 className="steps-title">2. Anônimo</h4>
            <p>
              Você não precisa se identificar, nós estamos aqui para te auxiliar
              em momentos de ajuda e indecisão
            </p>
          </div>
          <div className="col-md-3 steps">
            <img className="step-img" src={Img3} />
            <h4 className="steps-title">3. Facilidade</h4>
            <p>
              Você pode sair a qualquer momento e retornar, não precisa de
              cadastro e suas conversas serão vistas somente por nossos
              psicológos cadastrados
            </p>
          </div>
          <div className="col-md-3 steps">
            <img className="step-img" src={Img4} />
            <h4 className="steps-title">4. Ajuda</h4>
            <p>
              Oferecemos ajuda também por um de nossos telefones, basta ligar
              que um psicologoa irá te atender
            </p>
          </div>
        </div>
      </div>
      <div className="second-section">
        <div className="container">
          <div>
            <h3>Faça Login</h3>
            <Link className="links" to="/login">
              Paciente
            </Link>
            <Link className="links" to="/login-psicologo">
              Psicólogo
            </Link>
            <br /> <br />
            <h3>Cadastre-se</h3>
            <p>
              Se preferir, você pode se cadastrar na plataforma e ter acesso ao
              seu histórico de conversas
            </p>
            <Link className="links" to="/cadastro">
              Cadastro Paciente
            </Link>
            <Link className="links" to="/cadastro-psicologo">
              Cadastro Psicólogo
            </Link>
          </div>
        </div>
      </div>
      <footer>
        <p>Todos os direitos reservados. 2020.</p>
      </footer>
    </div>
  );
}

export default Home;
