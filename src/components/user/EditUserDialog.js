import React from 'react';
import axios from '../../apiServer'


import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControlLabel, Paper, Switch, TextField, } from '@material-ui/core';

const utils = require('../../utils/helpers');

class EditUserDialog extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      token: props.token,
      userId: props.userId,
      userRoles: props.userRoles,

      loadedUserId: props.editedUser.userId,
      knownRoles: props.knownRoles,

      initialUser: { ...props.editedUser },
      initialRoles: [...props.editedUserRoles],
      updatedRoles: [...props.editedUserRoles],

      onClose: props.onClose,

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
    for (var currRoleId in this.state.updatedRoles) {
      if (!this.state.initialRoles.includes(currRoleId)) return true;
    }
    return false;
  }

  getUpdateRoleRequest(options) {
    let request = null;
    if (this.haveRolesChanged) {
      const roles = [...this.state.updatedRoles];
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

  toggleRole = key => event => {
    if (this.state.updatedRoles) {

      const updated = [...this.state.updatedRoles]
      var index = updated.indexOf(key);
      if (index !== -1) { // remove...
        updated.splice(index, 1);
      } else { // add
        updated.push(key)
      }
      this.setState({ updatedRoles: [...updated] });

    }
  }

  getRolesToggleList() {
    let list = [];
    if (!this.canEditRoles()) { return list; }

    this.state.knownRoles.forEach((value, key, map) => {
      list = [...list,
      (
        <FormControlLabel
          key={key}
          label={value}
          control={
            <Switch
              checked={this.state.updatedRoles && this.state.updatedRoles.includes(key)}
              onChange={this.toggleRole(key)}
              value="checkedB"
              style={{ toggle: { marginBottom: 16 } }}
              color="primary"
            />
          }
        />
      )]
    });

    return (
      <div style={{ marginTop: '2em', block: { maxWidth: 250 }, display: 'flex', flexDirection: 'column', padding: '4px 8px' }}>
        {list}
      </div>
    );
  }

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
        <Paper style={{ zIndex: 1300, backgroundColor: '#fff' }}>

          <DialogTitle id="edit-user-dialog-title">{'Editing ' + this.state.formFields.name.value}</DialogTitle>
          <DialogContent>
            {fields}
            <Divider />
            {!this.state.knownRoles ? null : this.getRolesToggleList()}
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
