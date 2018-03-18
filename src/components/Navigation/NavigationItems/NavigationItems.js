import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem'

import classes from './NavigationItems.css'

const navigationItems = () => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" active>ACCUEIL</NavigationItem>
        <NavigationItem link="/" >PRESENTATION</NavigationItem>
        <NavigationItem link="/" >REFLEXIONS</NavigationItem>
        <NavigationItem link="/" >LE LIVRE</NavigationItem>
        <NavigationItem link="/" >ACTUALITES</NavigationItem>
        <NavigationItem link="/" >ENTRETIEN INDIVIDUEL</NavigationItem>
        <NavigationItem link="/" >TRAVAIL EN ATELIER</NavigationItem>
        <NavigationItem link="/" >CONTACT</NavigationItem>
        {/* <NavigationItem link="/home" active>ACCUEIL</NavigationItem>
        <NavigationItem link="/about" >PRESENTATION</NavigationItem>
        <NavigationItem link="/toughts" >REFLEXIONS</NavigationItem>
        <NavigationItem link="/the-book" >LE LIVRE</NavigationItem>
        <NavigationItem link="/news" >ACTUALITES</NavigationItem>
        <NavigationItem link="/interview" >ENTRETIEN INDIVIDUEL</NavigationItem>
        <NavigationItem link="/workshops" >TRAVAIL EN ATELIER</NavigationItem>
        <NavigationItem link="/contact" >CONTACT</NavigationItem> */}
    </ul>
);

export default navigationItems;
