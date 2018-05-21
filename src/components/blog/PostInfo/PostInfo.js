import React from 'react';
import moment from 'moment';

import { NavLink } from 'react-router-dom';

import classes from './PostInfo.css';

const postInfo = (props) => {
    let tags;
    if (props.tags) {
        tags = props.tags.split(' ').map(tag => {
            return (<NavLink key={tag} to={'/q/' + tag} className="TextLink">#{tag}</NavLink>);
        });
    }
    const dateStr = moment(props.date*1000).format('MMMM Do YYYY');
    
    return (
        <div className={classes.PostInfo}>
            <div className={classes.Author}>
                {props.author}, on {dateStr} | {tags}
            </div>
        </div>
    );
}

export default postInfo;
