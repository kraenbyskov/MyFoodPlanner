import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { Button, MainContainer, RecipeCard } from '../../components';
import { View, StyleSheet, TouchableHighlight, Image } from 'react-native';
import { connect } from 'react-redux';

import firebase from 'firebase';
import { IconButton } from 'react-native-paper';
import { clearFoodList, collectRecipe, deleteFood } from '../../functions';
import { useCollectionData } from 'react-firebase-hooks/firestore';

function CustomList({ navigation }) {
	const [ GetData, setGetData ]: any = React.useState(null);
		const query = firebase
			.firestore()
			.collection('AddToCustomList')
			.doc(firebase.auth().currentUser.uid)
			.collection('recipes')
			.orderBy('Name');
		const [ Food ]: any = useCollectionData(query);
	
		React.useEffect(
			() => {
				setGetData(Food);
			},
			[ Food ]
		);
		console.log(GetData)
	return (
		<MainContainer scroll={true}>
			<View style={styles.ButtonView}>
				<Button icon="delete" style={{ width: '40%' }} onPress={() => clearFoodList()}>
					Clear List
				</Button>
				<Button icon="plus" style={{ width: '50%' }} onPress={() => navigation.navigate('Recipes')}>
					Tilføj flere
				</Button>
			</View>
			<View style={styles.Container}>
				{GetData &&
					GetData.map((data, index) => {
						return (
							<RecipeCard key={index} navigation={navigation} data={data}>
								<IconButton
									color={'#000000'}
									size={25}
									icon="delete"
									onPress={() => deleteFood(data.Name, 'AddToCustomList')}
								/>
							</RecipeCard>
						);
					})}
			</View>
		</MainContainer>
	);
}

const mapStateToProps = (store) => ({
	currentUser: store.userState.currentUser
});
export default connect(mapStateToProps, null)(CustomList);

const styles = StyleSheet.create({
	Container: {
		flex: 1,
		flexWrap: 'wrap',
		marginTop: 0
	},
	ButtonView: {
		flex: 1,
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-around'
	}
});
