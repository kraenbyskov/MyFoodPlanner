import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Button, LogOutButton, MainContainer, TextInput } from '../../components';
import { connect } from 'react-redux';
import firebase from 'firebase';

const Profile = ({ currentUser, navigation}) => {
	const [ userValue, setuserValue ] = useState({ value: '', error: '' });

	const shareListWith = (text) => {
		console.log(text);
		const searchUser = firebase.firestore().collection('users').where('name', '==', text);
		searchUser.get().then((snapshot) => {
			snapshot.forEach((data) => {
				const user = data.data();
				firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).update({
					sharing: data.id
				});
			});
		});
	};

	return (
		<MainContainer>
			<LogOutButton />

			<Text>User Profile</Text>
			<Text>{currentUser && currentUser.name}</Text>
			<Text>{currentUser && currentUser.email}</Text>

			<View style={{ flex: 1, width: '100%' }}>
				<TextInput
					label="Email"
					returnKeyType="next"
					value={userValue.value}
					onChangeText={(text) => setuserValue({ value: text, error: '' })}
					error={!!userValue.error}
					errorText={userValue.error}
					autoCapitalize="none"
					autoCompleteType="email"
					textContentType="emailAddress"
					keyboardType="email-address"
				/>
				<Button onPress={() => shareListWith(userValue.value)}>Share With</Button>
				<Button onPress={() => navigation.navigate('BugReport')}>Bug reporting</Button>
			</View>
		</MainContainer>
	);
};

const mapStateToProps = (store) => ({
	currentUser: store.userState.currentUser
});
export default connect(mapStateToProps, null)(Profile);
