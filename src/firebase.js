import firebase from 'firebase/app'

import 'firebase/firestore'

const config = {
    apiKey: "AIzaSyBPpD6bMmI_mDiBYgalCVMjP74_oNNiJJA",
    authDomain: "crm-react-node.firebaseapp.com",
    databaseURL: "https://crm-react-node.firebaseio.com",
    projectId: "crm-react-node",
    storageBucket: "crm-react-node.appspot.com",
    messagingSenderId: "606517830621"
  }

  firebase.initializeApp(config)

  export default firebase
