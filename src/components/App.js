import React, { Component } from 'react';
import './App.css';
import firebase from '../firebase';
import Grid from './Grid';
import Form from './Form';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { contacts: [] };
  }

  updateData() {
    const db = firebase.firestore()
    const settings = { timestampsInSnapshot: true }
    db.settings(settings)
    db.collection('contacts').get()
      .then(snapshot => {
        let contacts = []
        snapshot.forEach(doc => {
          const contact = Object.assign({id: doc.id}, doc.data())
          contacts.push(contact)
          console.log(contact)
        })
        this.setState({contacts: contacts})
      })
      .catch(err => {
        console.log('Erreur : ', err)
      })
  }

  componentDidMount() {
    this.updateData()
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
          <Form />
          <Grid items={this.state.contacts} />
        </div>
      </div>
    );
  }
}

export default App;
