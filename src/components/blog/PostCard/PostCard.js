import React from 'react';
import moment from 'moment';

import classes from './PostCard.css';


// Material UI
import Card from 'material-ui/Card/Card';
import { Tabs, Tab } from 'material-ui/Tabs';


const postCard = (props) => (
    <article className={classes.PostCard} onClick={props.clicked}>
        <div className={classes.Title}>{props.title}</div>
        <div className={classes.Info}>
            <div className={classes.Author}>
                {props.author}, on {moment(props.date).format('MMMM Do YYYY')}
            </div>
        </div>
        <div className={classes.Desc}>{props.desc}</div>
        <div className={classes.Thumb}><img src={props.thumb} alt="kinda party"/> </div>
    </article>
);

export default postCard;