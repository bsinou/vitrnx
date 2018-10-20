import React from 'react';

import NavigationItems from '../NavigationItems/NavigationItems'

import { withStyles, Icon } from '@material-ui/core';

import customCss from './Toolbar.css'

const styles = theme => ({
  button: {
    marginTop: '0.4em',
    size: '48px',
  },
  icon: {
    size: '48px',
  },
  input: {
    display: 'none',
  },
});

function ToggleButton(props) {
  const { classes, clicked } = props;
  return (
    <Icon
      aria-label="toggle"
      style={{ fontSize: 36 }}
      className={[classes.button, customCss.DrawerToggle].join(' ')}
      onClick={clicked}
    >menu</Icon>
  );
}

const StyledBtn = withStyles(styles)(ToggleButton)

const toolbar = (props) => (
  <div className={customCss.PrivMenuBox}>
    <StyledBtn clicked={props.drawerToggleClicked} />

    {/* Particularely ugly 
     window.innerWidth <  500 ? null :
      */}
    <nav className={[customCss.DesktopOnly, customCss.PrivateNav].join(' ')}>
      <NavigationItems
        isAuth={props.isAuth}
        userRoles={props.userRoles}
        navItems={props.navItems} />
    </nav>
  </div>
);

export default toolbar;