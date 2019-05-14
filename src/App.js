import React, {Component} from 'react';
import ReactTable from 'react-table'
import './App.css';
import NavTab from './components/navTab';
import "react-table/react-table.css";
import jsonData from './mock-data/grades.json'
import { students, getStudentsAsynchronously,getSubmissions, getStudentsAsynchronouslyWithPromise} from './Data/database'
import studentsTest from './mock-data/studentsTest.json'
import database from './Data/database'
import * as firebase from 'firebase'

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      students: [],
      studentsAsync: [],
      studentsPromise: [],
  
    }
  }
 
  
  componentDidMount(){
    const rootRef = firebase.database().ref().child('react')
    const studentRef = rootRef.child('students')
    //console.log(studentRef)
    studentRef.on('value', snap => {

      this.setState({
        students: students
      });

  });
  // import our functions from database.js and log them again.
  getStudentsAsynchronously().then(response => console.log('With Async/Await Again: ', response));

  getStudentsAsynchronouslyWithPromise().then(response => console.log('With Promise Again: ', response));

  // now that we know they are imported and working as expected, lets set new state properties as examples...

  getStudentsAsynchronously().then(response => this.setState({
    studentsAsync: response,
  }));

  getSubmissions().then(response =>
    console.log("Submissions ", response)
  )

  const subs = getSubmissions();

  console.log("Subs", subs);

  getStudentsAsynchronouslyWithPromise().then( (response) => {
    this.setState({
    studentsPromise: response,
    });
    console.log('App.js State Two: ', this.state);
  });

  // log the whole state object to see which ones actually made it to our state. None!
  // It's because this piece of code runs before our promises resolve!
  console.log('App.js State One: ', this.state);


}
  render() {

    
    const columns = [
      {
        Header: "Student ID",
        accessor: "id"
      },

      {
        Header: "Name",
        accessor: "name"
      },

      {
        Header: "Assignment 1",
        accessor: "a1"
      },

      {
        Header: "Assignment 2",
        accessor: "a2"
      },

      {
        Header: "Assignment 3",
        accessor: "a3"
      },

      {
        Header: "Assignment 4",
        accessor: "a4"
      },

      {
        Header: "Assignment 5",
        accessor: "a5"
      },

      {
        Header: "Assignment 6",
        accessor: "a6"
      },

      {
        Header: "Assignment 7",
        accessor: "a7"
      },

      {
        Header: "Assignment 8",
        accessor: "a8"
      }
    ]
    
    
    return (
      /*<div className="App">
        <h1>Gradebook</h1>
        /*<NavTab/>
      </div>*/
      
      <ReactTable
      
        columns={columns}
        data={this.state.studentsAsync} // build the table with studentsSync
       // data={studentsTest}    - works, builds rows
        >

      </ReactTable>
    );
  }
}

//console.log(students);
console.log()

export default App;