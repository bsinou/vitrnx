import React, { Component } from 'react';

import Auth from '../../containers/Auth/Auth';

import classes from './AnonAuth.css';

class AnonAuth extends Component {

    render() {
        return (
            <div className={classes.VCenteredOuterBox}>
                <div className={classes.VCenteredInnerBox}>
                    <div className={classes.IntroTitle}>You must be logged in to access this page</div>
                    <Auth className={this.props} />
                </div>
            </div>
        );
    }
}

export default AnonAuth;