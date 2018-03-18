import React from 'react';

import Aux from '../../hoc/Aux/Aux'

import classes from './Home.css'

const home = () => (
    <Aux>
        <div className={classes.Posts}>
            <div className={classes.Intro}>
                <p className={classes.IntroTitle}>Docteur Marie-Madeleine SINOU </p>
                <div className={classes.IntroBody}>
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
        <div className={classes.Posts}>
            <div className={classes.Post}>
                <p className={classes.PostTitle}>Vivement le printemps...</p>
                <div className={classes.PostBody}>
                    <p>Nous avons profité de ces longs mois d'hiver pour nous repencher sur notre fenêtre sur le monde (virtuel),
                et avons décidé de faire peau neuve. </p>
                    <p>Cette page est la première étape de cette transformation et nous vous demandons un peu de patience;</p>
                    <p>Un pas après l'autre...</p>
                </div>
            </div>
        </div>
    </Aux>
);

export default home;
