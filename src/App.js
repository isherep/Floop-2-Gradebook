import React, {Component} from 'react';
import ReactTable from 'react-table'
import './App.css';
import NavTab from './components/navTab';
import "react-table/react-table.css";
import jsonData from './mock-data/grades.json'

class App extends Component {

  constructor(props) {
    super(props);
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
        data={jsonData}

      >

      </ReactTable>
    );
  }
}

export default App;
