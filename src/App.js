import React, { Component } from 'react';

// Routing
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';
import * as actions from './store/actions/index';

// Vitrnx specific components
import AnonAuth from './hoc/AnonAuth/AnonAuth'
import Layout from './hoc/Layout/Layout'

import Home from './static/Home/Home'
import Faq from './static/Faq/Faq'
import Teaser from './static/Teaser/Teaser'
import StaticPages from './static/Pages/Pages'

import Blog from './containers/Blog/Blog'
import Auth from './containers/Auth/Auth'
import Logout from './containers/Auth/Logout/Logout'

import Posts from './components/blog/Posts/Posts';

// Styling
import classes from './App.css';
// Provides default material UI css props to children components
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
// TODO change a few base color
// import { cyan500 } from 'material-ui/styles/colors';


// This replaces the textColor value on the palette
// and then update the keys for each component that depends on it.
// More on Colors: http://www.material-ui.com/#/customization/colors
const muiTheme = getMuiTheme({
  // palette: {
  //   textColor: cyan500,
  // },
  // appBar: {
  //   height: 50,
  // },
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

    let routes = (
      <Switch>
        <Route path="/" component={AnonAuth} />
        <Route path="/login" component={Auth} />
        {/* <Route path="/teaser" component={Teaser} /> */}
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/s/" component={StaticPages} />
          {/* TODO rather use Blog component with tag id news */}
          <Route path="/news" component={Posts} />
          <Route path="/p/" component={Blog} />
          <Route path="/q/" component={Blog} />
          <Route path="/teaser" component={Teaser} />
          <Route path="/faq" exact component={Faq} />
          <Route path="/admin" component={Auth} />
          <Route path="/login" component={Auth} />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={Home} />
          <Redirect to="/" />
        </Switch>)
    }

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className={classes.App}>
          <Layout>
            {routes}
          </Layout>
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token != null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
