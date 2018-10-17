import React, { Component } from 'react';
import { connect } from 'react-redux';

import AuxWrapper from '../../../hoc/AuxWrapper/AuxWrapper'
import Toolbar from '../../../components/navigation/Toolbar/Toolbar'
import SideDrawer from '../../../components/navigation/SideDrawer/SideDrawer'
import Header from './Header'
import Footer from './Footer'

import classes from './layout.css';

class Layout extends Component {

    // The side drawer is hidden after init
    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false });
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => { return { showSideDrawer: !prevState.showSideDrawer } });
    }

    getMenuItems() {
        let items = [
            { url: '/', label: 'Accueil' },
            { url: '/q/thoughts', label: 'Réflexions' },
            { url: '/q/news', label: 'Actualités' },
            { url: '/s/interview', label: 'Entretien individuel' },
            { url: '/s/workshops', label: 'Travail en atelier' },
            { url: '/s/the-book', label: 'Le livre' },
            { url: '/s/contact', label: 'Contact' },
        ]

        // if (this.props.userRoles && this.props.userRoles.includes("EDITOR")) {
        //     items = [...items,
        //     { url: '/all', label: 'All' },
        //     ]
        // }

        // if (this.props.userRoles && (this.props.userRoles.includes("VOLUNTEER") || this.props.userRoles.includes("ORGANISATION"))) {
        //     items = [...items,
        //     { url: '/dashboard', label: 'Dashboard' },
        //     ]
        // }

        // if (this.props.userRoles && this.props.userRoles.includes("ADMIN")) {
        //     items = [...items,
        //     { url: '/u', label: 'Users' },
        //     ]
        // }

        // // For now, always true when we reach this point
        // // if (isAuthenticated){
        // items = [...items, { url: '/logout', label: 'Ciao!' }]

        return items;
    }

    getPrivItems() {

        let items = [
            { url: '/login', label: 'S\'identifier' },
        ]

        if (this.props.isAuth) {
            items = [];

            if (this.props.userRoles && this.props.userRoles.includes("ADMIN")) {
                items = [
                    { url: '/all', label: 'Tous les articles' },
                    { url: '/u', label: 'Utilisateurs' },
                ]
            }

            items = [...items,
            { url: '/logout', label: 'Se déconnecter' },
            ]
        }

        return items;
    }

    render() {
        const { isAuth, userRoles } = this.props
        return (
            <AuxWrapper>
                <div className={classes.Container}>
                    <Header className={classes.Header}
                        isAuth={isAuth}
                        userRoles={userRoles}
                        navItems={this.getPrivItems()} />
                    <Toolbar
                        className={classes.Toolbar}
                        isAuth={isAuth}
                        userRoles={userRoles}
                        navItems={this.getMenuItems()}
                        drawerToggleClicked={this.sideDrawerToggleHandler} />
                    <SideDrawer
                        isAuth={isAuth}
                        userRoles={userRoles}
                        navItems={this.getMenuItems()}
                        open={this.state.showSideDrawer}
                        closed={this.sideDrawerClosedHandler} />
                    <div className={classes.Content}>
                        {this.props.children}
                    </div>
                    <Footer
                        className={classes.Footer}
                        isAuth={isAuth}
                    />
                </div>
            </AuxWrapper>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token !== null,
        userRoles: state.auth.userRoles,
    };
};

export default connect(mapStateToProps)(Layout);
