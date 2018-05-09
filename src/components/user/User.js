import React from 'react';
import axios from '../../apiServer'

import Divider from 'material-ui/Divider';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';


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

    // Dirty management of loaded state to avoid infinite looping
    loadedUserId: null,
    errorMsg: null,

    // Manage dialog state
    open: false,
  };



  componentDidMount() {
    console.log(this.props);
    this.loadData();
  }

  componentDidUpdate() {
    console.log(this.state);
    this.loadData();
  }

  loadData() {
    var options = { headers: { 'Authorization': this.props.token } };

    const cId = this.props.match.params.id;
    if (cId) {
      if (!this.state.loadedUserId || this.state.loadedUserId !== cId) {
        axios.get('/users/' + cId, options).then(response => {
          console.log(response.data)
          this.setState({
            initialUser: { ...response.data.user },
            updatedUser: { ...response.data.user },
            loadedUserId: cId,
            errorMsg: null,
          });
        }).catch(error => {
          this.setState({
            loadedUserId: cId,
            errorMsg: error.message,
          });
        });
      }
    }


    if (!this.state.errorMsg && !this.state.knownRoles) {
      // Retrieve role list
      axios.get('/roles', options).then(response => {
        console.log('Retrieved roles', response.data)
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

  // getEditBtn = (token, id, authorId, onCommentChange) => {
  //   let btns = null;
  //   if (this.canEdit()) {
  //     btns = (
  //       <div className={classes.AllBtnBox}>
  //         <ul className={classes.CommentButtons} >
  //           <li>
  //             <div className={classes.SingleBtnBox} onClick={() => this.deleteComment(token, id, onCommentChange)}>
  //               <img src={deleteIcon} alt="remove comment" />
  //             </div>
  //           </li>
  //           <li>
  //             <div className={classes.SingleBtnBox} onClick={this.handleOpen}>
  //               <img src={editIcon} alt="edit comment" />
  //             </div>
  //           </li>
  //         </ul>
  //       </div>
  //     );
  //   }
  //   return btns;
  // }


  /* DELETION */

  deleteUser(token, id, onUserChange) {
    if (window.confirm('Are you sure you want to delete this user?')) {
      var options = { headers: { 'Authorization': token } };
      axios.delete('/user/' + id, options).then(response => {
        onUserChange();
      });
    }
  }

  /* UPDATE */

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
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

  // handleNameChange = (e) => {
  //   this.setState({
  //     updatedUser: {... this.state.updatedUser, }, e.target.value
  //   });
  // }

  getRoleString(roles) {
    console.log('roles', roles);
    return roles.map(
      role => {
        console.log('Retrieving label for', role);
        console.log('We have', this.state.knownRoles.get(role));
        return (
          this.state.knownRoles.get(role)
        );
      }
    ).join(', ');
  }

  render() {
    // Update dialog action 
    const actions = [
      <FlatButton label="Cancel" primary={true} onClick={this.handleCancelUpdate} />,
      <FlatButton label="Submit" primary={true} onClick={() => this.handleDoUpdate(this.props.token, this.props.comment, this.props.onUserChange)} />,
    ];


    let user = <p style={{ textAlign: 'center' }}>No user found</p>;
    if (this.props.match.params.id) {
      user = <p style={{ textAlign: 'center' }}>Loading...</p>;
    }
    if (this.state.initialUser) {

      console.log('State before rendering:', this.state)


      user = (
        <div className={classes.CommentBox} >
          {/* {this.getEditBtn(this.props.token, this.props.comment.id, this.props.comment.authorId, this.props.onCommentChange)} */}

          <Dialog title="" actions={actions} modal={false} open={this.state.open} onRequestClose={this.handleCancelUpdate} >
            Here I am to edit user info
              {/* <TextField
                floatingLabelText="Edit user info"
                fullWidth
                multiLine={true}
                rows={2}
                rowsMax={4}
                value={this.state.updatedBody}
                onChange={this.handleBodyChange}
                onKeyPress={this.handleKeyPress}
              /> */}
          </Dialog>

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



