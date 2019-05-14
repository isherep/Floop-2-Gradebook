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

const students = [];
  function getNumStudents() {
    return students.length
  }


/*
  This entire function will run asynchronously and return a Promise that either resolves the value you intended to return
  or it will reject the promise if the condition fails and throw an error.
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
            id: studentDocument.data().Email,
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
  ES2017 Async/Await syntax. 
*/
const getStudentsAsynchronously = async () => {
  //same as the other function. Build the query, but this time, we are going to store it inside
  // it's own variable to help make everything a little more readable. 
  const studentQuery = db.collection('Databases').doc('Dev_Database')
    .collection('Users').where('Role', '==', 'Student');

  const studentQuerySnapshot = await studentQuery.get();

  const Assignment1Query = db.collection('Databases').doc('Dev_Database')
    .collection('Submissions');


  // declare the array that will store our custom objects
  const studentsArrayInAsync = [];


  // same as the function above, build our custom objects from the value that the .get() method resolves
  studentQuerySnapshot.forEach((studentDocument) => {
    studentsArrayInAsync.push({
      id: studentDocument.id,
      name: studentDocument.data().First_Name,
      a1: Assignment1Query,
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


/*
  This is your original function. 

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
        a1: 10,
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


export { getStudentsAsynchronously, getStudentsAsynchronouslyWithPromise, students, getStudents}