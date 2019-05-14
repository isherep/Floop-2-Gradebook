import React, {Component} from 'react';
import './App.css';
import ReactTable from 'react-table'
import NavTab from './components/navTab';
import * as firebase from 'firebase';
import withFixedColumns from 'react-table-hoc-fixed-columns';
import { students, getStudentsAsynchronously, getStudentsAsynchronouslyWithPromise} from './Data/database';


class App extends Component {
  
      
      render() {
        return(
          <div className="App">
            <h1>Gradebook</h1>
            <NavTab/>
          </div>
        );
      }
    }
    


export default App;