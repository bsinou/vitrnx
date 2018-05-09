import React, { Component } from 'react';
import { connect } from 'react-redux';

import apiServer from '../../apiServer';

// Material UI
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import { darkBlack } from 'material-ui/styles/colors';

class UserList extends Component {

    state = {
        users: [],
        query: null,
        error: false,
        showAll: true,
        loaded: false,
    }

    componentDidMount() {
        this.loadData();
    }

    componentDidUpdate() {
        this.loadData();
    }

    loadData() {
        console.log(this.props.userRoles);
        if (
            !this.props.token ||
            !this.props.userRoles ||
            !(this.props.userRoles.includes("ADMIN") || this.props.userRoles.includes("USER_ADMIN"))
        ) { return; }

        if (!this.state.loaded && (this.state.showAll || this.state.query)) {
            var options = { headers: { 'Authorization': this.props.token } };
            var url = this.state.query ? '/users?query=' + this.state.query : '/users';
            apiServer.get(url, options)
                .then(response => {
                    const users = response.data.users;
                    const updatedPosts = users.map(
                        user => { return { ...user }; }
                    );
                    this.setState({ users: updatedPosts, loaded: true });
                }).catch(error => {
                    console.log(error);
                    this.setState({ error: true, loaded: true })
                });
        }
    }

    userSelectedHandler = (event, path) => {
        event.stopPropagation();
        event.preventDefault();
        console.log('hop');
        // this.props.history.push('/u/' + path);
    };

    // TODO add new user component

    // , {user.userRoles.join(', ')} -
    render() {
        let users = <p style={{ textAlign: 'center' }}>Something went wrong: could not load user list...</p>
        if (!this.state.error) {
            users = this.state.users.map(
                user => {
                    return (
                        <div key={user.userId}>
                            <ListItem
                                style={{ textAlign: 'left' }}
                                // leftAvatar={<Avatar src={"../imgRepo/" + user.thumb} />}
                                primaryText={user.name}
                                secondaryText={
                                    <p>
                                        <span style={{ color: darkBlack }}>{user.email} </span>
                                    </p>
                                }
                                secondaryTextLines={2}
                                onClick={(event) => this.userSelectedHandler(event, user.userId)}
                            />
                            <Divider inset={true} />
                        </div>);
                });
        }

        return (
            <List>
                {users}
            </List>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        userRoles: state.auth.userRoles,
        dname: state.auth.displayName
    };
};

export default connect(mapStateToProps)(UserList);
