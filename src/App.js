import React, { Component } from 'react';
import logo from './assets/images/moving-logo.svg';
import './App.css';

class App extends Component {
//   <img src={logo} className="App-logo" alt="Un pas après l'autre" />


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="App-title">Un pas après l'autre</div>
          <div className="App-subtitle">Coaching en santé<br/>Marie-Madeleine SINOU</div>
        </header>

     <div className="Posts"> 
        <div className="Intro"> 
          <p className="Intro-title">Docteur Marie-Madeleine SINOU </p>          
          <div className="Intro-body">       
            <p>Médecin généraliste et homéopathe, Maître Praticienne en PNL j'ai exercé en cabinet libéral pendant 30 ans.</p>
            <p>La santé est un bien précieux...
              <ul> 
                <li>Comment  l'entretenir ?</li>
                <li>Comment la préserver ?</li>
                <li>Comment y tendre à nouveau quand survient la maladie ?</li>
              </ul>
            </p>
            <p>Accompagnements individuels, ateliers, réflexions, livres, films...</p>
            <p>Des propositions sont faites ici pour accompagner chacun au fil des jours, pas à pas.</p>
          </div>
          </div>
          </div>
        <div className="Posts"> 
          
          <div className="Post"> 
            <p className="Post-title">Vivement le printemps...</p>          
            <div className="Post-body">
              <p>Nous avons profité de ces longs mois d'hiver pour nous repencher sur notre fenêtre sur le monde (virtuel), 
                et avons décidé de faire peau neuve. </p>
              <p>Cette page est la première étape de cette transformation et nous vous demandons un peu de patience;</p>        
              <p>Un pas après l'autre...</p>        
            </div>
          </div>
        </div>
        
        <footer className="App-footer">
          <div>(C)2018 Marie-Madeleine Sinou  &nbsp;&nbsp;&nbsp;</div>
          <div><a href="mailto:contact@unpasapreslautre.com"> Contact</a></div>
        </footer>

      </div>
    );
  }
}

export default App;
