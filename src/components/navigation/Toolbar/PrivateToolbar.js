import React from 'react';

import NavigationItems from '../NavigationItems/NavigationItems'

import customCss from './Toolbar.css'

const toolbar = (props) => (
  <div className={customCss.PrivMenuBox}>
    <NavigationItems isAuth={props.isAuth} userRoles={props.userRoles} navItems={props.navItems} />
  </div>
);

export default toolbar;