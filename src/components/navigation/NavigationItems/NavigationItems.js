import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';

import classes from './NavigationItems.css';

const baseItems = [
    // {url: '/about', label:'Présentation'}, 
    { url: '/q/Réflexions', label: 'Réflexions' },
    { url: '/q/Actualités', label: 'Actualités' },
    { url: '/s/interview', label: 'Entretien individuel' },
    { url: '/s/workshops', label: 'Travail en atelier' },
    { url: '/s/the-book', label: 'Le livre' },
    { url: '/s/contact', label: 'Contact' },
]

const anonItems = [
    ...baseItems,
    { url: '/login', label: 'S\'identifier' }
]

const authItems = [
    ...baseItems,
    { url: '/logout', label: 'Se déconnecter' }
]

// const adminExtraItems  = [
//     ...baseItems, 
//     {url: '/logout', label:'Se deconnecter'} 
// ]

const navigationItems = (props) => {

    const items = props.isAuth ? authItems : anonItems;

    var links = items.map(
        item => (<NavigationItem key={item.url} link={item.url}>{item.label}</NavigationItem>)
    );

    return (
        <ul className={classes.NavigationItems}>
            {links}
        </ul>
    );
}

export default navigationItems;
