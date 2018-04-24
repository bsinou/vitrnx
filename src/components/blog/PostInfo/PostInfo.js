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

    return (
        <div className={classes.PostInfo}>
            <div className={classes.Author}>
                {props.author}, on {moment(props.date).format('MMMM Do YYYY')} | {tags}
            </div>
        </div>
    );
}

export default postInfo;

// Stock
/* With: 
// import Time from 'react-time';

<Time 
        value={props.date} 
        format="DD MMMM YYYY" 
        locale="fr"
/>.  */
