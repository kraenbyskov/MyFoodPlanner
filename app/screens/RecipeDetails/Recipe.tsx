import React from 'react';
import { View } from 'react-native';
import MainContainer from '../../components/Organisms/MainContainer';
import firebase from 'firebase';
require('firebase/firestore');
import { Title } from 'react-native-paper';
import { IconButton } from 'react-native-paper';

import { addToCustomList, collectRecipe, deleteFood } from '../../functions';

import RecipeOwner from './RecipeOwner';
import RecipeBanner from './RecipeBanner';
import RecipeIngredients from './RecipeIngredients';
import RecipeDescription from './RecipeDescription';

import { useSelector, useDispatch } from 'react-redux';
import { Button } from '../../components';

export default function RecipeDetails({ route, navigation }) {
	const [ GetData, setGetData ]: any = React.useState(null);

	const db = firebase.firestore().collection('Allrecipes');

	React.useEffect(() => {
		db.doc(route.params.Owner + route.params.Name).get().then((snapshot) => {
			setGetData(snapshot.data());
		});
	}, []);
	const addToOwnList = () => {
		db.doc(firebase.auth().currentUser.uid).collection('recipes').doc(route.params[0]).set(GetData);
	};

	const deleteAndNavigateBack = (Owner, name) => {
		deleteFood(Owner + name, 'Allrecipes');
		navigation.goBack();
	};

	if (GetData) {
		const { Owner, Name, downloadUrl, Ingredienser } = GetData;
		return (
			<MainContainer scroll={true}>
				<View>
					<IconButton
						color={'#000000'}
						size={25}
						icon="delete"
						onPress={() => deleteAndNavigateBack(Owner, Name)}
					/>
					<IconButton color={'#000000'} size={25} icon="check" onPress={() => addToCustomList(GetData)} />
				</View>
				<Button onPress={() => addToOwnList()}>Add to my own</Button>
				<RecipeBanner title={Name} image={downloadUrl} />
				<View
					style={{
						flex: 1,
						marginTop: 0
					}}
				>
					<RecipeOwner />
					<RecipeDescription />

					{/* <RecipeIngredients data={{ Ingredienser, GetData, route }} /> */}
				</View>
			</MainContainer>
		);
	} else {
		return <Title>No data</Title>;
	}
}
