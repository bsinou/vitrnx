import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem'

import classes from './NavigationItems.css'

const navigationItems = () => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/home" active>ACCUEIL</NavigationItem>
        <NavigationItem link="/about" >PRESENTATION</NavigationItem>
        <NavigationItem link="/toughts" >REFLEXIONS</NavigationItem>
        <NavigationItem link="/the-book" >LE LIVRE</NavigationItem>
        <NavigationItem link="/news" >ACTUALITES</NavigationItem>
        <NavigationItem link="/interview" >ENTRETIEN INDIVIDUEL</NavigationItem>
        <NavigationItem link="/workshops" >TRAVAIL EN ATELIER</NavigationItem>
        <NavigationItem link="/contact" >CONTACT</NavigationItem>
    </ul>
);

export default navigationItems;
