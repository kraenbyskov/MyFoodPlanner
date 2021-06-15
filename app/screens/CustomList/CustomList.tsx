import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { Button, MainContainer, RecipeCard } from '../../components';
import { View, StyleSheet, TouchableHighlight, Image } from 'react-native';

import firebase from 'firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { IconButton } from 'react-native-paper';
import { clearFoodList, deleteFood } from '../../functions';

function CustomList({ navigation }) {
	const [ GetData, setGetData ]: any = useState([]);

	const query = firebase
		.firestore()
		.collection('AddToCustomList')
		.doc(firebase.auth().currentUser.uid)
		.collection('recipes');
	const [ Food ]: any = useCollectionData(query, { idField: 'id' });

	useEffect(
		() => {
			setGetData(Food);
		},
		[ Food ]
	);

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
					GetData.map((data, index) => (
						<RecipeCard key={index} navigation={navigation} data={data}>
							<IconButton
								color={'#000000'}
								size={25}
								icon="delete"
								onPress={() => deleteFood(data.Name, 'AddToCustomList')}
							/>
						</RecipeCard>
					))}
			</View>
		</MainContainer>
	);
}

export default CustomList;

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
