import database from './database'

const studentsTest = [];
/*
function getStudents(){
  database.collection('Databases').doc('Dev_Database').collection('Users').where('Role', '==', 'Student')
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      studentsTest.push({
        id:      doc.id,
        firstName: doc.data().First_Name,
        lastName: doc.data().Last_Name,
    });
    });
  });
}


getStudents()
*/


export default studentsTest;
