import React from 'react';

import classes from './Footer.css'

const footer = (props) => (
    <footer className={[classes.Footer, props.isAuth ? classes.Auth : classes.Anon].join(' ')}>
        <div>(C) 2018. Sinoux brothers &amp; sisters - </div>
        <div>&nbsp;&nbsp;<a href="mailto:4.0@sinou.org">Contact</a>&nbsp;&nbsp;</div>
    </footer>
);

export default footer;
