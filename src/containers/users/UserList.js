import React, { Component } from 'react';

import axios from '../../apiServer';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

// Material UI
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemText, ListItemAvatar } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import PersonIcon from '@material-ui/icons/Person';
import { red, green, blue } from 'material-ui/colors';
// import blue from 'material-ui/colors/blue';
// import blue from 'material-ui/colors/blue';

// import Dialog, { DialogTitle } from 'material-ui/Dialog';
// import Button from 'material-ui/Button';
// import AddIcon from '@material-ui/icons/Add';
// import Typography from 'material-ui/Typography';

const styles = {
    avatarRed: {
        backgroundColor: red[100],
        color: red[600],
    },
    avatarGreen: {
        backgroundColor: green[100],
        color: green[600],
    },
};

function User(props) {
    const { classes, user, roleStr, userSelected } = props
    let coming = user.meta.presence && user.meta.presence.isComing;
    let cdesc = "Does not come."
    if (coming) {
        cdesc = user.meta.presence.adultNb > 1 ? "Comes with " + (user.meta.presence.adultNb - 1) + " adults and " + user.meta.presence.childNb + " gnomes" : "Comes alone";
    }

    if (user.meta.commentCount && user.meta.commentCount > 0) {
        cdesc += ", has already written " + user.meta.commentCount + " comments."
    }
    return (
        <ListItem key={user.userId} onClick={userSelected}>
            <ListItemAvatar>
                <Avatar className={coming ? classes.avatarGreen : classes.avatarRed}>
                    <PersonIcon />
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                style={{ textAlign: 'left' }}
                primary={user.name + ', ' + user.email + ', ' + roleStr}
                secondary={cdesc}
            />
        </ListItem>);
}


const StyledUser = withStyles(styles)(User);
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
        if (
            !this.props.token ||
            !this.props.userRoles ||
            !(this.props.userRoles.includes("ADMIN") || this.props.userRoles.includes("USER_ADMIN"))
        ) { return; }

        if (!this.state.loaded && (this.state.showAll || this.state.query)) {
            var options = { headers: { 'Authorization': this.props.token } };
            var url = this.state.query ? '/users?query=' + this.state.query : '/users';
            axios.get(url, options)
                .then(response => {
                    // const users = ;
                    // const updatedPosts = users.map(
                    //     user => { return { ...user }; }
                    // );
                    console.log("Retrieved user list", response.data.users)
                    this.setState({ users: response.data.users, loaded: true });
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
                            key={user.userId}
                            user={user}
                            roleStr={this.getRoleString(user.roles)}
                            userSelected={(event) => this.userSelectedHandler(event, user.userId)}
                        />
                    );
                });
        }

        return (<List> {users} </List>);
    }
}

export default withErrorHandler(UserList, axios)