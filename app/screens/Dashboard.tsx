import React from 'react';
import { Text, View, SafeAreaView, StyleSheet } from 'react-native';
import { LogOutButton, MainContainer } from '../components';
import { connect } from 'react-redux';

const Dashboard = ({ currentUser }) => {
	return (
		<MainContainer>
			<LogOutButton />
			<Text>{currentUser && currentUser.name}</Text>
			<Text>{currentUser && currentUser.email}</Text>
		</MainContainer>
	);
};

const mapStateToProps = (store) => ({
	currentUser: store.userState.currentUser
});
export default connect(mapStateToProps, null)(Dashboard);
