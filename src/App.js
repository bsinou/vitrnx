import React, { Component } from 'react';
// Redux
import { connect } from 'react-redux';
import * as actions from './store/actions/index';

// Routing
// import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';


// Playing sound
import Sound from 'react-sound';

// Vitrnx specific components
import MyRoutes from './Routes'
import AuxWrapper from './hoc/AuxWrapper/AuxWrapper';


// // Vitrnx specific components
// import Layout from './hoc/Layout/Layout'
// import Blog from './containers/blog/Blog'
// import QueryPosts from './containers/blog/QueryPosts'
// import Users from './containers/users/Users'


// // Static pages
// import Home from './containers/home/Home'
// import VideoPage from './components/blog/Media/MediaPage';
// import Dashboard from './containers/dashboard/Dashboard'
// import Register from './containers/auth/Register'
// import Login from './containers/auth/Login'
// import Logout from './containers/auth/Logout/Logout'
// import LogoutAndRegister from './containers/auth/Logout/LogoutAndRegister';

// import classes from './vitrnx.css';

// Styling
// Provides default material UI css props to children components
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { red300 } from '@material-ui/core/colors';
import { transition, container } from "./assets/jss/common.jsx";


// This replaces the textColor value on the palette
// and then update the keys for each component that depends on it.
// More on Colors: http://@material-ui/core-next.com/#/customization/colors
const theme = createMuiTheme({
  root: {
    // overflow: 'hidden',
  },
  palette: {
    background: {
      paper: red300
    },
    primary: red300,
  },

  wrapper: {
    position: "relative",
    top: "0",
    height: "100vh"
  },
  mainPanel: {
    // [theme.breakpoints.up("md")]: {
    //   width: `calc(100% - ${drawerWidth}px)`
    // },
    overflow: "auto",
    position: "relative",
    float: "right",
    ...transition,
    maxHeight: "100%",
    width: "100%",
    overflowScrolling: 'touch'
  },
  content: {
    marginTop: "70px",
    padding: "30px 15px",
    minHeight: "calc(100% - 123px)"
  },
  container,
  map: {
    marginTop: "70px"
  }
});

// Manage audio at top level to leave music on when navigating within the site
class Player extends React.Component {

  render() {
    const { url, status, onFinishedPlaying } = this.props

    return <Sound
      url={url}
      playStatus={status}
      playFromPosition={30  /* in milliseconds */}
      onLoading={this.handleSongLoading}
      onPlaying={this.handleSongPlaying}
      onFinishedPlaying={onFinishedPlaying}
    />
  }
}

class App extends Component {

  constructor(props) {
    super(props);
    this.props.onTryAutoSignup();
  }

  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    const { isAuth, userRoles, currTrack, status, onNextTrack } = this.props

    return (
      <AuxWrapper>
        {/* Global audio player*/}
        <Player
          url={currTrack.url}
          status={status ? Sound.status.PLAYING : Sound.status.PAUSED}
          preloadType="auto"
          onFinishedPlaying={() => onNextTrack()}
        />
        <Router>
          <MuiThemeProvider theme={theme}>
            <MyRoutes isAuth={isAuth} userRoles={userRoles} props={this.props} />
          </MuiThemeProvider>
        </Router>
      </AuxWrapper>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token != null,
    userRoles: state.auth.userRoles,
    dname: state.auth.displayName,
    currTrack: state.audio.currTrack,
    status: state.audio.playing,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
    onToggleStatus: () => dispatch(actions.togglePlayingStatus()),
    onNextTrack: () => dispatch(actions.skipTrack(1))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
