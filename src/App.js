import React, { Component } from 'react';
import { connect } from 'react-redux';
import classes from './App.css';

import { Route, Switch, withRouter, Redirect } from 'react-router-dom';


import Layout from './hoc/Layout/Layout'

import Home from './static/Home/Home'
import Faq from './static/Faq/Faq'
import Teaser from './static/Teaser/Teaser'
import StaticPages from './static/Pages/Pages'

import Blog from './containers/Blog/Blog'
import AnonAuth from './hoc/AnonAuth/AnonAuth'
import Auth from './containers/Auth/Auth'
import Logout from './containers/Auth/Logout/Logout'

import * as actions from './store/actions/index';

class App extends Component {

  constructor(props){
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

    if ( this.props.isAuthenticated ) {
      routes = (
        <Switch>
          <Route path="/s/" component={StaticPages} />
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
      <div className={classes.App}>
        <Layout>
          {routes}
        </Layout>
      </div>
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
