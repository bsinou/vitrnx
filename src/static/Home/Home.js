import React from 'react';
import { NavLink } from 'react-router-dom';

import AuxWrapper from '../../hoc/AuxWrapper/AuxWrapper'

import classes from './Home.css'

class Home extends React.Component {

    render() {
        // Not very clean
        let titleStr = window.innerWidth < 500 ? 'Welcome' : 'Welcome in our Festival 4.0 space!';

        return (
            <AuxWrapper>
                {/* <div className={classes.Root}>
                    <Grid container spacing={24}>
                        <Grid item xs={12}>
                            <Paper className={classes.Paper}>xs=12</Paper>
                        </Grid>
                        <Grid item xs={6}>
                            <Paper className={classes.Paper}>xs=6</Paper>
                        </Grid>
                        <Grid item xs={6}>
                            <Paper className={classes.Paper}>xs=6</Paper>
                        </Grid>
                        <Grid item xs={3}>
                            <Paper className={classes.Paper}>xs=3</Paper>
                        </Grid>
                        <Grid item xs={3}>
                            <Paper className={classes.Paper}>xs=3</Paper>
                        </Grid>
                        <Grid item xs={3}>
                            <Paper className={classes.Paper}>xs=3</Paper>
                        </Grid>
                        <Grid item xs={3}>
                            <Paper className={classes.Paper}>xs=3</Paper>
                        </Grid>
                    </Grid>
                </div> */}

                <div className={classes.Posts}>
                    <div className={classes.Intro}>
                        <p className={classes.IntroTitle}>{titleStr}</p>
                        <div className={classes.IntroBody}>
                            Festival 4.0 - festival of all tribes - welcome musicians, artists and magicians
                            <br />The idea is to create this festival together.
                            <br />The aim is to offer to the audience (aka all of us) a magical time up to the hills.
                            <br />You wanna play and be part of it ?
                            <br />You got a special skill you wanna share?
                            <br />A music set you wanna play?
                            <br />Or a secret show you wanna reveal?

                            <p>Anyway, This page is the place to talk about our festival and get all information and stuff about it, Enjoy.</p>
                        </div>
                    </div>
                </div>
                <div className={classes.Posts}>
                    <div className={classes.Post}>
                        <p className={classes.PostTitle}>The new teaser is here!</p>
                        <div className={classes.PostBody}>
                            <p>You liked the <NavLink to="/v/ecce" className="TextLink">
                                launching video
                                </NavLink> ? </p>

                            <p> Here a second one that give another mood</p>
                            <p> <NavLink to="/v/dibu" className="TextLink">
                                <big>Montchenu En Dessins</big>
                            </NavLink></p>
                        </div>
                    </div>
                </div>
            </AuxWrapper>
        );
    }
}

export default Home;
