import React, {Component} from 'react';
import './App.css';
import NavTab from './components/navTab';

class App extends Component {

  render() {
    return (
      <div className="App">
        <h1>Gradebook</h1>
        <NavTab/> 
      </div>
    );
  }
}

export default App;
