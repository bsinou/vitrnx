import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';

import classes from './NavigationItems.css';

export default class NavigationItems extends React.Component {

    render() {

        if (typeof this.props.navItems === "undefined") {
            return null;
        }

        var links = this.props.navItems.map(
            item => (<NavigationItem key={item.url} link={item.url}>{item.label}</NavigationItem>)
        );

        return (
            <ul className={classes.NavigationItems}>
                {links}
            </ul>
        );
    }
}
