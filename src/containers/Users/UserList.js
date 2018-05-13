import React, { Component } from 'react';

import apiServer from '../../apiServer';

// Material UI

import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Avatar from 'material-ui/Avatar';
import Dialog, { DialogTitle } from 'material-ui/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import Typography from 'material-ui/Typography';
import blue from 'material-ui/colors/blue';

import List, { ListItem, ListItemText, ListItemAvatar} from 'material-ui/List';
import { darkBlack } from 'material-ui/colors';

const styles = {
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
};

function User (props) {
    const {classes, user, roleStr, userSelected } = props
   
    return (
        <ListItem key={user.userId} onClick={userSelected}>
            <ListItemAvatar>
                <Avatar className={classes.avatar}>
                    <PersonIcon />
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                style={{ textAlign: 'left' }}
                primary={user.name + ', ' + user.email + ', ' + roleStr}
            // secondaryLines={2}
            />
        </ListItem>);
}


const StyledUser = withStyles(styles)(User);
export default class UserList extends Component {

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

    userSelectedHandler = (event, userId) => {
        event.stopPropagation();
        event.preventDefault();
        this.props.history.push('/u/' + userId);
    };


    getRoleString(roles) {
        if (!roles) {
            return "";
        }
        return roles.map(role => role.label).join(', ')
    }

    // TODO add new user component

    render() {
        let users = <p style={{ textAlign: 'center' }}>Something went wrong: could not load user list...</p>
        if (!this.state.error) {
            users = this.state.users.map(
                user => {
                    return (
                        <StyledUser 
                        user={user} 
                        roleStr={this.getRoleString(user.roles)} 
                        userSelected={ (event) => this.userSelectedHandler(event, user.userId)}
                        />
                    );
                });
        }

        return ( <List> {users} </List> );
    }
}

