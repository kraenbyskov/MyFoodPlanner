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
	console.log(route.params[0], route.params[1]);
	React.useEffect(() => {
		firebase
			.firestore()
			.collection('Allrecipes')
			.doc(route.params[1])
			.collection('recipes')
			.doc(route.params[0])
			.get()
			.then((snapshot) => {
				setGetData(snapshot.data());
			});
	}, []);

	const addToOwnList = () => {
		firebase
		.firestore()
		.collection('Allrecipes')
		.doc(firebase.auth().currentUser.uid)
		.collection('recipes')
		.doc(route.params[0])
		.set(GetData)
	}



	const deleteAndNavigateBack = (name) => {
		deleteFood(name, 'Allrecipes')
		navigation.goBack()

	}



	if (GetData) {
		const { Name, downloadUrl, Ingredienser } = GetData;
		return (
			<MainContainer scroll={true}>
				<View>
				<IconButton
							color={'#000000'}
							size={25}
							icon="delete"
							onPress={() => deleteAndNavigateBack(Name)}
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
