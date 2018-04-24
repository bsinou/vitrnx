import React from 'react';
import moment from 'moment';

import classes from './PostCard.css';

const postCard = (props) => (
    <article className={classes.PostCard} onClick={props.clicked}>
        <div className={classes.Title}>{props.title}</div>
        <div className={classes.Subtitle}>{props.desc}</div>
        <div className={classes.Info}>
            <div className={classes.Author}>
                {props.author}, on {moment(props.date).format('MMMM Do YYYY')}
            </div>
        </div>
    </article>
);

export default postCard;