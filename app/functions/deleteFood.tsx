import firebase from 'firebase';

const deleteFood = (Name, collection) => {
	console.log(Name);
	firebase.firestore().collection(collection).doc(Name).delete();
};

export default deleteFood;
