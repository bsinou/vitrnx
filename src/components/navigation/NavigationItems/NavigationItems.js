import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';

import classes from './NavigationItems.css';

export default class NavigationItems extends React.Component {

    getMenuItems() {
        let items = [
            { url: '/', label: 'Home' },
            { url: '/teaser', label: 'Teaser' },
            { url: '/q/News', label: 'News' },
            { url: '/q/FAQ', label: 'FAQ' },
        ]

        if (this.props.userRoles && this.props.userRoles.includes("EDITOR")) {
            items = [...items,
            { url: '/all', label: 'All' },
            ]
        }

        if (this.props.userRoles && this.props.userRoles.includes("ADMIN")) {
            items = [...items,
            { url: '/u', label: 'Users' },
            ]
        }

        // For now, always true when we reach this point
        // if (isAuthenticated){
        items = [...items, { url: '/logout', label: 'Ciao!' }]

        return items;
    }

    render() {

        var links = this.getMenuItems().map(
            item => (<NavigationItem key={item.url} link={item.url}>{item.label}</NavigationItem>)
        );

        return (
            <ul className={classes.NavigationItems}>
                {links}
            </ul>
        );
    }
}
