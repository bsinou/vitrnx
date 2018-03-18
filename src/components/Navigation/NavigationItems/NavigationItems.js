import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';

import classes from './NavigationItems.css';


const navigationItems = () => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" active>Accueil</NavigationItem>
        {/* <NavigationItem link="/about" >PRESENTATION</NavigationItem> */}
        <NavigationItem link="/toughts" >Réflexions</NavigationItem>
        <NavigationItem link="/news" >Actualités</NavigationItem>
        <NavigationItem link="/s/interview" >Entretien individuel</NavigationItem>
        <NavigationItem link="/s/workshops" >Travail en atelier</NavigationItem>
        <NavigationItem link="/s/the-book" >Le&nbsp;livre</NavigationItem>
        <NavigationItem link="/s/contact" >Contact</NavigationItem>
    </ul>
);

export default navigationItems;
