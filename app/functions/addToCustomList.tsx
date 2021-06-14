import firebase from 'firebase';

const addToCustomList = (data) => {
	firebase
		.firestore()
		.collection('AddToCustomList')
		.doc(firebase.auth().currentUser.uid)
		.collection('recipes')
		.doc(data.Name)
		.set({
			Name: data.Name,
			downloadUrl: data.downloadUrl
		});
};

export default addToCustomList;
