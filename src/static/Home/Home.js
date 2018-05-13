import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import AuxWrapper from '../../hoc/AuxWrapper/AuxWrapper'

import classes from './Home.css'

import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';


class Home extends Component {



    render() {
        // Not very clean
        let titleStr = window.innerWidth < 500 ? 'Welcome' : 'Welcome in our Festival 4.0 space!';

        return (
            <AuxWrapper>
                <div className={classes.Root}>
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
                </div>

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
                                <NavLink to="/v/dibu" className="TextLink">
                                    A small introducing video
                                </NavLink>
                            </p>
                        </div>
                    </div>
                </div>
            </AuxWrapper>
        );
    }
}


export default Home;
