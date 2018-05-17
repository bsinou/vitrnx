import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import User from '../../components/user/User';
import UserList from './UserList';

class Users extends Component {
    render() {
       return (
            <Switch>
                {/* Display User */}
                <Route path={'/u/:id'} exact component={
                    (props) => (
                        <User  {...props}
                            token={this.props.token}
                            userId={this.props.userId}
                            userRoles={this.props.userRoles}
                        />
                    )
                } />
                {/* Filtered list */}
                <Route path={'/u'} exact render={
                    (props) => (
                        <UserList  {...props}
                            token={this.props.token}
                            userId={this.props.userId}
                            userRoles={this.props.userRoles}
                        />
                    )
                } />
            </Switch>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        userId: state.auth.userId,
        userRoles: state.auth.userRoles
    };
};

export default connect(mapStateToProps)(Users);
