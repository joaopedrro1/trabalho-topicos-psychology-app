import React from 'react';
import logo from './logo.svg';
import './App.css';
import Img1 from './images/img1.png';
import Img2 from './images/img2.png';
import Img3 from './images/img3.png';
import Img4 from './images/img-4.png';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div class="container">
        <img src={logo} className="App-logo" alt="logo" />
        </div>
      </header>
      <main>
        <div className="slide-home">
          <div className="slide-content">
          
            <h1>Precisa de ajuda?</h1>
            <p>Nós estamos aqui para te ouvir, clique no botão agora e fale com um psicólogo imediatamente</p>
            <button className="btn-main">
              Quero conversar
            </button>
          </div>
        </div>
        <div className="first-section">
        <div class="container">
          <h2>Como funciona?</h2>
          <hr className="divisor"></hr>
          <div class="row">
          <div className="col-md-3 Steps">
            <img className="step-img" src={Img1}/>
            <h4 className="steps-title">1. Rápido</h4>
            <p>Clique no botão "Quero Conversar" no slide acima e converse com um psicológo registrado em nossa
              platafoma
            </p>
          </div>
          <div className="col-md-3 Steps">
          <img className="step-img" src={Img2}/>
          <h4 className="steps-title">2. Anônimo</h4>
          <p>Você não precisa se identificar, nós estamos aqui para te auxiliar em momentos de ajuda e indecisão
            </p>
          </div>
          <div className="col-md-3 steps">
          <img className="step-img" src={Img3}/>
          <h4 className="steps-title">3. Facilidade</h4>
          <p>Você pode sair a qualquer momento e retornar, não precisa de cadastro e suas conversas serão vistas
            somente por nossos psicológos cadastrados
          </p>
          </div>
          <div className="col-md-3 steps">
          <img className="step-img" src={Img4}/>
            <h4 className="steps-title">4. Ajuda</h4>
          <p>Oferecemos ajuda também por um de nossos telefones, basta ligar que um psicologoa irá te atender</p>
          </div>
          </div>
        </div>
        </div>
        <div className="second-section">
          <div class="container">
            <div>
              <h3>Você também pode nos ligar</h3>
              <p>Encaminharemos você a<br/> um psicólogo que irá te<br/> auxiliar</p>
              <big>0800-111-12</big> 
            </div> 
          </div>
        </div>
      </main>
      <footer>
        <p>Todos os direitos reservados. 2020.</p>
      </footer>
    </div>
  );
}

export default App;
