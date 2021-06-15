import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { LogOutButton, MainContainer } from '../../components';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const getUsers = (setState) => {
	const ref = firebase.firestore().collection('users');
	const onCollection = (querySnapshot) => {
		const Data = [];
		querySnapshot.forEach((doc) => {
			const { name } = doc.data();
			Data.push({
				id: doc.id,
				name
			});
			setState({ Data });
		});
	};
	ref.onSnapshot(onCollection);
};

const Profile = ({ currentUser }) => {
	const [ GetData, setGetData ]: any = useState([]);

	useEffect(() => {
		getUsers(setGetData);
	}, []);
	// const query = firebase.firestore().collection('users');
	// const [ Food ]: any = useCollectionData(query);

	// useEffect(
	// 	() => {
	// 		setGetData(Food);
	// 	},
	// 	[ Food ]
	// );

	// firebase.firestore().collection('users').onSnapshot((snapshot) => {
	// 	setGetData(snapshot);
	// });

	const shareListWith = (id) => {
		firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).update({
			sharing: id
		});
	};

	console.log(GetData);
	return (
		<MainContainer>
			<LogOutButton />

			<Text>User Profile</Text>
			<Text>{currentUser && currentUser.name}</Text>
			<Text>{currentUser && currentUser.email}</Text>

			<Text>share profile</Text>
			{GetData.Data &&
				GetData.Data.map((users) => <Text onPress={() => shareListWith(users.id)}>{users.name}</Text>)}
		</MainContainer>
	);
};

const mapStateToProps = (store) => ({
	currentUser: store.userState.currentUser
});
export default connect(mapStateToProps, null)(Profile);
