import * as firebase from 'firebase';
import 'firebase/firestore';
import { withFixedColumnsScrollEvent } from 'react-table-hoc-fixed-columns';
//import classes from '*.module.sass';


// it will be best if you put the firestore config and initialization inside of it's own file, and then
// import it into any file that needs to connect to the database and/or fetch data from the DB
const config = { 
    apiKey:     'AIzaSyCN1XhqCTbzY5t2zhIqsa1gwZMwTObtPxE',
    authDomain: 'gradebook-2b1e6.firebaseapp.com',
    databaseURL: '"https://gradebook-2b1e6.firebaseio.com"',
    projectId: 'gradebook-2b1e6',
    storageBucket: 'gradebook-2b1e6.appspot.com',
    messagingSenderId: '509807018012'
  };

  firebase.initializeApp(config);

  let db = firebase.firestore();

/**
 * Building and array of students with their submissios grades
 */
const getStudents = async () => {
    //first - get to the students doc
    const studentQuery = db.collection('Databases').doc('Dev_Database')
      .collection('Users').where('Role', '==', 'Student').get();
    //wait for query to resolve
    
    const submissionsQuery = db.collection('Databases').doc('Dev_Database')
            .collection('Submissions').get();



    const assignmentQuery = db.collection('Databases').doc('Dev_Database')
            .collection('Assignments').get();   
        
    const feedbackQuery = db.collection('Databases').doc('Dev_Database').collection('Conversations').get() 
    
    const feedbackQuerySnapshot = await feedbackQuery;

    const conversations = Object()

    

    const studentQuerySnapshot = await studentQuery;
    //creating the dictionary that maps student to a submission

    const students = Object()
    studentQuerySnapshot.forEach((studentDocument) => {
      students[studentDocument.id] = {
        id: studentDocument.id,
        name: studentDocument.data().First_Name,
        submissions: [],
      }
    });
    
    //getStudents().then(response => console.log('Students With Async/Await: ', response));
    //--------------Building submissions object----------------------
    const submissionsSnapshot = await submissionsQuery;

    const assignmentSnapshot = await assignmentQuery; 

    //const submissionStatus = Object();

    const assignments = Object();

    assignmentSnapshot.forEach((assignmentDoc) =>{
      assignments[assignmentDoc.id] = {
        id: assignmentDoc.id,
        dueDate: assignmentDoc.data().Date_Due,
        assignName: assignmentDoc.data().Description,
       // title: 
        //subs:[]
      }

    });

    feedbackQuerySnapshot.forEach((conversationDocument) => {
      conversations[conversationDocument.id] = {
        id: conversationDocument.id,
        feedback: conversationDocument.data().Comment_Preview

      }
    });

    submissionsSnapshot.forEach((submisionDocument) => {
      const submission = {
        id: submisionDocument.id,
        grade: submisionDocument.data().Current_Grade,
        //A Timestamp represents a point in time independent of any time zone or calendar, 
        //represented as seconds and fractions of seconds at nanosecond resolution in UTC Epoch time
        //compareTo(Timestamp other) - to compare two timestamps
        //need to find the assignment date
        submissionDate: submisionDocument.data().Date_Submitted,
        //subAssignID: submisionDocument.data().Assignment_ID
        assignment: assignments[submisionDocument.data().Assignment_ID],
        //------addig feedback---------
        //feedback: [] //first comment will do into the feedback session
        //feedback: "Nice",
        //need to find submission id that belongs to the conversation object 
        //feedback: conversations[submisionDocument.id].data().Comment_Preview
      };
      //will need to handle ass == null
      if(!submission.assignment){
      } else if(!submission.assignment.dueDate){
          submission.status = "NO DUE DATE"
      } else if (!submission.submissionDate) {
        submission.status = "NOT SUBMITTED";
      } else if (submission.submissionDate.nanoseconds > submission.assignment.dueDate.nanoseconds) {
          submission.status = "LATE";
      } else { 
        submission.status = "ON TIME";
      }


      //handle if the conversaation doesn't exist for a submission
      if(!conversations[submisionDocument.id]){
          submission.feedback = "No Feedback";
      } else {
        submission.feedback = conversations[submisionDocument.id].data().Comment_Preview
        console.log("Submissions feedback", submission.feedback)
      }

      


      const ids = Object.keys(submisionDocument.data().Owner_IDs); 

      ids.forEach((ownerId) => {
        const student = students[ownerId];
          student.submissions.push(submission)
        });

      //----------CURRENT DICTIONARY WORKING ON---------------------
      //this part returns undeffined fields in the console, need to find other way
      //submissionStatus[assignmentDoc] = {
       // assignDate: assignmentDoc.data().Date_Due,
        //submitedDate: assignment.submissionDate,  
      //}

    });

  return students;
}

getStudents().then(response => console.log("Students from Database",response));





// Boom! Even though we used Async/Await, we still know that this function is going to return a promise. So for 
// Demonstration purposes, we need to use a .then() chain in order to log our data arrays properly.
getStudents().then(response => console.log('Students With Async/Await: ', response));


export {getStudents}