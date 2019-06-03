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
class ViewByAssignment extends Component {
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
        const rootRef = firebase.database().ref().child('react')
        const studentRef = rootRef.child('students')
        console.log(studentRef)
        //holds key value pairs of student and grades
        const studentArray = []
        // initializing arrays to hold grades and statuses objects
        let studentAndGrades = Object()
        let studentAndStatus = Object()
        //building student array
        //first get the students from the database
        //then build a dicionary with each student id, name, grades
        getStudents().then((students) => {        
          for(var id in students) {
            //array to hold grades
            var grades = []
            //array to hold submission status
            var statuses = []

            // iteratinng trough each student's submission if exists, 
            // adding submission status the  statuses array
            for(var j = 0; j< 9; j++){
              if(!students[id].submissions[j]){
                statuses.push("NONE");
              } else if(!!students[id].submissions[j].status){
                statuses[j] = "NO ASSIGNMENT ASSIGNED YET"
              } else if(!students[id].submissions[j].dueDate){
                statuses[j] = "NO DUE DATE"
              } else if (!students[id].submissions[j].submissionDate) {
                statuses[j] = "NOT SUBMITTED";
              } else {
                statuses[j] = students[id].submissions[j].status;
              
              }
            }

            // iteratinng trough each student's submission if exists, 
            // adding submission grade the  grades array
            for(var i =0; i< 9; i++){//students.submissions){
                if(!students[id].submissions[i]){
                  grades.push("none");
                  
                } else if(!students[id].submissions[i].grade){ 
                  grades[i] ="none"
                }else{
                  grades.push(students[id].submissions[i].grade)
                }
            }  
            //student object that holds grades only
            studentAndGrades = {
              id: students[id].id,
              name: students[id].name,
              a1: grades[0],
              a2: grades[1],
              a3: grades[2],
              a4: grades[3],
              a5: grades[4],
              a6: grades[5],
              a7: grades[6],
              a8: grades[7],
              a9: grades[8]
            }
            //prints in console
            console.log("studentAndGrades: ", studentAndGrades )
            //adding each student object to the array of grades
            this.studentGradesArray.push(studentAndGrades);
          //student object that holds submission statuses only
            studentAndStatus = {
              id: students[id].id,
              name: students[id].name,
              a1: statuses[0],
              a2: statuses[1],
              a3: statuses[2],
              a4: statuses[3],
              a5: statuses[4],
              a6: statuses[5],
              a7: statuses[6],
              a8: statuses[7],
              a9: statuses[8]
            }
            //adding each student object to the array of statuses
            this.studentStatusesArray.push(studentAndStatus)
          }
          //setting the state in this case to statuses
          // if you do students: studentStatusesArray the table will show grades
          this.setState({
            students:  this.studentGradesArray
         });
          //checking
           console.log("StudentArray: ", studentArray);            
      });

      //checking
     console.log("studentAndGrades", studentArray)
     console.log("State: ", this.state.students)
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