import React, { Component } from 'react';

import Auth from '../../containers/Auth/Auth';

import classes from './AnonAuth.css';

class AnonAuth extends Component {

    render() {
        return (
            <div class={classes.VCenteredOuterBox}>
                <div class={classes.VCenteredInnerBox}>
                    <div class={classes.IntroTitle}>You must be logged in to access this page</div>
                    <Auth props={this.props} />
                </div>
            </div>
        );
    }
}

export default AnonAuth;