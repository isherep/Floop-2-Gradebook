import React, {Component} from 'react';
import ExportToExcel from './exportToExcel';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import withFixedColumns from 'react-table-hoc-fixed-columns';
import 'react-table-hoc-fixed-columns/lib/styles.css';
import '../css/database.css';
import { getStudents} from '../Data/database';
import studentsTest from '../mock-data/studentsTest.json';
//import {getAssignments} from '../Data/database'
//import database from '../Data/database';
import * as firebase from 'firebase';


class ViewByAssignment extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            students: [],
            studentsAsync: [],
            studentsPromise: [],
            submissions:[],
            buildGrade: []
        }
        // this.renderEditable = this.renderEditable.bind(this);
    }
    componentDidMount(){
        const rootRef = firebase.database().ref().child('react')
        const studentRef = rootRef.child('students')
        console.log(studentRef)
        //building student array
        getStudents().then((students) => {
          const studentArray = []

          //const gradesArray = []
          //push objects that look like mock data
          const subStatusArray = []

          for(var id in students) {
            //array to hold grades
            var grades = []
            //building submission grades
            //console.log("New Students: ", students)

            var studentGrades = Object()
            console.log("Students Submissions: ", students[id].submissions)
            for(var i =0; i< 8; i++){//students.submissions){
                if(!students[id].submissions[i]){
                  grades.push("none");
                } else if(!students[id].submissions[i].grade){ 
                  grades[i] ="none"
                }else{
                  grades.push(students[id].submissions[i].grade)
                }
            }  
            console.log("Grades", grades)       
          }
            console.log("Grades", grades)
            studentArray.push(students[id]);
            console.log("Student: ", students[id]);
        
         
          // console.log("StudentArray: ", studentArray);
            
            this.setState({
              students: studentArray
            });
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
    * Dictionary(map) that holds information about the grade
    * @param s - submission id
    * @param i - submission grade 
    */
   getGrade(s, i) {
      if (i >= s.submissions.length) {
        return null;
      } else {
        console.log("Student ", s.name, s.submissions);
        console.log("Student ", s.name, " grade ", i, s.submissions[i].grade);
        return s.submissions[i].grade
      }
    }

      /**
     * Builds and 2D array of the submission status per student
     */

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
                accessor: s => { return this.getGrade(s, 0); },
                Cell: this.renderEditable,
                minWidth: 150
            },
            {
                Header: "Assignment 2",
                id: "ass2",
                accessor: s => this.getGrade(s, 1),
                Cell: this.renderEditable,
                minWidth: 150
            },
            {
                Header: "Assignment 3",
                id: "ass3",
                accessor: s => this.getGrade(s, 2),
                Cell: this.renderEditable,
                minWidth: 150
            },
            {
                Header: "Assignment 4",
                id: "ass4",
                accessor: s => this.getGrade(s, 3),
                Cell: this.renderEditable,
                minWidth: 150
            },
            {
                Header: "Assignment 5",
                id: "ass5",
                accessor: s => this.getGrade(s, 4),
                Cell: this.renderEditable,
                minWidth: 150
            },
            {
                Header: "Assignment 6",
                id: "ass6",
                accessor: s => this.getGrade(s, 5),
                Cell: this.renderEditable,
                minWidth: 150
            },
            {
                Header: "Assignment 7",
                id: "ass7",
                accessor: s => this.getGrade(s, 6),
                Cell: this.renderEditable,
                minWidth: 150
            },
            {
                Header: "Assignment 8",
                id: "ass8",
                accessor: s => this.getGrade(s, 7),
                Cell: this.renderEditable,
                minWidth: 150
            },
            {
                Header: "Assignment 9",
                id: "ass9",
                accessor: s => this.getGrade(s, 8),
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


  //The goal is to build the data structure like this for the grades
  const grades = [
    //student one
    { 
      "id": "4525dfa-rqfea",
      "name":"Maria",
      //"a1": students[i].grade,
      "a2": 10,
      "a3": 10,
      "a4": 10,
      "a5": 10,
      "a6": 10,
      "a7": 10,
      "a8": 10

    }
  ]


  const submissions = [
    //student one
    { 
      "id": "4525dfa-rqfea",
      "name":"Maria",
      //"a1": student[i]. status,
      "a2": 10,
      "a3": 10,
      "a4": 10,
      "a5": 10,
      "a6": 10,
      "a7": 10,
      "a8": 10

    }
  ]


  //The goal is to build the data structure like this for the submission status

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
export default ViewByAssignment;