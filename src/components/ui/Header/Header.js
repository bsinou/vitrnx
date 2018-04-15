import React from 'react';

import classes  from './Header.css'
import logo from '../../../assets/images/logo-color.png';

//  style={{height: props.height}}

const header = (props) => (
    <header className={classes.Header}>
        <div className={classes.Logo} >
            <img src={logo} alt="Festival 4.0" />
        </div>
        {/* <div className={classes.HeaderTitle}>Festival 4.0</div>         <div className={classes.HeaderSubtitle}>Kinda big party for my friends and their family</div>
    */}

    </header>
);

export default header;
