import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import Posts from '../../components/blog/Posts/Posts';
import Post from '../../components/blog/Post/Post';
import EditPost from '../../components/blog/EditPost/EditPost';

// The Blog component manages routes and explicitely forwards the JWT token retrieved from the Redux store
class Blog extends Component {

    render() {
        return (
            <Switch>
                {/* New Post */}
                <Route path="/p/edit/" exact component={
                    (props) => (
                        <EditPost  {...props}
                            token={this.props.token}
                            userId={this.props.userId}
                            userRoles={this.props.userRoles}
                        />
                    )
                } />
                {/* Edit Post */}
                <Route path="/p/edit/:id" component={
                    (props) => (
                        <EditPost  {...props}
                            token={this.props.token}
                            userId={this.props.userId}
                            userRoles={this.props.userRoles}
                        />
                    )
                } />
                {/* Display Post */}
                <Route path={'/p/:id'} exact component={
                    (props) => (
                        <Post  {...props}
                            token={this.props.token}
                            userId={this.props.userId}
                            userRoles={this.props.userRoles}
                        />
                    )
                } />
                {/* Filter by Tag or display first 4 */}
                <Route path={'/q/:id'} exact render={
                    (props) => (
                        <Posts  {...props}
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
        userRoles: state.auth.userRoles,
    };
};

export default connect(mapStateToProps)(Blog);
