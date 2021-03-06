import React from 'react';
import axios from '../../apiServer'

import RoleList from '../ui/Select/ChipsWithSelect'


import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControlLabel, Paper, Switch, TextField, } from '@material-ui/core';

const utils = require('../../utils/helpers');

class EditUserDialog extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      // Current user that own the session
      token: props.token,
      userId: props.userId,
      userRoles: props.userRoles,

      // Currently edited user
      loadedUserId: props.editedUser.userId,
      initialUser: { ...props.editedUser },
      initialRoles: [...props.editedUserRoles],
      updatedRoles: [...props.editedUserRoles],

      // Meta info
      onClose: props.onClose,
      knownRoles: props.knownRoles,

      // Form
      formFields: {
        name: {
          label: 'Name',
          helperText: '',
          value: props.editedUser.name,
          validation: {
            required: true,
            minLength: 5,
          },
          // errorText: '',
          touched: "false"
        },
      },

      errorMsg: null,
      // Manage dialog state
      open: true,
    };
  }

  /* UPDATE */

  handleCancelUpdate = () => {
    this.state.onClose(true);
    this.setState({ open: false })
  };

  inputChangedHandler = (event, controlName) => {
    let errMsg = utils.checkValidity(event.target.value, this.state.formFields[controlName].validation)
    let canSubmit = errMsg === '';
    if (canSubmit) {
      for (let key in this.state.fields) {
        if (key !== controlName && !utils.isFieldValid(this.state.formFields[key])) {
          canSubmit = false;
          break;
        }
      }
    }

    const updatedControls = {
      ...this.state.formFields,
      [controlName]: {
        ...this.state.formFields[controlName],
        value: event.target.value,
        errorText: errMsg,
        touched: "true"
      }
    };
    this.setState({ formFields: updatedControls, canSubmit: canSubmit });
  }

  getUpdatedMeta() {
    let data = {};
    for (var p in this.state.formFields) {
      if (this.state.formFields[p].value !== this.state.initialUser[p]) {
        data[p] = this.state.formFields[p].value;
      }
    }
    return data;
  }

  getUpdateMetaRequest(options) {
    let request = null;
    let metaData = this.getUpdatedMeta();
    if (Object.keys(metaData).length > 0) {
      metaData = { ...metaData, userId: this.state.initialUser.userId };
      request = axios.patch('/users/' + this.state.initialUser.userId, metaData, options)
    }
    return request;
  }

  haveRolesChanged() {
    if (this.state.updatedRoles.length !== this.state.initialRoles.length) return true;
    for (var currRole in this.state.updatedRoles) {
      if (!this.state.initialRoles.includes(currRole)) return true;
    }
    return false;
  }

  getUpdateRoleRequest(options) {
    let request = null;
    if (this.haveRolesChanged) {
      const roles = this.state.updatedRoles.map(role => role.roleId);
      request = axios.patch('/users/' + this.state.initialUser.userId + '/roles', roles, options)
    }
    return request;
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };


  handleDoUpdate = () => {
    const options = { headers: { 'Authorization': this.props.token } };
    let onCloseFunc = this.state.onClose;
    Promise.all([this.getUpdateMetaRequest(options), this.getUpdateRoleRequest(options)])
      .then((results) => {
        this.setState({ open: false })
        onCloseFunc(true);
      });
  }

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.stopPropagation();
      event.preventDefault();
      this.handleDoUpdate()
    }
  }

  // ROLE EDITION 
  canEditRoles = () => { // only admins
    return this.state.userRoles.includes("ADMIN") || this.state.userRoles.includes("USER_ADMIN");
  };

  toggleRole = (role) => {
    if (!this.canEditRoles()) return;

    console.log('Toggle role for ', role)
    if (this.state.updatedRoles) {
      const updated = [...this.state.updatedRoles]
      var index = updated.indexOf(role);
      if (index !== -1) { // remove...
        updated.splice(index, 1);
      } else { // add
        updated.push(role)
      }
      this.setState({ updatedRoles: [...updated] });
    }
  }

  // getRolesToggleList() {
  //   let list = [];
  //   if (!this.canEditRoles()) { return list; }

  //   this.state.knownRoles.forEach((value, key, map) => {
  //     list = [...list,
  //     (
  //       <FormControlLabel
  //         key={key}
  //         label={value}
  //         control={
  //           <Switch
  //             checked={this.state.updatedRoles && this.state.updatedRoles.includes(key)}
  //             onChange={this.toggleRole(key)}
  //             value="checkedB"
  //             style={{ toggle: { marginBottom: 16 } }}
  //             color="primary"
  //           />
  //         }
  //       />
  //     )]
  //   });

  //   return (
  //     <div style={{ marginTop: '2em', block: { maxWidth: 250 }, display: 'flex', flexDirection: 'column', padding: '4px 8px' }}>
  //       {list}
  //     </div>
  //   );
  // }

  render() {

    const formElementsArray = [];
    for (let key in this.state.formFields) {
      formElementsArray.push({
        id: key,
        config: this.state.formFields[key]
      });
    }

    let fields = formElementsArray.map(e => (
      <TextField
        key={e.id}
        {...e.config}
        onChange={(event, newValue) => this.inputChangedHandler(event, e.id)}
      />
    ));

    return (
      <Dialog
        open={this.state.open}
        onClose={this.handleCancelUpdate}
        aria-labelledby="form-dialog-title">
        <Paper style={{ zIndex: 1300, backgroundColor: '#fff', minHeight: '400px' }}>

          <DialogTitle id="edit-user-dialog-title">{'Editing ' + this.state.formFields.name.value}</DialogTitle>
          <DialogContent style={{ minHeight: '400px' }}>
            {fields}
            <Divider />
            {(!this.state.knownRoles || !this.state.initialRoles) ? null :
              <RoleList
                idKey="roleId"
                idLabel="label"
                defaultListedItems={this.state.initialRoles}
                suggestions={this.state.knownRoles}
                label="User's roles"
                helperText="Choose a role to add"
                onToggle={this.toggleRole}
              />
            }
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={this.handleCancelUpdate} >Cancel</Button>,
          <Button color="primary" onClick={() => this.handleDoUpdate(this.props.token, this.props.user, this.props.onUserChange)} >Submit</Button>,
        </DialogActions>
        </Paper>
      </Dialog>
    );
  }
}

export default EditUserDialog; 
