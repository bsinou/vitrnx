import React from 'react';

import NavigationItems from '../NavigationItems/NavigationItems'

import { withStyles, Icon } from '@material-ui/core';

import customCss from './Toolbar.css'

const styles = theme => ({
    button: {
        margin: '0em',
        size: '12px',
    },
    icon: {
        size: '12px',
    },
    input: {
        display: 'none',
    },
});

function ToggleButton(props) {
    const { classes, clicked } = props;
    return (
        <Icon
            style={{ fontSize: '24px' }}
            aria-label="toggle"
            className={[classes.button, customCss.DrawerToggle].join(' ')}
            onClick={clicked}
        >menu</Icon>
    );
}

const StyledBtn = withStyles(styles)(ToggleButton)

const toolbar = (props) => (
    <header className={customCss.Toolbar}>
        {/* <DrawerToggle clicked={props.drawerToggleClicked} /> */}
        <StyledBtn clicked={props.drawerToggleClicked} />
        <nav className={customCss.DesktopOnly}>
            <NavigationItems isAuth={props.isAuth} userRoles={props.userRoles} />
        </nav>
    </header>
);

export default toolbar;