import React from 'react';

import classes from './Post.css';

const post = (props) => (
    <article className={classes.Post} onClick={props.clicked}>
        <div className={classes.Title}>{props.title}</div>
        <div className={classes.Subtitle}>{props.desc}</div>
        <div className={classes.Info}>
            <div className={classes.Author}>{props.author}</div>
            <div className={classes.Body}>{props.body}</div>
        </div>
    </article>
);

export default post;