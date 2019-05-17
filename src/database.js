
import * as firebase from 'firebase';
import 'firebase/firestore';

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

function getStudents() {

  db.collection('Databases').doc('Dev_Database').collection("Users").where("Role", "==", "Student")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        students.push(doc.data());
      });
    })
}


getStudents()






export default students;

