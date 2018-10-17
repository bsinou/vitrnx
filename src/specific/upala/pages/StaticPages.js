import React, { Component } from 'react';

import { Route } from 'react-router-dom'

import classes from './pages.css'

// Simply store and render static pages

class Pages extends Component {

    getItwPage() {
        return (
            <div className={classes.Page}>
                <div className={classes.PageTitle}>Entretien individuel</div>
                <div className={classes.PageSubtitle}>Prendre le temps et se poser. Ecouter... <br />L'histoire d'une maladie, d'une angoisse, de soucis familiaux ou professionnels.</div>
                <div className={classes.PageBody}>
                    <p>Entendre la parole dite, les questions posées et celles qui affleurent.</p>
                    <p>Avec bienveillance et respect, ensemble chercher à comprendre, à renouer les liens, à donner un sens à ce qui est dit et à ce qui a été vécu.</p>
                    <p>Accepter ce qui a été ou ce qui est aujourd'hui pour pouvoir envisager demain.</p>
                    <p>Etablir ensemble un plan d'action :</p>
                    <ul>
                        <li>Comment faire ? Quoi faire ?</li>
                        <li>Qui contacter peut-être ?</li>
                        <li>Quelles solutions envisager ?</li>
                    </ul>
                    <p>Puis mettre en place les nouveaux apprentissages dans le temps et les évaluer.</p>
                    <p>Concrètement :</p>
                    <ul>
                        <li>L'entretien dure une heure au minimum.</li>
                        <li>La première rencontre permet de faire un état de la situation et d'envisager l'action à mener.</li>
                        <li>Le nombre et le rythme des entretiens suivants sont déterminés d'un commun accord et sont très variables d'un sujet à l'autre.</li>
                    </ul>
                </div>
            </div>
        );
    }

    getWorkshopPage() {
        return (
            <div className={classes.Page}>
                <div className={classes.PageTitle}>Ateliers de peinture, ateliers de réflexion</div >
                <div className={classes.PageSubtitle}>En co-animation avec Anne-Noëlle Bissuel, artiste et art-thérapeute, nous mettons en commun nos compétences d'artiste et de thérapeute</div>
                <div className={classes.PageBody}>
                    <p>Plus d'information sur les prochains ateliers bientôt.</p>
                    <p>N'hésitez pas à revenir.</p>
                </div>
            </div>
        );
    }

    getBookPage() {
        return (
            <div className={classes.Page}>
                <div className={classes.PageTitle}>"Notre essentiel de santé"</div>
                <div className={classes.PageSubtitle}>Françoise Desailly, Marie-Madeleine Sinou et François Veyrié</div>
                <div className={classes.PageBody}>
                    <p>
                        <img src="../files/images/livre-recto.jpg" alt="Notre essentiel de santé, 1ere de couv." style={{ float: 'left', width: '300px', height: '410px', marginRight: '30px', verticalAlign: 'bottom' }} />
                        <p>&nbsp;</p>
                        <p>Ce livre est un hymne à la santé, il est le fruit d'une trentaine d'années d'expérience de deux professionnelles de la santé. Il est illustré de fiches pédagogiques crées par un artiste.</p>
                        <p>La santé est visitée ici dans toutes ses dimensions et ancrée dans l'essence ancestrale des médecines traditionnelles axées sur la prévention. Nous proposons quelques réponses à ces questions :</p>
                        <p style={{ marginLeft: '1em', paddingLeft: '1em', }}>
                            &nbsp;&nbsp;- Comment maintenir la santé ? <br />
                            &nbsp;&nbsp;- Comment garder l'indépendance&nbsp;?<br />
                            {/* <ul>
                                <li>Comment maintenir la santé ?</li>
                                <li>Comment garder l'indépendance&nbsp;?</li>
                            </ul> */}
                        </p>
                        <p>Prix : 30 €, <a href="../files/docs/BonDeCommande.pdf" target="_blank" >Télécharger le bon de commande</a> (frais d'envoi en sus)</p>
                        <p>Version électronique : 9,90 €, <a href="https://www.grafficus.com/catalogue-des-ouvrages-de-grafficus/product/1-notre-essentiel-de-sante" target="_blank" >par achat en ligne chez nos amis de grafficus</a></p>
                    </p>
                </div>
            </div>
        );
    }

    getContactPage() {
        return (
            <div className={classes.Page}>
                <div className={classes.PageTitle}>Contact</div>
                <div className={classes.PageBody}>
                    <p>Les entretiens individuels ont lieu à Lyon dans le 5° arrondissement ou dans la Drôme des collines.</p>
                    <p>Les ateliers ont lieu à Lyon, dans la Drôme des collines ou selon les groupes constitués.</p>
                    <p>Email : <a href="mailto:contact@unpasapreslautre.com">contact@unpasapreslautre.com</a></p>
                    {/* <p>Téléphone : <a href="tel:+33611283845">06 11 28 38 45</a></p> */}
                    <p>Téléphone : 06 11 28 38 45</p>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className={classes.PageContainer}>
                {/* <Route path="/s/about" exact render={this.getContactPage()} /> */}
                <Route path="/s/the-book" exact render={this.getBookPage} />
                <Route path="/s/interview" exact render={this.getItwPage} />
                <Route path="/s/workshops" exact render={this.getWorkshopPage} />
                <Route path="/s/contact" exact render={this.getContactPage} />
            </div>
        );
    }
}

export default Pages;
