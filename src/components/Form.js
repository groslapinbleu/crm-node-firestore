import React, { Component } from 'react';
import firebase from '../firebase'

class Form extends Component {

    updateData() {
        this.props.updateData()
    }

    addContact = (e) => {
        e.preventDefault()
        const newContact = {
            prenom: e.target.prenom.value,
            nom: e.target.nom.value,
            email: e.target.email.value,
            compagnie: e.target.compagnie.value,
            notes: e.target.notes.value
        }
        console.log(newContact)
        const db = firebase.firestore()
        db.collection('contacts').add(newContact)
            .then((docRef) => {
                console.log("Nouveau contact créé avec id: ", docRef.id);
                // remettre à zero le formulaire
                document.getElementById('addContact').reset()
                // NB : on aurait pu gérer un state pour ce composant Form et remettre le state à vide

                // raffraichir la page principale
                this.updateData()
            })
            .catch(err => {
                console.log("Erreur sur création d'un nouveau contact en base : ", err)
            })


    }

    render() {
        return (
            <div className="row">
                <form className="col s12" id="addContact" onSubmit={this.addContact}>
                    <div className="row">
                        <div className="input-field col s6">
                            <input id="prenom" type="text" className="validate" />
                            <label htmlFor="prenom">Prénom</label>
                        </div>
                        <div className="input-field col s6">
                            <input id="nom" type="text" className="validate" />
                            <label htmlFor="nom">Nom de famille</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s6">
                            <input id="email" type="text" className="validate" />
                            <label htmlFor="email">Email</label>
                        </div>
                        <div className="input-field col s6">
                            <input id="compagnie" type="text" className="validate" />
                            <label htmlFor="compagnie">Compagnie</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s8">
                            <input id="notes" type="text" className="validate" />
                            <label htmlFor="notes">Notes</label>
                        </div>
                        <div className="input-field col s4">
                            <button className="btn waves-effect waves-light" type="submit" name="action">Ajouter</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default Form;
