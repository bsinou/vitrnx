import React from 'react';

import classes from './PostInfo.css';

const tagL = (props) => {
    console.log('Handling tag, value: ' + props.tvalue)
    return (
        <a href="/"> #{props.tvalue}</a>
    );
}

const postInfo = (props) => {
    let tags;
    if (props.tags) {
        tags = props.tags.split(' ').map(tag => {
            return (<a href={'/q/'+tag}>#{tag} </a>);
        }); 
    }

    return (
        <div className={classes.PostInfo}>
            <div className={classes.Author}>Par {props.author}, le 24 février 2018. </div>
            <div> &nbsp;&nbsp;&nbsp;Catégories: {tags}

            </div>

            
        </div>
    );
}

export default postInfo;