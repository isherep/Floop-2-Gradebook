import React, {Component} from 'react';
import ExportToExcel from './exportToExcel';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import withFixedColumns from 'react-table-hoc-fixed-columns';
import 'react-table-hoc-fixed-columns/lib/styles.css';
import '../css/database.css';
import {getStudentsAsynchronously,  getSubmissionsFirst ,getSubmissionsSecond, getStudents} from '../Data/database';
import studentsTest from '../mock-data/studentsTest.json';
//import {getAssignments} from '../Data/database'
//import database from '../Data/database';
import * as firebase from 'firebase';

//Submissions have two main fields : Accessed(true, false), Date Submitted, Grade
//Assignemnts have due date
//Iterate through submissions to compare submission date with the assignment date
class sumbmissionsTabData extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            students: [],
            studentsAsync: [],
            studentsPromise: [],
            submissions:[]
        }
        // this.renderEditable = this.renderEditable.bind(this);
    }

    componentDidMount(){
        const rootRef = firebase.database().ref().child('react')
        const studentRef = rootRef.child('students')
        console.log(studentRef)
        getStudents().then((students) => {
          const studentArray = []
          for(var id in students) {
            studentArray.push(students[id]);
            console.log("Student: ", students[id]);
          }
          // console.log("StudentArray: ", studentArray);
          // studentRef.on('value', snap => {
            this.setState({
              students: studentArray
            });
        // })
      });
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
              __html: cellInfo.value
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
    /*
    * Dictionary that holds information about the grade
    * @param s - submission id
    * @param i - submission grade 
    */
   getStatus(s, i) {
      if (i >= s.submissions.length) {
        return null;
      } else {
        console.log("Student ", s.name, s.submissions);
        console.log("Student ", s.name, " grade ", i, s.submissions[i].status);
        return s.submissions[i].status
      }
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
                id: "ass1",
                accessor: s => { return this.getStatus(s, 0); },
                Cell: this.renderEditable,
                minWidth: 150
            },
            {
                Header: "Assignment 2",
                id: "ass2",
                accessor: s => this.getStatus(s, 1),
                Cell: this.renderEditable,
                minWidth: 150
            },
            {
                Header: "Assignment 3",
                id: "ass3",
                accessor: s => this.getStatus(s, 2),
                Cell: this.renderEditable,
                minWidth: 150
            },
            {
                Header: "Assignment 4",
                id: "ass4",
                accessor: s => this.getStatus(s, 3),
                Cell: this.renderEditable,
                minWidth: 150
            },
            {
                Header: "Assignment 5",
                id: "ass5",
                accessor: s => this.getStatus(s, 4),
                Cell: this.renderEditable,
                minWidth: 150
            },
            {
                Header: "Assignment 6",
                id: "ass6",
                accessor: s => this.getStatus(s, 5),
                Cell: this.renderEditable,
                minWidth: 150
            },
            {
                Header: "Assignment 7",
                id: "ass7",
                accessor: s => this.getStatus(s, 6),
                Cell: this.renderEditable,
                minWidth: 150
            },
            {
                Header: "Assignment 8",
                id: "ass8",
                accessor: s => this.getStatus(s, 7),
                Cell: this.renderEditable,
                minWidth: 150
            },
            {
                Header: "Assignment 9",
                id: "ass9",
                accessor: s => this.getStatus(s, 8),
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
            data={this.state.students}
            showPagination={false}
            filterable
            defaultPageSize={25}
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
export default sumbmissionsTabData;