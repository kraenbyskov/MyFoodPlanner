import React from 'react';
import Button from '../Atoms/Button';
import firebase from 'firebase';

export default function LogOutButton() {
	const onLogout = () => {
		firebase.auth().signOut();
	};

	return (
		<Button mode="contained" onPress={() => onLogout()}>
			Log Out
		</Button>
	);
}
