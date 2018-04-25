import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';

import classes from './NavigationItems.css';

const baseItems = [
    { url: '/', label: 'Home' },
    { url: '/teaser', label: 'Teaser' },
    { url: '/q/news', label: 'News' },
    { url: '/faq', label: 'FAQ' },
]


const authItems = [
    ...baseItems,
    { url: '/logout', label: 'Ciao!' }
]

// const adminExtraItems  = [
//     ...baseItems, 
// ]


const navigationItems = (props) => {

    // const items = props.isAuth ? authItems : anonItems;
    const items = authItems;

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
