import firebase from 'firebase';

const clearFoodList = () => {
	firebase
		.firestore()
		.collection('AddToCustomList')
		.doc(firebase.auth().currentUser.uid)
		.collection('recipes')
		.get()
		.then((res) => {
			res.forEach((element) => {
				element.ref.delete();
			});
		});
};

export default clearFoodList;
