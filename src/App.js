import { OpenSourceList } from './components/github/OpenSourceList';
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <OpenSourceList username='diegomichell' />
      </div>
    );
  }
}

export default App;
