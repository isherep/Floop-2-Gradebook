import * as firebase from 'firebase';
import 'firebase/firestore';


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

  // It's best to avoid declaring variables in the global space whenever possible. This can lead to hair pulling when you
  // are trying to debug something and eventually realize that you've accidentally re-assigned a global variable inside of a
  // function block or some other block of code. Break things into functions that return the the value you are trying to get
  // whenever possible.

  // If we were to export our students array up here like this:
  //  
  // //  export const students = []  
  //
  // it would be the same as the export default students statement at the bottom of this file. This will resolve before any of
  // your other asynchronous code finishes running! Therefore exporting an empty array.
const students = [];

  function getNumStudents() {

    return students.length
  }


/*
  This entire function will run asynchronously and return a Promise that either resolves the value you intended to return
  or it will reject the promise if the condition fails and throw an error.

  The Firestore query library uses an asynchronous promise based API. This essentially means that we are telling the javascript
  runtime, "Hey, we want to fetch this data from somewhere, but we know it is going to take a while for the outside servers
  to respond to our request. So go ahead and fetch this data, but don't stop any other code in our program from running while you
  are out there fetching the data."

  Because we are calling the Firestore .get() function on our firestore query, which already returns a promise,
  We have to be careful how we structure the rest of our code in the getStudentsAsynchronouslyWithPromise function.
  When we mix asynchronous code with synchronous calls, inside of a synchronous function, we are almost always
  going to be bummed with the results. See the comments I've put above your original function 
  for an example of this. Those synchronous calls are going to resolve before our Promises/asynchronous calls
  resolved, often returning empty values, not building the objects we expect, and returning values in the wrong order.

  Take a look at the comments through this function that explain it step by step...

*/
const getStudentsAsynchronouslyWithPromise = function() {
  // Here we are already telling the runtime that this function will return a Promise. A Promise either
  // Resolves which returns the value we intended to get, or it fails with a Rejection that often returns with
  // some sort of error message.
  return new Promise(function(resolve, reject){
    // build the firestore query
    db.collection('Databases').doc('Dev_Database').collection('Users').where('Role', '==', 'Student')
      // this actually fetches the data requested in our query. This is the method in the firestore API that returns
      // a promise with the querySnapshot object that is returned
      .get()
      // this is part of the JavaScript Promise API. Basically, this is saying hey, when that promise above resolves,
      // THEN we need to do the following with the value.
      .then(function(studentQuerySnapshot){

        // declare the array that our custom objects will get pushed into
        const studentsArrayInPromise = [];
        
        // now that the promise is resolved, we need to process the data that was retrieved. In this case, we iterate
        // through every student Document that is returned, build a custom object for each one, and push it to our array
        studentQuerySnapshot.forEach(function(studentDocument){
          studentsArrayInPromise.push({
            id: studentDocument.id,
            name: studentDocument.data().First_Name,
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
        // Boom! we've created all our objects for each student and now we run a quick check to see if everything worked!
        // as long as there are objects in the array....
        if(studentsArrayInPromise.length > 0){
          // Then we resolve our promise. THIS IS THE VALUE THAT THE PROMISE RETURNS IF IT IS SUCCESSFUL
          resolve(studentsArrayInPromise);
        } else {
          // Otherwise, throw an error!
          reject(console.log(new Error('An error occurred while building the object')));
        }
      });
    });
  };

// runs the function, when the promise resolves, it will then log the value that is stored in the Promise's response.  
getStudentsAsynchronouslyWithPromise().then(response => console.log('With Promise: ', response));


/*
  This runs in exactly the same manner as the above function that returns the Promise, except in this function, we are using
  ES2017 Async/Await syntax. It is basically what is called syntactic sugar on top of the Promise API. The intent here
  is to make things a lot more readable and easier to follow. It also removes the potential for chaining promise 
  after promise after promise in our code.

  In this one, I stuck to es6 arrow function syntax to show you the difference in readability. There are some
  differences in how the javascript runtime interprets/compiles function expressions and arrow functions, but let's not
  worry too much about that right now.

  When we use the keyword async in front of the function declaration, we are telling the runtime "Hey, this function
  is going to return a promise, but we don't want to type out all that extra code, because it can get messy"

  Let's move on and I will comment step by step how this code runs inside the function...
*/
const getStudentsAsynchronously = async () => {
  //same as the other function. Build the query, but this time, we are going to store it inside
  // it's own variable to help make everything a little more readable. 
  const studentQuery = db.collection('Databases').doc('Dev_Database')
    .collection('Users').where('Role', '==', 'Student');

  // This is the second part to the Async/Await syntax. We know that the firestore .get() function is going to
  // run asynchronously and return a Promise that either resolves or rejects. But instead of using a .then() chain
  // on the end of .get() we are going to use the await keyword instead. This basically says "Hey, we know this firestore
  // method is going to return a promise so lets wait to run the rest of the code in this function 
  // until it completely resolves. When it's done, we can store the value in the variable on the left hand of the
  // assignment and then move on.
  const studentQuerySnapshot = await studentQuery.get();

  //pullig all submissions
  //const submissionQueryAss1 = db.collection('Databases').doc('Dev_Database')
  //.collection('Submissions').where('Assignment_ID', '==' ,'3F7F2ACA-C4F4-4239-88B7-D72AF6EC545C');

  //const ownerAssign = submissionQueryAss1;
  // declare the array that will store our custom objects
  const studentsArrayInAsync = [];
  const submissions = getSubmissions;

  // same as the function above, build our custom objects from the value that the .get() method resolves
  studentQuerySnapshot.forEach((studentDocument) => {
<<<<<<< Updated upstream
    
    studentsArrayInAsync.push({
      id: studentDocument.id,
      name: studentDocument.data().First_Name,
      a1: submissions.grade,
=======
    //searching for the submission with the curret student id
    

    
    const submissionQueryAss1 = db.collection('Databases').doc('Dev_Database')
    .collection('Submissions').where('Assignment_ID', '==' ,'3F7F2ACA-C4F4-4239-88B7-D72AF6EC545C');

    studentsArrayInAsync.push({
      
      id: studentDocument.id,
      name: studentDocument.data().First_Name,
      a1: submissionQueryAss1, //val().Current_Grade.where('studentDocument.id', '==', 'studentDocument.id'),
>>>>>>> Stashed changes
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
getStudentsAsynchronously().then(response => console.log('With Async/Await: ', response));
/* For later use for Assignments titles
async function getAssignments() {
  
  const assignmentsRef = db.collection('Databases').doc('Dev_Database').
    collection('Assignments');
  try {
    const assignments = []
    let assignmentsSnapshot = await assignmentsRef.get();
    assignmentsSnapshot.forEach((doc) => {
      assignments.push({
        id: doc.id,
        class: doc.data().Class_ID,
        title: doc.data().Title,
        description: doc.data().Description,
        status: doc.data().Status,
        date_Created: doc.data().Date_Created,
        date_Due: doc.data().Date_Due,
      })
    })
    return assignments;
  }
  catch(err) {
    console.log('getAssignments() error: ', err);
  }
}

*/

/**
 * Retrieves all submissions including only graded, isAssesed and owners id info
 */
const getSubmissions = async () => { 
  
  const submissionsRef = db.collection('Databases').doc('Dev_Database').collection('Submissions');

  const studentQuerySnapshot = await submissionsRef.get();
  
  try {
    const submissions = []
    let submissionsSnapshot = await submissionsRef.get();
    submissionsSnapshot.forEach((doc) => {
      submissions.push({
        id: doc.id,
        assignment: doc.data().Assignment_ID,
        grade: doc.data().Current_Grade, 
        assesed: doc.data().Assessed, 
        /*Owners are objects of each student or teacher */  
        owner: doc.data().Owner_IDs
      })
    })
    return submissions;
  }
  catch(err) {
    console.log('getSubmissions() error: ', err);
  }
}
/*
  This is your original function. This is a good example of how to give yourself a headache. I'm not dogging on you! This
  Stuff is really hard to wrap your head around!
  In a lot of the programming languages we have learned so far, we generally expect our code to run top down in the sequence
  that it was written. But not JavaScript. It needs to be fast and able to handle many tasks at once. That is the whole
  Idea between the JavaScript Asynchronous, Non-Blocking, runtime that Node.js and our browsers share alike. We don't want
  our browser to freeze up everytime a small piece of javascript is running! 

  Getting down to the nitty gritty, in this function we are mixing asynchronous calls with a synchronous function declaration.
  And don't forget that the students array is declared outside of this function block! Even if we were to declare:

  students = [];

  inside of this function block, the return statement would still run before the Firestore .get() function resolves it's promise,
  effectively returning an empty array again!

*/
function getStudents() {

  db.collection('Databases').doc('Dev_Database').collection("Users").where("Role", "==", "Student")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        students.push({
          id:   doc.data().Email,
          name: doc.data().First_Name,
          //dummy grades dat
        a1: getSubmissions.grade,
        a2: 10,
        a3: 10,
        a4: 10,
        a5: 10,
        a6: 10,
        a7: 10,
        a8: 10
        });
    });
})

}


// when you export your data down here, you are essentially doing the same as the export students I have in the comment above. 
// This module will immediatley export an empty array, before your asynchronous data fetching functions above finish.

// export default students


export { getStudentsAsynchronously, getStudentsAsynchronouslyWithPromise, getSubmissions, students, getStudents}