import firebase from 'firebase';

const deleteFood = (Name, collection) => {
	firebase
		.firestore()
		.collection(collection)
		.doc(firebase.auth().currentUser.uid)
		.collection('recipes')
		.doc(Name)
		.delete();
};

export default deleteFood;
