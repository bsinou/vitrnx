import React, { Component } from 'react';
import { connect } from 'react-redux';

import AuxWrapper from '../AuxWrapper/AuxWrapper';
import Toolbar from '../../components/navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/navigation/SideDrawer/SideDrawer'
import Header from '../../components/ui/Header/Header'
import Footer from '../../components/ui/Footer/Footer'

import classes from './Layout.css';


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

    render() {

        if (this.props.isAuthenticated) {
            return (
                <AuxWrapper>
                    <Header className={classes.Header} />
                    <Toolbar
                        className={classes.Toolbar}
                        isAuth={this.props.isAuthenticated}
                        userRoles={this.props.userRoles}
                        drawerToggleClicked={this.sideDrawerToggleHandler} />
                    <SideDrawer
                        isAuth={this.props.isAuthenticated}
                        userRoles={this.props.userRoles}
                        open={this.state.showSideDrawer}
                        closed={this.sideDrawerClosedHandler} />
                    <main className={classes.Content}>
                        {this.props.children}
                    </main>
                    <Footer
                        className={classes.Footer}
                        isAuth={this.props.isAuthenticated}
                    />
                </AuxWrapper>
            );
        } else {
            return (

                <AuxWrapper>
                    <Header />
                    <main className={classes.Content}>
                        {this.props.children}
                    </main>
                    <Footer />
                </AuxWrapper>
            );
        }
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        userRoles: state.auth.userRoles
    };
};

export default connect(mapStateToProps)(Layout);