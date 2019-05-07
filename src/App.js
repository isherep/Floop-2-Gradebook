import React, {Component} from 'react';
import './App.css';
import NavTab from './components/navTab';
import student from './database';
import { ENETUNREACH } from 'constants';
import students from './database';

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


for(var i = 0; i< students.length; i++){
  console.log(students[i])
}

console.log(students)

export default App;
