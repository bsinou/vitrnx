import React from 'react';
import axios from '../../apiServer'

import Divider from 'material-ui/Divider';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import Toggle from 'material-ui/Toggle';

const utils = require('../../utils/helpers');

export default class EditUserDialog extends React.Component {

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
          type: 'name',
          hintText: 'We will call you so...',
          value: props.editedUser.name,
          validation: {
            required: true,
            minLength: 5,
          },
          errorText: '',
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
  }

  toggleRole = (key) => {
    if (!this.state.updatedRoles) { return }
    const updated = [...this.state.updatedRoles]
    var index = updated.indexOf(key);
    if (index !== -1) { // remove...
      updated.splice(index, 1);
    } else { // add
      updated.push(key)
    }
    this.setState({ updatedRoles: [...updated] })
  };

  getRolesToggleList() {
    let list = [];
    if (!this.canEditRoles()) { return list; }

    this.state.knownRoles.forEach((value, key, map) => {
      list = [...list,
      (<Toggle key={key} label={value} style={{ toggle: { marginBottom: 16 } }}
        toggled={this.state.updatedRoles && this.state.updatedRoles.includes(key)}
        onToggle={() => this.toggleRole(key)} />)
      ]
    })
    return (
      <div style={{ block: { maxWidth: 250 } }}>
        {list}
      </div>
    );
  }

  render() {

    // Update dialog action 
    const actions = [
      <FlatButton label="Cancel" primary={true} onClick={this.handleCancelUpdate} />,
      <FlatButton label="Submit" primary={true} onClick={() => this.handleDoUpdate(this.props.token, this.props.comment, this.props.onUserChange)} />,
    ];

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
      <Dialog title={'Editing ' + this.state.formFields.name.value} actions={actions} modal={false} open={this.state.open} onRequestClose={this.handleCancelUpdate} >
        {fields}
        <Divider />
        {!this.state.knownRoles ? null : this.getRolesToggleList()}
      </Dialog>
    );
  }
}



