import React from 'react';
import firebase from '../firebase'

const Single = (props) => {
    const handleClick = () => {
        const id = props.item.id
        // supprimer l'info en bdd
        console.log('Suppression du contact avec id=', id)
        const db = firebase.firestore()
        db.collection('contacts').doc(id).delete()
            .then(() => {
                console.log("Suppression du contact effectuée en base, id=", id)
            })
            .catch(err => {
                console.log("Erreur sur suppression d'un contact en base : ", err)
            })

    }
    return (
        <li className="col s12 l6">
            <div className="card">
                <div className="card-image">
                    <img src="./portrait.jpg" alt={props.item.title} />
                    <span className="card-title">{props.item.prenom} {props.item.nom} - {props.item.compagnie}</span>
                </div>
                <div className="card-content">
                    <span className="card-title">{props.item.email}</span>
                    <div className="row">
                        <div className="col l6 center">
                            <blockquote><h5>{props.item.notes}</h5></blockquote>
                        </div>
                    </div>
                </div>
                <div className="card-action">
                    <button className="waves-effect waves-light btn red darken-4" onClick={handleClick} >Supprimer</button>
                </div>
            </div>
        </li>
    );
}

export default Single;
