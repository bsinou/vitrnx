import React, { Component } from 'react';

import Aux from '../../hoc/Aux/Aux'

import classes from './Faq.css'


var gmLink = 'https://www.google.com/maps/place/26350+Montchenu,+France/@45.19,5.00,13z/';
class Faq extends Component {

    render() {

        let titleStr = 'Foire aux questions / Frequently asked questions';
        // Not very clean
        if (window.innerWidth < 500) {
            titleStr = 'Ze F.A.Q.'
        }

        return (
            <Aux>
                <div className={classes.Posts}>
                    <div className={classes.Post}>
                        <p className={classes.PostTitle}>{titleStr}</p>
                        <div className={classes.PostBody}>
                            <h2>Where is it?</h2>
                            <p>In Montchenu, in the so called <i>Drôme des collines</i>, within the <i>Pays de l'herbassse (the grass land)</i>...
                            </p>
                            <p> But you might find <a href={gmLink}> this link </a> a little bit more usefull than a poetic description.</p>
                            <h2>When is it?</h2>
                            <p>You might already be there on thursday night for the vorspiel and helping with getting the place clean agfain on monday, but the party begins Friday,
                                the 13th of July at 12.40 and stops on Sunday, the 15th at 12.40 (always short after midday, not midnight for those wondering) </p>
                            <h2>What is it?</h2>
                            <p>A big party for me, my family and my friends. To show them all that we still can dream and things just for fun.</p>
                            <h2>How do I get there?</h2>
                            <p>Big question. It's in the middle of nowhere. Easiest way is to get in a car with your friends 
                                (or ours, we'll try to put in place a forum to share cars).</p>
                            <p> Next TGV train station is Valence, and regional train: Tain l'Hermitage. 
                                If you're brave you can ride from there. </p>
                            <p> You have cheap flights to Geneva / Genève / Genf 
                                and then rent a car or take a train to one of the station above.</p>
                            <h2>What do I have to bring?</h2>
                            <p>A tent, a few emergency snacks, good vibes and a little bit of cash. 
                                (We more or less expect that you will participate to the costs 
                                by spending around €50/adult during the 2 days of the party)
                                </p>
                        </div>
                    </div>
                </div>
            </Aux>
        );
    }
}

export default Faq;
