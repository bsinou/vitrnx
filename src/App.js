import React, { Component } from 'react';
import './App.css';

import Layout from './hoc/Layout/Layout'
import Home from './components/Home/Home'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <Home />
        </Layout>
      </div>
    );
  }
}

export default App;
