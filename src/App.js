import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';

// **Hack here to switch to specific routes.**
import MyRoutes from './specific/upala/Routes'
import { BrowserRouter as Router } from 'react-router-dom';

// Provides default material UI css props to children components
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { green200, red300, blue400 } from '@material-ui/core/colors';
import { transition, container } from "./assets/jss/common.jsx";

// This replaces the textColor value in the palette
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
    primary: green200,
    secondary: blue400, 
  },

  wrapper: {
    position: "relative",
    top: "0",
    height: "100vh"
  },
  mainPanel: {
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

class App extends Component {

  constructor(props) {
    super(props);
    this.props.onTryAutoSignup();
  }

  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    const { isAuth, userRoles} = this.props

    return (
      <Router>
        <MuiThemeProvider theme={theme}>
          <MyRoutes isAuth={isAuth} userRoles={userRoles} props={this.props} />
        </MuiThemeProvider>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token != null,
    userRoles: state.auth.userRoles,
    dname: state.auth.displayName,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
