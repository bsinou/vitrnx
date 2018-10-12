import React from 'react';
import apiServer from '../../apiServer'
import { Redirect } from 'react-router-dom'

import { Divider } from '@material-ui/core';

import EditUserDialog from './EditUserDialog';

// Styling
import editIcon from '../../assets/images/edit_1x.png';
import deleteIcon from '../../assets/images/delete_1x.png';
import classes from './User.css';

export default class User extends React.Component {

  state = {
    isSelf: false,
    isAdmin: false,

    initialUser: null,
    updatedUser: null,

    knownRoles: [],
    initialRoles: [],
    updatedRoles: [],

    // Dirty management of loaded state to avoid infinite looping
    loadedUserId: null,
    errorMsg: null,

    redirect: false,

    // Manage dialog state
    open: false,
    editUserDialog: null,
  };

  componentDidMount() {
    this.loadData(false);
  }

  componentDidUpdate() {
    this.loadData(false);
  }

  loadData(force) {
    var options = { headers: { 'Authorization': this.props.token } };

    const cId = this.props.match.params.id;
    if (cId) {
      if (force || !this.state.loadedUserId || this.state.loadedUserId !== cId) {
        apiServer.get('/users/' + cId, options).then(response => {
          console.log('Retrieved from REST', response.data)
          // console.log('## Roles from REST', response.data.user.roles)

          this.setState({
            initialUser: { ...response.data.user },
            updatedUser: { ...response.data.user },
            initialRoles: [...response.data.user.roles],
            updatedRoles: [...response.data.user.roles],
            loadedUserId: cId,
            editUserDialog: null,
            errorMsg: null,
          });
        }).catch(error => {
          this.setState({
            loadedUserId: cId,
            editUserDialog: null,
            errorMsg: error.message,
          });
        });
      }
    }

    if (!this.state.errorMsg && (!this.state.knownRoles || this.state.knownRoles.length < 1 ))  {
      // Retrieve role list
      apiServer.get('/roles', options).then(response => {
        this.setState({
          knownRoles: response.data.roles,
        });
        // console.log('retrieved roles', response, retrievedRoles)
      }).catch(error => {
        console.log('Could not retrieve roles', error)
      });
    }
  }

  /* DELETION */
  deleteUser = () => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      var options = { headers: { 'Authorization': this.props.token } };
      apiServer.delete('/users/' + this.state.loadedUserId, options).then(response => {
        this.setState({ redirect: true }) // redirect to user list
      });
    }
  }

  /* UPDATE */
  handleClose = (hasChanged) => {
    if (hasChanged) {
      this.loadData(true);
    } else {
      this.setState({ editUserDialog: null });
    }
  };

  handleOpen = () => {
    let dialog = (<EditUserDialog
      token={this.props.token}
      userId={this.props.userId}
      userRoles={this.props.userRoles}
      editedUser={this.state.initialUser}
      editedUserRoles={this.state.initialUser.roles}
      knownRoles={this.state.knownRoles}
      onClose={this.handleClose}
    />);

    this.setState({ editUserDialog: dialog });
  };

  handleCancelUpdate = () => {
    this.setState({ open: false, updatedUser: { ...this.state.initialUser } });
  };

  handleCancelRoleUpdate = () => {
    this.setState({ open: false, updatedUser: { ...this.state.initialUser, userRoles: { ...this.state.initialUser.userRoles } } });
  };

  handleDoUpdate = () => {
    const data = {
      ...this.props.updatedUser,
      userRoles: { ...this.state.updatedUser.userRoles },
    };
    const options = { headers: { 'Authorization': this.props.token } };
    apiServer.post('/users', data, options)
      .then(response => {
        this.setState({ open: false, initialUser: { ...this.state.updatedUser, userRoles: { ...this.state.updatedUser.userRoles } } });
        this.props.onUserChange();
      }).catch(error => {
        console.log(error);
      });
  }

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.stopPropagation();
      event.preventDefault();
      this.handleDoUpdate()
    }
  }

  canEdit = () => {
    return this.props.userRoles.includes("ADMIN") ||
      this.props.userRoles.includes("USER_ADMIN") ||
      this.props.userId === this.state.initialUser.userId;
  }

  /* UI */
  getEditBtn = () => {
    let btns = null;
    if (this.canEdit()) {
      btns = (
        <div className={classes.AllBtnBox}>
          <ul className={classes.EditUserBtns} >
            <li>
              <div className={classes.SingleBtnBox} onClick={this.deleteUser}>
                <img src={deleteIcon} alt="delete user" />
              </div>
            </li>
            <li>
              <div className={classes.SingleBtnBox} onClick={this.handleOpen}>
                <img src={editIcon} alt="edit user" />
              </div>
            </li>
          </ul>
        </div>
      );
    }
    return btns;
  }

  getRoleString(roles) {
    // return roles.map(role => { console.log('Getting role string for', role.roleId); return role.label }).join(', ');
    return roles.map(role => role.label).join(', ');
  }

  render() {
    let user = <p style={{ textAlign: 'center' }}>No user found</p>;
    if (this.props.match.params.id) {
      user = <p style={{ textAlign: 'center' }}>Loading...</p>;
    }



    if (this.state.initialUser) {
      console.log('### retrieved a user...', this.state.initialUser)
      user = (
        <div className={classes.CommentBox} >
          {this.getEditBtn()}
          {this.state.editUserDialog}

          {this.state.redirect &&
            <Redirect to={{
              pathname: '/u',
              state: { from: this.state.value }
            }} />
          }

          <div>
            <div className={classes.CommentMeta}>{this.state.initialUser.name}</div>
            <div className={classes.CommentMeta}>{this.state.initialUser.email}</div>
            <div className={classes.CommentMeta}>{this.getRoleString(this.state.initialUser.roles)}</div>
          </div>
          <Divider />
          {/* TODO add for instance the list of the comments entered by this user... */}
        </div>
      )
    }
    return (user);
  }
}

