import React, {Component} from 'react';
import ReactTable from 'react-table'
import './App.css';
import NavTab from './components/navTab';
import "react-table/react-table.css";
import jsonData from './mock-data/grades.json'
import students from './Data/database'
import studentsTest from './mock-data/studentsTest.json'
import database from './Data/database'
import * as firebase from 'firebase'

class App extends Component {

  constructor(props) {
    super(props);

    /*this.state = {
      "id":"irynas@gmail.com",
      "name":"Bob",
      "a1": 10,
      "a2": 10,
      "a3": 18,
      "a4": 10,
      "a5": 5,
      "a6": 10
  };*/

  this.state = {students}
  }
 
  
  componentDidMount(){
    const rootRef = firebase.database().ref().child('react')
    const studentRef = rootRef.child('students')
    console.log(studentRef)
    studentRef.on('value', snap => {

        
      this.setState({
        students: students
      });

  });
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
        data={this.state.students}
        //data={studentsTest}
        >

      </ReactTable>
    );
  }
}

console.log(students)

export default App;
