import React, { Component } from 'react';
import { connect } from 'react-redux';

import AuxWrapper from '../AuxWrapper/AuxWrapper';
import Toolbar from '../../components/navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/navigation/SideDrawer/SideDrawer'
import Header from '../../components/ui/Header/Header'
import Footer from '../../components/ui/Footer/Footer'
import IsComingBox from '../../components/navigation/Toolbar/IsComing'

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

        const { isAuth, userRoles, } = this.props


        if (isAuth) {
            return (
                <div className={classes.Container}>
                    {/* Add the Is Coming toggle button */}
                    <IsComingBox />

                    <Header className={classes.Header} />
                    <Toolbar
                        className={classes.Toolbar}
                        isAuth={isAuth}
                        userRoles={userRoles}
                        drawerToggleClicked={this.sideDrawerToggleHandler} />
                    <SideDrawer
                        isAuth={isAuth}
                        userRoles={userRoles}
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
            );
        } else {
            return (
                <AuxWrapper>
                    <Header />
                    <div className={classes.Content}>
                        {this.props.children}
                    </div>
                    <Footer />
                </AuxWrapper>
            );
        }
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token !== null,
        userRoles: state.auth.userRoles,
    };
};


// const mapDispatchToProps = dispatch => {
//     return {
//       onToggleStatus: () => dispatch(actions.togglePlayingStatus()),
//     };
// };  

export default connect(mapStateToProps)(Layout);
// export default connect(mapStateToProps, mapDispatchToProps)(Layout);