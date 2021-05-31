import React from 'react';
import { Text, View } from 'react-native';
import { LogOutButton, MainContainer } from '../../components';
import { connect } from 'react-redux';

const Profile = ({ currentUser }) => {
	console.log(currentUser);
	return (
		<MainContainer>
			<LogOutButton />

			<Text>User Profile</Text>
			<Text>{currentUser && currentUser.name}</Text>
			<Text>{currentUser && currentUser.email}</Text>
		</MainContainer>
	);
};

const mapStateToProps = (store) => ({
	currentUser: store.userState.currentUser
});
export default connect(mapStateToProps, null)(Profile);
