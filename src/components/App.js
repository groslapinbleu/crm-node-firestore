import React, { Component } from 'react';
import './App.css';
import firebase from '../firebase';
import Grid from './Grid';
import Form from './Form';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { contacts: [], unsubscribe: null };
    this.updateData = this.updateData.bind(this)
    this.subscribeToData = this.subscribeToData.bind(this)

  }

  updateData() {
    console.log('updateData')

    const db = firebase.firestore()
    db.collection('contacts').get()
      .then(snapshot => {
        let contacts = []
        snapshot.forEach(doc => {
          const contact = Object.assign({ id: doc.id }, doc.data())
          contacts.push(contact)
          console.log(contact)
        })
        this.setState({ contacts: contacts })
      })
      .catch(err => {
        console.log('Erreur sur la lecture des contacts en base : ', err)
      }) 
  }

  subscribeToData() {
    console.log('subscribeToData')
    const db = firebase.firestore()
    const unsubscribe = db.collection('contacts')
      .onSnapshot(snapshot => {
        console.log('subscribeToData.onSnapshot')

        let contacts = []
        snapshot.forEach(doc => {
          const contact = Object.assign({ id: doc.id }, doc.data())
          contacts.push(contact)
          console.log(contact)
        })
        this.setState({ contacts: contacts })
      })
    this.setState({ unsubscribe: unsubscribe })
  }

  componentDidMount() {
    // this.updateData()
    this.subscribeToData()
  }

  componentWillUnmount() {
    this.state.unsubscribe()
  }


  render() {
    return (
      <div>
        <div className="navbar-fixed">
          <nav className="blue lighten-2">
            <div className="nav-wrapper">
              <a href="/" className="brand-logo center">Contacts</a>
            </div>
          </nav>
        </div>
        <div>
          <Form  />
          <Grid items={this.state.contacts}  />
        </div>
      </div>
    );
  }
}

export default App;
