import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { Button, AppBar, RecipeCard } from '../../components';
import { View, StyleSheet, SafeAreaView, Image, StatusBar, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import firebase from 'firebase';
import { IconButton } from 'react-native-paper';
import { clearFoodList } from '../../functions';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { bindActionCreators } from 'redux';
import { deleteFromstCustomList } from '../../Redux/actions';

function CustomList({ navigation, deleteFromstCustomList }) {
	const [ GetData, setGetData ]: any = React.useState(null);

	const query = firebase
		.firestore()
		.collection('AddToCustomList')
		.doc(firebase.auth().currentUser.uid)
		.collection('CustomList')
		.orderBy('Name');
	const [ Food ]: any = useCollectionData(query);

	React.useEffect(
		() => {
			setGetData(Food);
		},
		[ Food ]
	);

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<AppBar />
			<View style={styles.ButtonView}>
				<Button icon="delete" style={{ width: '40%' }} onPress={() => clearFoodList()}>
					Clear List
				</Button>
				<Button icon="plus" style={{ width: '50%' }} onPress={() => navigation.navigate('Recipes')}>
					Tilføj flere
				</Button>
			</View>
			<ScrollView style={styles.container}>
				<View style={styles.content}>
					<Text>7 Dags Plan</Text>
					{GetData &&
						GetData.slice(0, 7).map((data, index) => {
							console.log(data);
							return (
								<View key={index}>
									<Text>{data.day}</Text>
									<RecipeCard navigation={navigation} data={data}>
										<IconButton
											color={'#000000'}
											size={25}
											icon="delete"
											onPress={() =>
												deleteFromstCustomList({
													id: data.Id,
													collection: 'AddToCustomList',
													recipe: data.Name
												})}
										/>
									</RecipeCard>
								</View>
							);
						})}

					<Text>ekstra</Text>
					{GetData &&
						GetData.slice(7, 100).map((data, index) => {
							return (
								<RecipeCard key={index} navigation={navigation} data={data}>
									<IconButton
										color={'#000000'}
										size={25}
										icon="delete"
										onPress={() =>
											deleteFromstCustomList({
												id: data.Id,
												collection: 'AddToCustomList',
												recipe: data.Name
											})}
									/>
								</RecipeCard>
							);
						})}
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

const mapStateToProps = (store) => ({
	currentUser: store.userState.currentUser
});

const mapDispatchProps = (dispatch) => bindActionCreators({ deleteFromstCustomList }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(CustomList);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: '100%',
		alignSelf: 'center',
		marginBottom: 50
	},
	content: {
		padding: 20,
		paddingBottom: 40
	},

	ButtonView: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-around'
	}
});
