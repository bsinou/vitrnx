import React from 'react';
import axios from '../../apiServer'

import { withStyles } from 'material-ui/styles';

import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import Switch from 'material-ui/Switch';
import green from 'material-ui/colors/green';
import { FormGroup, FormControlLabel } from 'material-ui/Form';

const utils = require('../../utils/helpers');

const styles = {
  switchBase: {
    color: green[50],
    '&$checked': {
      color: green[500],
      '& + $bar': {
        backgroundColor: green[500],
      },
    },
  },
  bar: {},
  checked: {},
};

class SwitchLabels extends React.Component {
  state = {
    checkedA: true,
    checkedB: true,
    checkedF: true,
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  render() {
    const { classes } = this.props;

    return (
      <FormGroup row>
        <FormControlLabel
          control={
            <Switch
              checked={this.state.checkedA}
              onChange={this.handleChange('checkedA')}
              value="checkedA"
            />
          }
          label="Secondary"
        />
        <FormControlLabel
          control={
            <Switch
              checked={this.state.checkedB}
              onChange={this.handleChange('checkedB')}
              value="checkedB"
              color="primary"
            />
          }
          label="Primary"
        />
        <FormControlLabel control={<Switch value="checkedC" />} label="Uncontrolled" />
        <FormControlLabel disabled control={<Switch value="checkedD" />} label="Disabled" />
        <FormControlLabel disabled control={<Switch checked value="checkedE" />} label="Disabled" />
        <FormControlLabel
          control={
            <Switch
              checked={this.state.checkedF}
              onChange={this.handleChange('checkedF')}
              value="checkedF"
              classes={{
                switchBase: classes.switchBase,
                checked: classes.checked,
                bar: classes.bar,
              }}
            />
          }
          label="Custom color"
        />
      </FormGroup>
    );
  }
}

const StyledSwitch = withStyles(styles)(SwitchLabels);

class EditUserDialog extends React.Component {

  // getRoles = (knowRoles, userRoles ) => {

  // for (let )

  // forEach(callbackfn: (value: V, key: K, map: ReadonlyMap<K, V>) => void, thisArg?: any): void;
  // return roles;


  //   };

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

  // handleChange = name => event => {
  //   this.setState({ [name]: event.target.checked });
  // };


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
      <div style={{ marginTop: '2em', block: { maxWidth: 250 }, display:'flex', flexDirection:'column', padding:'4px 8px' }}>
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
        <DialogTitle id="edit-user-dialog-title">{'Editing ' + this.state.formFields.name.value}</DialogTitle>
        <DialogContent>
          {fields}
          <Divider />
          {!this.state.knownRoles ? null : this.getRolesToggleList()}
        </DialogContent>
        <DialogActions>
          <Button primary={true} onClick={this.handleCancelUpdate} >Cancel</Button>,
          <Button primary={true} onClick={() => this.handleDoUpdate(this.props.token, this.props.user, this.props.onUserChange)} >Submit</Button>,
        </DialogActions>
      </Dialog>
    );
  }
}

export default EditUserDialog; // withStyles(styles)()



