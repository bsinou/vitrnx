import React, { Component } from 'react';

import {publicServer} from '../../../apiServer';
import Markdown from 'react-markdown';

import Aux from '../../../hoc/AuxWrapper/AuxWrapper'

import classes from './pages.css'

class Home extends Component {

    state = {
        loadedPost: null,
    }

    componentDidMount() {
        this.loadData();
    }

    componentDidUpdate() {
        this.loadData();
    }

    loadData() {
        if (!this.state.loadedPost) {
            publicServer.get('/posts/page-d-accueil').then(response => {
                this.setState({ loadedPost: response.data.post });
            });
        }
    }


    render() {
        if (!this.state.loadedPost) return null;

        var post = this.state.loadedPost;
        return (
            <div className={classes.Page}>
                <p>
                    <img className={classes.IntroImage} src={"../files/images/" + post.hero} alt="La santé... autrement." />
                    <div className={classes.IntroBody}>
                        <div className={classes.IntroTitle}>{post.title}</div>
                        <Markdown className={classes.Body} escapeHtml={true} source={post.body} />
                    </div>
                </p>
            </div>
            // <Aux>
            //     <div className={classes.Page}>
            //         <p>
            //             <img className={classes.IntroImage} src="../files/images/bench.jpg" alt="La santé... autrement." />
            //             <div className={classes.Intro}>
            //                 <div className={classes.IntroTitle}>{titleStr}</div>
            //                 {/* <div className={classes.IntroSubtitle}>
            //                     <p>Médecin généraliste et homéopathe, Maître Praticienne en PNL,<br />j'ai exercé en cabinet libéral pendant 30 ans.</p>
            //                 </div> */}
            //                 <div className={classes.IntroBody}>
            //                     <p>Médecin généraliste et homéopathe, Maître Praticienne en PNL,<br />j'ai exercé en cabinet libéral pendant 30 ans.</p>
            //                     <p>La santé est un bien précieux...</p>
            //                     <ul>
            //                         <li>Comment faire pour l'entretenir&nbsp;?</li>
            //                         <li>Comment faire pour la préserver&nbsp;?</li>
            //                         <li>Comment y tendre à nouveau quand survient la maladie&nbsp;?</li>
            //                     </ul>

            //                     <p>Accompagnements individuels, ateliers, réflexions, livres, films...</p>
            //                     <p>Des propositions sont faites ici avancer au fil des jours, pas à pas.</p>
            //                 </div>
            //             </div>
            //         </p>
            //     </div>
            //     {/* <div className={classes.Posts}> */}
            //     {/* <div className={classes.Post}>
            //             <p className={classes.PostTitle}>Vivement le printemps...</p>
            //             <div className={classes.PostBody}>
            //                 <p>Nous avons profité de ces longs mois d'hiver pour nous repencher sur notre fenêtre sur le monde (virtuel),
            //         et avons décidé de faire peau neuve. </p>
            //                 <p>Cette page est la première étape de cette transformation et nous vous demandons un peu de patience;</p>
            //                 <p>Un pas après l'autre...</p>
            //             </div>
            //         </div> 
            //     </div>*/}
            // </Aux>
        );
    }
}

export default Home;
