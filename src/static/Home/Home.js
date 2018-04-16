import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';


import Aux from '../../hoc/Aux/Aux'

import classes from './Home.css'



class Home extends Component {

    gotoPrevious() { }

    gotoNext() { }

    closeLightbox() { }

    render() {

        let titleStr = 'Welcome in our Festival 4.0 space!';
        // Not very clean
        if (window.innerWidth < 500) {
            titleStr = 'Welcome'
        }

        return (
            <Aux>
                <div className={classes.Posts}>
                    <div className={classes.Intro}>
                        <p className={classes.IntroTitle}>{titleStr}</p>
                        <div className={classes.IntroBody}>
                            <p>This page is the place to talk about our festival and get all information and stuff about it.</p>
                            <ul>
                                <li>How to get there?</li>
                                <li>Why do we do it?</li>
                                <li>What can I expect from these 3 days?</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={classes.Posts}>
                    <div className={classes.Post}>
                        <p className={classes.PostTitle}>Here we go!</p>
                        <div className={classes.PostBody}>
                            <p>More than words... &nbsp;&nbsp;&nbsp;&nbsp;       
                                <NavLink to="/teaser" className="TextLink">
                                    A small introducing video
                                </NavLink>
                            </p>
                        </div>
                    </div>
                </div>
            </Aux>
        );
    }
}

export default Home;
