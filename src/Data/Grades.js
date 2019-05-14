
import 'firebase/firestore';
//import { students, getStudentsAsynchronously } from './Data/database'

console.log("Get Students Asynchronously", getStudentsAsynchronously);


// import our functions from database.js and log them again.

/*
* Put all student owner's ID in an array
*import * as firebase from 'firebase';
*/
/*Get student object from the db*/ 

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
  
    // declare the array that will store our custom objects
    const studentsArrayInAsync = [];
  
    // same as the function above, build our custom objects from the value that the .get() method resolves
    studentQuerySnapshot.forEach((studentDocument) => {
      studentsArrayInAsync.push({
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
  
    return studentsArrayInAsync;
  }
  // Boom! Even though we used Async/Await, we still know that this function is going to return a promise. So for 
  // Demonstration purposes, we need to use a .then() chain in order to log our data arrays properly.
  getStudentsAsynchronously().then(response => console.log('With Async/Await: ', response));