import React from 'react';
import axios from '../../apiServer'

import Divider from 'material-ui/Divider';
// import Dialog from 'material-ui/Dialog';
// import FlatButton from 'material-ui/Button';
// import TextField from 'material-ui/TextField';

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

    knownRoles: null,

    initialRoles: [],
    updatedRoles: [],

    // Dirty management of loaded state to avoid infinite looping
    loadedUserId: null,
    errorMsg: null,

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
        axios.get('/users/' + cId, options).then(response => {
          // console.log('Retrieved from REST', response.data)
          this.setState({
            initialUser: { ...response.data.user },
            updatedUser: { ...response.data.user },
            initialRoles: [...response.data.user.userRoles],
            updatedRoles: [...response.data.user.userRoles],
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


    if (!this.state.errorMsg && !this.state.knownRoles) {
      // Retrieve role list
      axios.get('/roles', options).then(response => {
        // console.log('Retrieved roles', response.data)
        let retrievedRoles = new Map();
        response.data.roles.map(role => {
          retrievedRoles.set(role.roleId, role.label);
        })
        this.setState({
          knownRoles: retrievedRoles,
        });
      }).catch(error => {
        console.log('Could not retrieve roles', error)
      });
    }
  }

  /* DELETION */

  deleteUser() {
    if (window.confirm('Are you sure you want to delete this user?')) {
      var options = { headers: { 'Authorization': this.props.token } };
      axios.delete('/user/' + this.state.loadedUserId, options).then(response => {
        this.onUserChange();
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
      editedUserRoles={this.state.initialUser.userRoles}
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
    axios.post('/users', data, options)
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

  getEditBtn = () => {
    let btns = null;
    if (this.canEdit()) {
      btns = (
        <div className={classes.AllBtnBox}>
          <ul className={classes.CommentButtons} >
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
    return roles.map(role => this.state.knownRoles.get(role)).join(', ');
  }

  render() {

    let user = <p style={{ textAlign: 'center' }}>No user found</p>;
    if (this.props.match.params.id) {
      user = <p style={{ textAlign: 'center' }}>Loading...</p>;
    }

    if (this.state.initialUser) {
      user = (
        <div className={classes.CommentBox} >
          {this.getEditBtn()}
          {this.state.editUserDialog}
          <div>
            <div className={classes.CommentMeta}>{this.state.initialUser.name}</div>
            <div className={classes.CommentMeta}>{this.state.initialUser.email}</div>
            {!this.state.knownRoles ? null : (
              <div className={classes.CommentMeta}>{this.getRoleString(this.state.initialUser.userRoles)}</div>
            )}
          </div>
          <Divider />
          {/* TODO add for instance the list of the comments entered by this user... */}
        </div>
      )
    }
    return (user);
  }
}



