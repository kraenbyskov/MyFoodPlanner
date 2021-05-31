import { USER_STATE_CHANGE, CLEAR_DATA, GET_RECEPIES } from '../constants/index';
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
			console.log(snapshot);
			if (snapshot.exists) {
				dispatch({ type: USER_STATE_CHANGE, currentUser: snapshot.data() });
			} else {
				console.log('does not exist');
			}
		});
	};
}

export function GetRecipes(ID) {
	return (dispatch) => {
		firebase
			.firestore()
			.collection('Allrecipes')
			.doc(firebase.auth().currentUser.uid)
			.collection('recipes')
			.doc(ID)
			.get()
			.then((snapshot) => {
				dispatch({ type: GET_RECEPIES, recepiesState: snapshot.data() });
			});
	};
}
