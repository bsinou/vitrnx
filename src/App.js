import React, { Component } from 'react';
// Routing
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
// Redux
import { connect } from 'react-redux';
import * as actions from './store/actions/index';

// Vitrnx specific components
import Layout from './hoc/Layout/Layout'
import Blog from './containers/blog/Blog'
import QueryPosts from './containers/blog/QueryPosts'
import Users from './containers/users/Users'

// Static pages
import Home from './containers/home/Home'
import VideoPage from './components/blog/Media/VideoPage';
// import Teaser from './static/Teaser/Teaser'
import Dashboard from './containers/dashboard/Dashboard'
import Register from './containers/auth/Register'
import Login from './containers/auth/Login'
import Logout from './containers/auth/Logout/Logout'
import LogoutAndRegister from './containers/auth/Logout/LogoutAndRegister';


// Styling
// Provides default material UI css props to children components
import classes from './vitrnx.css';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { red300 } from 'material-ui/colors';
import { transition, container } from "./assets/jss/common.jsx";


// This replaces the textColor value on the palette
// and then update the keys for each component that depends on it.
// More on Colors: http://material-ui-next.com/#/customization/colors
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

class App extends Component {

  constructor(props) {
    super(props);
    this.props.onTryAutoSignup();
  }

  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    const isAuth = this.props.isAuthenticated;

    let routes = [
      <Route path="/register" component={Register} />,
      <Route path="/" component={Login} />,
    ];

    if (isAuth) {
      routes = [
        (<Route path="/v/:id" component={VideoPage} />),
        (<Route path="/logout-register" component={LogoutAndRegister} />),
        (<Route path="/logout" component={Logout} />),
        (<Route path="/p/" component={Blog} />),
        (<Route path="/q/" component={Blog} />),
        (<Route path="/" exact component={Home} />)
      ]

      if (this.props.userRoles && this.props.userRoles.includes("EDITOR")) {
        routes = [...routes,
        (<Route path="/all/" component={QueryPosts} />)
        ]
      }

      if (this.props.userRoles && (this.props.userRoles.includes("VOLUNTEER") || this.props.userRoles.includes("ORGANISATION") )) {
        routes = [...routes,
        (<Route path="/dashboard" component={Dashboard} />)
        ]
      }

      

      if (this.props.userRoles && (this.props.userRoles.includes("ADMIN") || this.props.userRoles.includes("USER_ADMIN"))) {
        routes = [...routes,
        (<Route path="/u/" component={Users} />)
        ]
      }
    }

    routes = [...routes, (<Redirect to="/" />)]

    return (
      isAuth ?
        (<MuiThemeProvider theme={theme}>
          <Layout className={classes.Container}>
            <Switch>
              {/* Spread operator does not work here, WHY??  */}
              {routes.map(element => element)}
            </Switch>
          </Layout>
        </MuiThemeProvider>)
        : (<MuiThemeProvider theme={theme}>
          <Switch>
            {routes.map(element => element)}
          </Switch>
        </MuiThemeProvider>)
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token != null,
    userRoles: state.auth.userRoles,
    dname: state.auth.displayName
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
