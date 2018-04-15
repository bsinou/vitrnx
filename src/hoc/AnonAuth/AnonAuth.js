import React, { Component } from 'react';

import Auth from '../../containers/Auth/Auth';


class AnonAuth extends Component {

    render() {
        return (
            <div>
                <p>You must be logged in to access this page</p>
                <Auth props={this.props} />
            </div>
        );
    }
}

export default AnonAuth;