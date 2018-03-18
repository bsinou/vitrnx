import React, { Component } from 'react';
import classes from './App.css';

import { BrowserRouter, Route } from 'react-router-dom'

import Layout from './hoc/Layout/Layout'
import Home from './static/Home/Home'
import Blog from './containers/Blog/Blog'
import StaticPages from './static/Pages/Pages'

class App extends Component {
  render() {
    return (
      <BrowserRouter> 
        <div className={classes.App}>
          <Layout>
            <Route path="/s/" component={StaticPages} />
            <Route path="/p/" component={Blog} />
            <Route path="/q/" component={Blog} />
            <Route path="/" exact component={Home} />
          </Layout>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
