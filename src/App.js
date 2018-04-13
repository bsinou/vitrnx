import React, { Component } from 'react';
import classes from './App.css';

import { Route, Switch } from 'react-router-dom';
// , withRouter // , Redirect


import Home from './static/Home/Home'
import StaticPages from './static/Pages/Pages'

import Blog from './containers/Blog/Blog'
import Auth from './containers/Auth/Auth'

import Layout from './hoc/Layout/Layout'


class App extends Component {


  render() {

    let routes = (
      <Switch>
        <Route path="/s/" component={StaticPages} />
        <Route path="/p/" component={Blog} />
        <Route path="/q/" component={Blog} />
        <Route path="/login" component={Auth} />
        <Route path="/" exact component={Home} />
      </Switch>
    );
  
    // if ( this.props.isAuthenticated ) {
    //   routes = (
    //     <Switch>
    //       <Route path="/checkout" component={Checkout} />
    //       <Route path="/orders" component={Orders} />
    //       <Route path="/logout" component={Logout} />
    //       <Route path="/" exact component={BurgerBuilder} />
    //       <Redirect to="/" />
    //     </Switch>
    //   );
    // }

    return (
        <div className={classes.App}>
          <Layout>
            {routes}
          </Layout>
        </div>
    );
  }
}

export default App;
