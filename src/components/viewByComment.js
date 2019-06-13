import React, {Component} from 'react';
import ExportToExcel from './exportToExcel';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import withFixedColumns from 'react-table-hoc-fixed-columns';
import 'react-table-hoc-fixed-columns/lib/styles.css';
import '../css/database.css';
import { getStudents} from '../Data/database';
import * as firebase from 'firebase';

/**
 * This component creates a react-table with students arrays as rows and assignments as columns
 */
class ViewByComment extends Component {
    constructor(props) {
        super(props);

        this.state = {
            students: [],
           // studentSubStatus: []
        }
         this.renderEditable = this.renderEditable.bind(this);
         this.studentGradesArray = []
        this.studentStatusesArray = []
      }
      //switches state to grades
      switchToGrades() {
        this.setState(this.studentAndGradesArray)
      }
      //switches state to submission statuses
      switchToStatuses() {
        this.setState(this.studentStatusesArray)
      }

  /**
   * This function makes an asynchronous call to the getStudents function in the database and pulls
   * all the students information.
   * Then it builds a an array of students and grades objects, and an array of students and submission
   * statuses objects which are then set in state to feed the data property of the table.
   * OnClick method changes the state's array from assignments to submision statuses.
   */
    componentDidMount(){
      conversationsSnapshot.forEach((conversationDoc) => {
      conversations[conversationDoc.Class_ID] = {
        id: conversationDoc.Class_ID
        //now find the assignment its related to
        assignID: conversationDoc.Submission_ID //or whatever field there shows submission number
        feedback: conversationDoc.COMMENT_PREVIEW
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
              __html:
              //this.state.studentsAsync[cellInfo.index][cellInfo.column.id]
              this.state.students[cellInfo.index][cellInfo.column.id]
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


    /**
     * Renders a table based on columns and data
     */
    render() {
        const ReactTableFixedColumns = withFixedColumns(ReactTable);

        //columns for the table
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
              //  id: "ass1",
                accessor: "a1",
               // Cell: this.renderEditable,
                minWidth: 150
            },
            {
                Header: "Assignment 2",
                //id: "ass2",
                accessor: "a2",
                //Cell: this.renderEditable,
                minWidth: 150
            },
            {
                Header: "Assignment 3",
              //  id: "ass3",
                accessor: "a3",
               // Cell: this.renderEditable,
                minWidth: 150
            },
            {
                Header: "Assignment 4",
                //id: "ass4",
                accessor: "a4",
                //Cell: this.renderEditable,
                minWidth: 150
            },
            {
                Header: "Assignment 5",
                //id: "ass5",
                accessor: "a5",
                //Cell: this.renderEditable,
                minWidth: 150
            },
            {
                Header: "Assignment 6",
                //id: "ass6",
                accessor: "a6",
                //Cell: this.renderEditable,
                minWidth: 150
            },
            {
                Header: "Assignment 7",
               // id: "ass7",
                accessor: "a7",
                //Cell: this.renderEditable,
                minWidth: 150
            },
            {
                Header: "Assignment 8",
                //id: "ass8",
                accessor: "a8",
                //Cell: this.renderEditable,
                minWidth: 150
            },
            {
                Header: "Assignment 9",
                //id: "ass9",
                accessor: "a9",
                //Cell: this.renderEditable,
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
      //this is a representation of how the student data is structured in the database.js
      const studentMock = [
       //------Student 1 Maria-------
        {
          "id":2,
          "name":"Maria",
          "submissions": [
              //first submission
            {

                "assignment": {
                    "id": "B2F820F7-561A-4244-9D55",
                    "assing name": "gabe test",
                },
                "Due Date": {
                  "nanosecnds": 324212,
                  "seconds": 345352
                },

                "grade": "AB",
                "id": "-LKUSh9s_pAgE2RdwWrb",
                "status": "LATE",

                "submissionDate": {
                  "nanoseconds": 673000000,
                  "seconds": 1534905303
                },

              },

                //second submission
              {
                "assignment" :{
                  "id": "B2F820F7-561A-4244-9D55",
                  "assing name": "gabe test"
                },
                  "Due Date": {
                    "nanosecnds": 324212,
                    "seconds": 345352
                  },


              "grade": "AB",
              "id": "-LKUSh9s_pAgE2RdwWrb",
              "status": "LATE",

              "submissionDate": {
                "nanoseconds": 673000000,
                "seconds": 1534905303
              },
            }
          ]
      },

      //------end of student 1

      //--- student 2 Jose ----
      {
        "id":3,
        "name":"Jose",
        "submissions": [
              // 0
              {
              "assignment": {
                  "id": "4325327-561A-4244-9D55",
                  "assing name": "Final assignment"
                },
                  "Due Date": {
                    "nanosecnds": 325432,
                    "seconds": 34457
                  },


              "grade": "AB",
              "id": "-LKUSh9s_pAgE2RdwWrb",
              "status": "LATE",

              "submissionDate": {
                "nanoseconds": 673000000,
                "seconds": 1534905303
              }
            },
            {
              //1
              "assignment" :{
                "id": "B2F820F7-561A-4244-9D55",
                "assing name": "gabe test",
                "Due Date": {
                  "nanosecnds": 324212,
                  "seconds": 345352
                },
            },

            "grade": "AB",
            "id": "-LKUSh9s_pAgE2RdwWrb",
            "status": "LATE",

            "submissionDate": {
              "nanoseconds": 673000000,
              "seconds": 1534905303
            }
          }
          ]
        }
  ]



  //The goal is to build the data structure like this for the submission status
   // console.log("State ", this.state)
        return(
          <ReactTableFixedColumns className="databaseStyle"
            columns={columns}
            // sets the data that builds table rows
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
export default ViewByAssignment;
