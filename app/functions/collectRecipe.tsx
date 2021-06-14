import React from 'react';
import firebase from 'firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';

export default function collectRecipe() {
	const query = firebase
		.firestore()
		.collection('AddToCustomList')
		.doc(firebase.auth().currentUser.uid)
		.collection('recipes')
		.orderBy('Name');
	const [ Food ]: any = useCollectionData(query, { idField: 'id' });

	return Food;
}
