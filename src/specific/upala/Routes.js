import React, { Component } from 'react';

// Routing
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

// Vitrnx generic components
import Blog from '../../containers/blog/Blog'
import QueryPosts from '../../containers/blog/QueryPosts'
import Users from '../../containers/users/Users'

// Upala specific 
import Layout from './layout/Layout'
import StaticPage from './pages/StaticPages'
import Home from './pages/Home'
import PrivateHome from '../../containers/home/Home'

// Private
import Dashboard from '../../containers/dashboard/Dashboard'

import Register from '../../containers/auth/Register'
import Login from '../../containers/auth/Login'
import Logout from '../../containers/auth/Logout/Logout'

class UpalaRoutes extends Component {

  render() {
    const { isAuth, userRoles } = this.props

    // Default routes 
    let routes = [
      <Route path="/s" component={StaticPage} />,
      <Route path="/p" component={Blog} />,
      <Route path="/q" component={Blog} />,
      <Route path="/" exact component={Home} />,
    ];

    // Login management
    if (isAuth) {
      routes = [...routes, (<Route path="/logout" component={Logout} />)];
    } else {
      routes = [...routes, (<Route path="/register" component={Register} />), (<Route path="/login" component={Login} />)];
    }

    // Private routes
    if (userRoles && (userRoles.includes("ADMIN") || userRoles.includes("EDITOR"))) {
      routes = [...routes, (<Route path="/all/" component={QueryPosts} />)];
    }

    if (userRoles && (userRoles.includes("ADMIN") || userRoles.includes("USER_ADMIN"))) {
      routes = [...routes,
      (<Route path="/dashboard" component={Dashboard} />),
      (<Route path="/u/" component={Users} />)
      ]
    }

    routes = [...routes, (<Redirect to="/" />)]

    return (
      <Layout>
        <Switch>
          {/* Spread operator does not work here, WHY??  */}
          {routes.map(element => element)}
        </Switch>
      </Layout >
    );
  }
}

export default withRouter(UpalaRoutes);
