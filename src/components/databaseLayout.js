import React, {Component} from 'react';
import ExportToExcel from './exportToExcel';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import withFixedColumns from 'react-table-hoc-fixed-columns';
import 'react-table-hoc-fixed-columns/lib/styles.css';
import '../css/database.css';
import {getStudentsAsynchronously,  getSubmissionsFirst ,getSubmissionsSecond, students} from '../Data/database';
import studentsTest from '../mock-data/studentsTest.json';
//import {getAssignments} from '../Data/database'
//import database from '../Data/database';
import * as firebase from 'firebase';

class DatabaseLayout extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            students: [],
            studentsAsync: [],
            studentsPromise: [],
            submissions:[]
        }
        this.renderEditable = this.renderEditable.bind(this);
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
  
  getSubmissionsFirst().then(response => console.log('Get Submissions ', response));

  // now that we know they are imported and working as expected, lets set new state properties as examples...

  getStudentsAsynchronously().then(response => this.setState({
    studentsAsync: response,
  }));

  //getSubmissionsFirst().then(response => this.setState({
    //submissions: response,
  //}));

  getSubmissionsSecond().then(response => this.setState({
    submissions: response,
  }));

}



    renderEditable(cellInfo) {
        return (
          <div
            suppressContentEditableWarning
            contentEditable
            onDoubleClick={e => {
              const students = [...this.state.students];
              students[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
              this.setState({students});
            }}
            dangerouslySetInnerHTML={{
              __html: this.state.studentsAsync[cellInfo.index][cellInfo.column.id]
            }}
          />
        );
    }

    deleteColumn(id) {
        const index = this.state.students.findIndex(student => {
          return student.id === id
        })
        console.log("index", index)
    }

    render() {
        const ReactTableFixedColumns = withFixedColumns(ReactTable);
        const columns = [
            {
                Header: "Student ID",
                accessor: "id",
                fixed: 'left',
            },
            {
                Header: "Name",
                accessor: "name",
                fixed: 'left',
                minWidth: 200
            },
            {
                Header: "Assignment 1",
                accessor: "a1",
                Cell: this.renderEditable,
                minWidth: 150
            },
            {
                Header: "Assignment 2",
                accessor: "a2",
                Cell: this.renderEditable,
                minWidth: 150
            },
            {
                Header: "Assignment 3",
                accessor: "a3",
                Cell: this.renderEditable,
                minWidth: 150
            },
            {
                Header: "Assignment 4",
                accessor: "a4",
                Cell: this.renderEditable,
                minWidth: 150
            },
            {
                Header: "Assignment 5",
                accessor: "a5",
                Cell: this.renderEditable,
                minWidth: 150
            },
            {
                Header: "Assignment 6",
                accessor: "a6",
                Cell: this.renderEditable,
                minWidth: 150
            },
            {
                Header: "Assignment 7",
                accessor: "a7",
                Cell: this.renderEditable,
                minWidth: 150
            },
            {
                Header: "Assignment 8",
                accessor: "a8",
                Cell: this.renderEditable,
                minWidth: 150
            },
            {
                Header: "Assignment 8",
                accessor: "a8",
                Cell: this.renderEditable,
                minWidth: 150,
            },
            {
                Header: "Actions",
                Cell: props => {
                    return (
                        <button 
                            onClick={() => {
                                this.deleteColumn(props.original.id)
                        }}
                        >
                            Delete
                        </button>
                    )  
                }
            }
        ]
        return(
          <ReactTableFixedColumns className="databaseStyle"
            columns={columns}
           // data={this.state.students}
            data={this.state.studentsAsync}
            showPagination={false}
            filterable
            defaultPageSize={15}
            >
            {(state, filteredData, instance) => {
              this.ReactTableFixedColumns = state.pageRows.map(student => {return student._original});
                return (
                  <div>
                    {filteredData()}
                    <ExportToExcel studentsAsync={this.ReactTableFixedColumns}/> 
                  </div>
                )
            }}
          </ReactTableFixedColumns>
        );
    }
}
export default DatabaseLayout;