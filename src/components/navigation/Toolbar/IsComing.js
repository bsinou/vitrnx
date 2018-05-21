import React from 'react';
import { connect } from 'react-redux';
import axios from '../../../apiServer'

import Aux from '../../../hoc/AuxWrapper/AuxWrapper'
import IsComingDialog from './IsComingDialog'

import { withStyles } from 'material-ui/styles';
import { Switch } from 'material-ui';

// Styling
import customCss from './Toolbar.css';

const styles = theme => ({
  button: {
  },
  icon: {
    fontSize: '32px'
  },
});

class Switches extends React.Component {

  state = {
    isDialogOpen: false,
  };

  loadData(force) {
    if (!this.props.token)
      return;

    if (!this.state.presence) {
      var options = { headers: { 'Authorization': this.props.token } };
      axios.get('/usermeta/' + this.props.userId, options).then(response => {
        if (!response.data) {
          // None found but not an error, initialise the presence object
          this.setState({ presence: { isComing: false, userId: this.props.userId } });
          // do nothing
        } else {
          this.setState({ presence: { ...response.data.presence } });
        }
      }).catch(error => {
        console.log(error);
      });
    }
  }

  updatePresence(presence, openDialogAfterUpdate) {
    var options = { headers: { 'Authorization': this.props.token } };
    console.log('About to update with obj: ', presence)

    axios.post('/usermeta/' + this.props.userId, presence, options).then(response => {
      console.log(response);

      if (openDialogAfterUpdate) {
        console.log('open after update')
        this.setState({ presence: { ...response.data.presence }, isDialogOpen: true});
      } else {
        this.setState({ presence: { ...response.data.presence } });
      }

    }).catch(error => {
      console.log(error);
    });
  }

  componentDidMount() {
    this.loadData(false)
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  handleToggleComing = event => {
    // discard loading events
    if (!event) { return; }

    var updatedPresence = { ...this.state.presence };
    if (!event.target.checked) {
      if (window.confirm('Sad news... Are you sure you want to cancel your participation?')) {
        this.updatePresence({ ...updatedPresence, isComing: false })
      }
    } else {
      this.updatePresence({ ...updatedPresence, isComing: true}, true )
    }
  }

  handleOpenMore = event => {
    this.setState({ isDialogOpen: true });
  };

  handleCloseDialog = (hasChanged, presence) => {

    if (hasChanged) {
      // suboptimal, enhance
      var updated = { ...this.state.presence };
      for (let p in presence) {
        updated[p] = presence[p];
      }
      updated.adultNb = parseInt(presence.adultNb, 10)
      updated.childNb = parseInt(presence.childNb, 10)

      this.updatePresence(updated)
    }
    this.setState({ isDialogOpen: false });
  };

  render() {
    const { classes } = this.props;
    console.log('Rendering, presence?', this.state.presence)

    return !this.state.presence ? null : (
      <Aux>
        <IsComingDialog
          open={this.state.isDialogOpen}
          onClose={this.handleCloseDialog}
          presence={this.state.presence}
          isRegistered={this.props.email!=='guest@sinou.org'}
        />
        <div className={customCss.IsComingBox}>
          <div className={customCss.IsComingLabel} onClick={this.handleOpenMore}  >
            Coming?
          </div>
          <div className={customCss.IsComingBtns}>
            <Switch
              checked={this.state.presence.isComing}
              onChange={this.handleToggleComing}
              className={classes.button}
            />
            {/* <Icon
            aria-label="More"
            color="secondary"
            className={classes.icon}
            onClick={this.handleOpenMore}>more_vert</Icon> */}
          </div>
        </div>
      </Aux>
    );
  }
}


const mapStateToProps = state => {
  return {
    token: state.auth.token,
    email: state.auth.email,
    userId: state.auth.userId,
    userRoles: state.auth.userRoles,
  };
};

export default connect(mapStateToProps)(withStyles(styles)(Switches));