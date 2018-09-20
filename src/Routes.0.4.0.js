import React, { Component } from 'react';

// Routing
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

// Vitrnx specific components
import Layout from './hoc/Layout/Layout'
import Blog from './containers/blog/Blog'
import QueryPosts from './containers/blog/QueryPosts'
import Users from './containers/users/Users'

// Static pages
import Home from './containers/home/Home'
import VideoPage from './components/blog/Media/MediaPage';
import Dashboard from './containers/dashboard/Dashboard'
import Register from './containers/auth/Register'
import Login from './containers/auth/Login'
import Logout from './containers/auth/Logout/Logout'
import LogoutAndRegister from './containers/auth/Logout/LogoutAndRegister';

// Styling
import classes from './vitrnx.css';

class Routes40 extends Component {

  render() {
    const { isAuth, userRoles } = this.props

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

      if (userRoles && userRoles.includes("EDITOR")) {
        routes = [...routes,
        (<Route path="/all/" component={QueryPosts} />)
        ]
      }

      if (userRoles && (userRoles.includes("VOLUNTEER") || userRoles.includes("ORGANISATION"))) {
        routes = [...routes,
        (<Route path="/dashboard" component={Dashboard} />)
        ]
      }

      if (userRoles && (userRoles.includes("ADMIN") || userRoles.includes("USER_ADMIN"))) {
        routes = [...routes,
        (<Route path="/u/" component={Users} />)
        ]
      }
    }

    routes = [...routes, (<Redirect to="/" />)]

    return (
      isAuth ?
        (<Layout className={classes.Container}>
          <Switch>
            {/* Spread operator does not work here, WHY??  */}
            {routes.map(element => element)}
          </Switch>
        </Layout>
        )
        :
        <Switch>
          {routes.map(element => element)}
        </Switch>
    );
  }
}

export default withRouter(Routes40);
