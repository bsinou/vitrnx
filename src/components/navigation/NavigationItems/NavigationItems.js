import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';

import classes from './NavigationItems.css';

const baseItems = [
    { url: '/', label: 'Home' },
    { url: '/teaser', label: 'Teaser' },
    { url: '/q/News', label: 'News' },
    { url: '/q/FAQ', label: 'FAQ' },
]


const authItems = [
    ...baseItems,
    { url: '/logout', label: 'Ciao!' }
]

const editorExtraItems  = [
    ...baseItems, 
    { url: '/all', label: 'All' },
    { url: '/logout', label: 'Ciao!' }
]


const navigationItems = (props) => {

    let items = authItems;
    if (props.userRoles && props.userRoles.includes("EDITOR")){
         items = editorExtraItems
    }

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
