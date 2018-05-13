import React, { Component } from 'react';
// Routing
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
// Redux
import { connect } from 'react-redux';
import * as actions from './store/actions/index';

// Vitrnx specific components
import Layout from './hoc/Layout/Layout'
import Blog from './containers/Blog/Blog'
import QueryPosts from './containers/Blog/QueryPosts'
import Users from './containers/Users/Users'

// Static pages
import Home from './static/Home/Home'
import Teaser from './static/Teaser/Teaser'
import Register from './containers/Auth/Register'
import Login from './containers/Auth/Login'
import Logout from './containers/Auth/Logout/Logout'


// Styling
// Provides default material UI css props to children components
import classes from './App.css';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { red300 } from 'material-ui/colors';


// This replaces the textColor value on the palette
// and then update the keys for each component that depends on it.
// More on Colors: http://www.material-ui.com/#/customization/colors
const theme = createMuiTheme({
  palette: {
    background: {
      paper: red300
    },
    primary: red300,
  },

  paper: {
    zDepth: 0,
  },
  tabs: {
    backgroundColor: '#333399'
  },
  inkBar: {
    backgroundColor: '#f1d923'
  },
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
    let routes = [
      <Route path="/register" component={Register} />,
      <Route path="/" component={Login} />,
    ];

    if (this.props.isAuthenticated) {
      routes = [
        (<Route path="/v/:id" component={Teaser} />),
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

      if (this.props.userRoles && (this.props.userRoles.includes("ADMIN") || this.props.userRoles.includes("USER_ADMIN"))) {
        routes = [...routes,
        (<Route path="/u/" component={Users} />)
        ]
      }
    }

    routes = [...routes, (<Redirect to="/" />)]

    return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.App}>
          <Layout>
            <Switch>
              {/* Spread operator didn't work here, aber WHY??  */}
              {routes.map(element => element)}
            </Switch>
          </Layout>
        </div>
      </MuiThemeProvider>
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
