import React from 'react';

import NavigationItems from '../NavigationItems/NavigationItems'

import { withStyles, Icon } from '@material-ui/core';

import customCss from './Toolbar.css'

// const styles = theme => ({
//     button: {
//         margin: '0em',
//         size: '24px',
//     },
//     icon: {
//         size: '24px',
//     },
//     input: {
//         display: 'none',
//     },
// });

function ToggleButton(props) {
    const { classes, clicked } = props;
    return (
        <Icon
            style={{ fontSize: 48 }}
            aria-label="toggle"
            // className={[customCss.DrawerToggle].join(' ')}
            onClick={clicked}
        // Must have no child so that it is not shown... very dirty, see below.
         />
    );
}

// const StyledBtn = withStyles(styles)(ToggleButton)

const toolbar = (props) => (
    <header className={customCss.Toolbar}>
        {/* very dirty: we leave an empty button to keep the left align behaviour...*/}
        
        <ToggleButton clicked={props.drawerToggleClicked} />
        {/* <StyledBtn clicked={props.drawerToggleClicked} /> */}
        <nav className={customCss.DesktopOnly}>
            <NavigationItems isAuth={props.isAuth} userRoles={props.userRoles} navItems={props.navItems} />
        </nav>
    </header>
);

export default toolbar;