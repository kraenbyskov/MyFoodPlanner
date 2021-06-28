import { USER_STATE_CHANGE, CLEAR_DATA, DELETE_RECIPE, ADD_TO_CUSTOM_LIST, EDIT_RECIPE } from '../constants/index';
import firebase from 'firebase';
require('firebase/firestore');

export function clearData() {
	return (dispatch) => {
		dispatch({ type: CLEAR_DATA });
	};
}
export function fetchUser() {
	return (dispatch) => {
		firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).get().then((snapshot) => {
			if (snapshot.exists) {
				dispatch({ type: USER_STATE_CHANGE, currentUser: snapshot.data() });
			} else {
				console.log('does not exist');
			}
		});
	};
}

export const deleteFood = ({ id, collection }) => {
	return (dispatch) => {
		firebase.firestore().collection(collection).doc(id).delete();
		dispatch({ type: DELETE_RECIPE, Message: 'Opskrift slettet' });
	};
};

export const addToCustomList = (data) => {
	return (dispatch) => {
		firebase
			.firestore()
			.collection('AddToCustomList')
			.doc(firebase.auth().currentUser.uid)
			.collection('recipes')
			.doc(data.Name)
			.set({
				Name: data.Name,
				downloadUrl: data.downloadUrl,
				Owner: data.Owner
			});
		dispatch({ type: ADD_TO_CUSTOM_LIST, Message: `${data.Name} tilføjet til liste` });
	};
};

export const EditRecipe = ({ id, Name, description }) => {
	return (dispatch) => {
		const db = firebase.firestore().collection('Allrecipes').doc(id);

		db.update({
			Name: Name,
			description: description
		});
		dispatch({ type: EDIT_RECIPE, Message: `${Name} Er blevet ændret` });
	};
};
