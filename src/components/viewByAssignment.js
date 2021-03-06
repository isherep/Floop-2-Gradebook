
    
import React, {Component} from 'react';
import ExportToExcel from './exportToExcel';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import withFixedColumns from 'react-table-hoc-fixed-columns';
import 'react-table-hoc-fixed-columns/lib/styles.css';
import '../css/database.css';
import { getStudents} from '../Data/database';
import * as firebase from 'firebase';
import testDataFromJsomFile from '../mock-data/students.json'

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
         //this.renderEditable = this.renderEditable.bind(this);
         this.studentGradesArray = []
         this.studentStatusesArray = []
         this.submissionFeedbackArray = []
         //to hold columns names of assignemtns
         this.assignmentNames = []

          // in your constructor, add this binding
      //this.updatePostion = this.updatePostion.bind(this)
        //this.switchToGrades = this.switchToGrades.bind(this);
      }
      
      //switches state to grades
      //changes only on a second click.
      //Maybe need to use "componentDidUpdate- should be used instead to apply such logic in most cases.""
      switchToGrades() {
        this.setState({
          //students: testDataFromJsomFile   - this works
          students: this.studentGradesArray //doesn't work - builds empty rows
      });
    }

      //switches state to submission statuses
      switchToStatuses() {
        this.setState({
          students: this.studentStatusesArray
        });
      }
    
      switchToFeedback() {
        this.setState({
          students: this.submissionFeedbackArray
        });
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
        let submissionAndFeedback = Object()
        //building student array
        //first get the students from the database
        //then build a dicionary with each student id, name, grades


        // Due this business logic in the controller
        // 
        getStudents().then((students) => {        
          for(var id in students) {
            //array to hold grades
            var grades = []
            //array to hold submission status
            var statuses = []
            var feedback = []

            // iteratinng trough each student's submission if exists, 
            // adding submission status the  statuses array
            for(var j = 0; j< 14; j++){
              if(!students[id].submissions[j]){
                statuses[j] = "-";
              } else if(!!students[id].submissions[j].status){
                statuses[j] = "REVIEWING"
              } else if(!students[id].submissions[j].dueDate){
                statuses[j] = "NEEDS DUE DATE"
              } else if (!students[id].submissions[j].submissionDate) {
                statuses[j] = "NOT SUBMITTED";
              //} else if(students[id].submissions[j].submissionDate.nanoseconds > students[id].submissions[j].assignment[j].dueDate.nanoseconds){
                //statuses[j] = "LATE";
              } else {
                statuses[j] = students[id].submissions[j].status;
              
              
              }
            }

            // iteratinng trough each student's submission if exists, 
            // adding submission grade the  grades array
            for(var i =0; i< 14; i++){//students.submissions){
                if(!students[id].submissions[i]){
                  //the symbol inside parenthesis, is what will be showing in a student/assignment cell
                  // you can change it to anything you like
                  grades.push("-");
                  //feedback.push("-")
                  
                } else if(!students[id].submissions[i].grade){ 
                  grades[i] ="GRADING"
                  feedback[i] = "in progress"
                } else if(!students[id].submissions[i].feedback){

                  feedback[i] = "in progress"

                } else{
                this.assignmentNames.push(students[id].submissions[i].assignment.assignName)
                //prints OK
                console.log("Assignment name ", this.assignmentNames);
                grades[i] = students[id].submissions[i].grade
                feedback[i] = students[id].submissions[i].feedback
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
              a9: grades[8],
              a10: grades[9],
              a11: grades[10],
              a12: grades[11],
              a13: grades[12]
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
              a9: statuses[8],
              a10: statuses[9],
              a11: statuses[10],
              a12: statuses[11],
              a13: statuses[12]
            }
            //adding each student object to the array of statuses
            this.studentStatusesArray.push(studentAndStatus)


            submissionAndFeedback = {
              id: students[id].id,
              name: students[id].name,
              a1: feedback[0],
              a2: feedback[1],
              a3: feedback[2],
              a4:feedback[3],
              a5: feedback[4],
              a6: feedback[5],
              a7: feedback[6],
              a8: feedback[7],
              a9: feedback[8],
              a10: feedback[9],
              a11: feedback[10],
              a12: feedback[11],
              a13: feedback[12]
            }
            console.log("Feedback", submissionAndFeedback)
            this.submissionFeedbackArray.push(submissionAndFeedback)
          }
          console.log("Submission array", this.submissionFeedbackArray)
          //setting the state in this case to statuses
          // if you do students: studentStatusesArray the table will show grades
          this.setState({
            students:  this.studentStatusesArray
         });
          //checking
           console.log("StudentArray: ", studentArray);            
      });

      /*
      function switchToGrades() {
        this.setState({
          //students: testDataFromJsomFile   - this works
          students: this.studentGradesArray //doesn't work - builds empty rows
      });
    }*/
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
                Header: this.assignmentNames[0],//"Assignment 1",            
                accessor: "a1",              
                minWidth: 150
            },
            {
                Header: this.assignmentNames[1],//"Assignment 2",
                accessor: "a2",
                minWidth: 150
            },
            {
                Header: this.assignmentNames[2],
                accessor: "a3",
                minWidth: 150
            },
            {
                Header: this.assignmentNames[3],
                accessor: "a4",
                minWidth: 150
            },
            {
                Header: this.assignmentNames[4],
                accessor: "a5",
                minWidth: 150
            },
            {
                Header: this.assignmentNames[5],
                accessor: "a6",
                minWidth: 150
            },
            {
                Header: this.assignmentNames[6],
                accessor: "a7",
                minWidth: 150
            },
            {
                Header: this.assignmentNames[7],
                accessor: "a8",
                minWidth: 150
            },
            {
                Header: this.assignmentNames[8],
                accessor: "a9",
                //Cell: this.renderEditable,
                minWidth: 150,
            },
            {
              Header: this.assignmentNames[9],
              accessor: "a9",
              minWidth: 150,
          },
          {
            Header: this.assignmentNames[11],
            accessor: "a9",
            minWidth: 150,
        },
        {
          Header: this.assignmentNames[12],
          accessor: "a9",
          minWidth: 150,
      },
      {
        Header: this.assignmentNames[13],
        accessor: "a9",
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
