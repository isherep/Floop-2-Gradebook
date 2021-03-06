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


class ViewByMetric extends Component {
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

   getGrade(s, i) {
      if (i >= s.submissions.length) {
        return null;
      } else {
        console.log("Student ", s.name, s.submissions);
        console.log("Student ", s.name, " grade ", i, s.submissions[i].grade);
        return s.submissions[i].grade
      }
    }

    render() {
        const ReactTableFixedColumns = withFixedColumns(ReactTable);
        const columns = [
            {
                Header: "Student",
                accessor: "id",
                fixed: 'left',
            },
            {
                Header: "Submissions",
                accessor: "id",
                fixed: 'left',
            },
            {
                Header: "Grades",
                accessor: "name",
                fixed: 'left',
                minWidth: 200
            },
            {
                Header: "Feedback",
                id: "ass1",
                accessor: s => { return this.getGrade(s, 0); },
                Cell: this.renderEditable,
                minWidth: 150
            },
            {
                Header: "%Feedback Read",
                id: "ass2",
                accessor: s => this.getGrade(s, 1),
                Cell: this.renderEditable,
                minWidth: 150
            },
            {
                Header: "%Feedback Responded",
                id: "ass3",
                accessor: s => this.getGrade(s, 2),
                Cell: this.renderEditable,
                minWidth: 150
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
export default ViewByMetric;