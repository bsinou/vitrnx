import React, { Component } from 'react';
import Lightbox from 'react-images'

import Aux from '../../hoc/Aux/Aux'

import classes from './Home.css'


class Home extends Component {

    gotoPrevious() { }

    gotoNext() { }

    closeLightbox() { }

    render() {

        let titleStr = 'Docteur Marie-Madeleine SINOU';
        // Not very clean
        if (window.innerWidth < 500) {
            titleStr = 'Dr. Marie-Madeleine SINOU'
        }

        return (
            <Aux>
                <div className={classes.Posts}>
                    <div className={classes.Intro}>
                        <p className={classes.IntroTitle}>{titleStr}</p>
                        <div className={classes.IntroBody}>
                            <p>Médecin généraliste et homéopathe, Maître Praticienne en PNL j'ai exercé en cabinet libéral pendant 30 ans.</p>
                            <p>La santé est un bien précieux...</p>
                            <ul>
                                <li>Comment l'entretenir ?</li>
                                <li>Comment la préserver ?</li>
                                <li>Comment y tendre à nouveau quand survient la maladie ?</li>
                            </ul>

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
                {/* <div 
                    style={{ height: '900px', width: '1600px', backgroundImage: 'url("https://cdn-7.nikon-cdn.com/Images/Learn-Explore/Photography-Techniques/2017/Deb-Sandidge-sunrises-sunsets/Media/Deb-Sandidge-13_Sunset-Melbourne-Beach.jpg")' }}
		        />
                
                <Lightbox
                    images={[
                        { src: '../../assets/images/test1.jpg' },
                        { src: '../../assets/images/test2.jpg' },
                        { src: '../../assets/images/test3.jpg' },
                        { src: '../../assets/images/test4.jpg' },
                        { src: '../../assets/images/test0.jpg' },
                    ]}
                    isOpen={false}
                    onClickPrev={this.gotoPrevious}
                    onClickNext={this.gotoNext}
                    onClose={this.closeLightbox}
                /> */}
            </Aux>
        );
    }
}

export default Home;
