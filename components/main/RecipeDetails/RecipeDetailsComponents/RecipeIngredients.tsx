import React from 'react';
import { Image, View, Text } from 'react-native';
import { Title } from 'react-native-paper';
import Button from '../../../styledComponents/Button';
import firebase from 'firebase';

const RecipeIngredients = ({ data }) => {
	const { Ingredienser, GetData, route } = data;

	const AddIngredien = () => {
		const db = firebase
			.firestore()
			.collection('Allrecipes')
			.doc(firebase.auth().currentUser.uid)
			.collection('recipes')
			.doc(route.params);
		if (GetData.Ingredienser) {
			db.update({
				Ingredienser: [ ...GetData.Ingredienser, 'Sukker' ]
			});
		} else {
			db.update({
				Ingredienser: [ 'Sukker' ]
			});
		}
	};

	return (
		<View style={{ flex: 1, width: '100%' }}>
			{Ingredienser && Ingredienser.map((data) => <Text>{data}</Text>)}
			<Button mode="contained" onPress={() => AddIngredien()}>
				Tilføj Ingrediens
			</Button>
		</View>
	);
};

export default RecipeIngredients;
