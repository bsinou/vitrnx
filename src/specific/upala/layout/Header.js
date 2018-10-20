import React from 'react';
import PrivateToolbar from '../../../components/navigation/Toolbar/PrivateToolbar'

import classes from './layout.css'


const header = (props) => (
    <header className={classes.Header}>
        <PrivateToolbar
            isAuth={props.isAuth}
            userRoles={props.userRoles}
            navItems={props.navItems}
            drawerToggleClicked={props.drawerToggleClicked}
        />
        <div className={classes.HeaderTitle}>Un pas après l'autre</div>
        <div className={classes.HeaderSubtitle}>Coaching en santé<br />Marie-Madeleine SINOU</div>
    </header>
);

export default header;
