import React from 'react';
import { Text, View, SafeAreaView, StyleSheet } from 'react-native';
import { LogOutButton, MainContainer } from '../components';
import { connect } from 'react-redux';

const Dashboard = ({ currentUser }) => {
	return (
		<MainContainer>
			<Text>Dashboard</Text>
		</MainContainer>
	);
};

const mapStateToProps = (store) => ({
	currentUser: store.userState.currentUser
});
export default connect(mapStateToProps, null)(Dashboard);
