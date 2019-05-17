import * as firebase from 'firebase';
import 'firebase/firestore';
//import classes from '*.module.sass';


// it will be best if you put the firestore config and initialization inside of it's own file, and then
// import it into any file that needs to connect to the database and/or fetch data from the DB
const config = {
    apiKey: 'AIzaSyCN1XhqCTbzY5t2zhIqsa1gwZMwTObtPxE',
    authDomain: 'gradebook-2b1e6.firebaseapp.com',
    databaseURL: '"https://gradebook-2b1e6.firebaseio.com"',
    projectId: 'gradebook-2b1e6',
    storageBucket: 'gradebook-2b1e6.appspot.com',
    messagingSenderId: '509807018012'
  };

  firebase.initializeApp(config);

  let db = firebase.firestore();

const students = [];
  function getNumStudents() {
    return students.length
  }


/*
  This runs in exactly the same manner as the above function that returns the Promise, except in this function, we are using
  ES2017 Async/Await syntax. 
*/
const getStudentsAsynchronously = async () => {
    //first - get to the students doc
    const studentQuery = db.collection('Databases').doc('Dev_Database')
      .collection('Users').where('Role', '==', 'Student');
  //wait for query to resolve
    const studentQuerySnapshot = await studentQuery.get();
    //assignment 1
    const Assignment1Query = db.collection('Databases').doc('Dev_Database')
      .collection('Submissions').where('Assignment', '==', '494AA418-ACAB-4BE2-AC81-B442B66F741E');

    const Assignment1QuerySnapshot = await Assignment1Query.get();
    // declare the array that will store our custom objects
    const studentsArrayInAsync = [];

    //console.log("Assignment1Query", Assignment1Query)
    // same as the function above, build our custom objects from the value that the .get() method resolves
    studentQuerySnapshot.forEach((studentDocument) => {
      studentsArrayInAsync.push({
        id: studentDocument.id,
        name: studentDocument.data().First_Name,
        //submissions: getAssignments
        //a1: Assignment1QuerySnapshot,//doc('-LKFrICqw1PghOOTRgLO').Current_Grade,
        grades: [],
        //a1: getAssignments.get("Current_Grade"),
        a1: 10,
        a2: 10,
        a3: 10,
        a4: 10,
        a5: 10,
        a6: 10,
        a7: 10,
        a8: 10,
      });
    });
    

  return studentsArrayInAsync;
}
// Boom! Even though we used Async/Await, we still know that this function is going to return a promise. So for 
// Demonstration purposes, we need to use a .then() chain in order to log our data arrays properly.
getStudentsAsynchronously().then(response => console.log('Students With Async/Await: ', response));






/**
 * Creates an array of grades of assignmentOne
 * We are assuming that '494AA418-ACAB-4BE2-AC81-B442B66F741E' is a Assignment 1
 */
const getSubmissions = async () => {

  const submissionsRef = db.collection('Databases').doc('Dev_Database').collection('Submissions').where('Assignment_ID', '==', '494AA418-ACAB-4BE2-AC81-B442B66F741E');
    
    const submissionsSnapshot = await submissionsRef.get();
    const submissions = []
    submissionsSnapshot.forEach((submissionDoc) => {
      submissions.push({     
        assignID: submissionDoc.id, 
        grade: submissionDoc.data().Current_Grade,
        student: submissionDoc.data().Owner_IDs
        
      })
    })
    return submissions;
  }
  getSubmissions().then(response => console.log('Assignments Async/Await: ', response));

//maping grades to students
//firebase. firestore. DocumentSnapshot
//The data can be extracted with .data() or .get(<field>) to get a specific field.
//submissions.get(Owner_ID) or submissins.OWNER_Ids.get("S")
const addGradesToStudents = async() => {
    
  let gradesAssignOne = await getSubmissions();
  let students = await getStudentsAsynchronously();
  

    try {
      for(let grade in gradesAssignOne){
        let studGrade = gradesAssignOne.find(x=>x.grade.student === students.id)
        console.log("StudentGrade is ",studGrade)
        // classOfAssignment.assignments.push(assignment);
        studGrade.gradesAssignOne.push(studGrade);
      }
    } catch(err){
    console.log('addGradesToStudents() error: ', err);
  }
  return gradesAssignOne;
}

addGradesToStudents().then(response => console.log('Filled up grades are : ', response));


export { getStudentsAsynchronously,  getSubmissions ,students}