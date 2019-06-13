import * as firebase from 'firebase';
import 'firebase/firestore';

firebase.initializeApp(config);

let db = firebase.firestore();

const getConversations = async () => {
  const feedbackQuery = db.collection('Databases').doc('Dev_Database').collection('Conversations').get();
}

const conversations = Object()
conversationsSnapshot.forEach((conversationDoc) => {
  conversations[conversationDoc.id] = {
    id: conversationDoc.id,
    //now find the assignment its related to
    submitID: conversationDoc.Submission_ID, //or whatever field there shows submission number
    feedback: conversationDoc.Comment_Preview,
  }
  console.log("Conversations: ", conversations[conversation.id])
});

function getCommentPreview() {

  db.collection('Databases').doc('Dev_Database').collection("Conversations").where("Comment_Preview")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        students.push(doc.data());
      });
    })
}

getCommentPreview()

export default
