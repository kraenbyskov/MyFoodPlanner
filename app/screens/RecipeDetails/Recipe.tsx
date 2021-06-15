import React from 'react';
import { View } from 'react-native';
import MainContainer from '../../components/Organisms/MainContainer';
import firebase from 'firebase';
require('firebase/firestore');
import { Title } from 'react-native-paper';

import RecipeOwner from './RecipeOwner';
import RecipeBanner from './RecipeBanner';
import RecipeIngredients from './RecipeIngredients';
import RecipeDescription from './RecipeDescription';

import { useSelector, useDispatch } from 'react-redux';

export default function RecipeDetails({ route }) {
	const [ GetData, setGetData ]: any = React.useState(null);

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

	if (GetData) {
		const { Name, downloadUrl, Ingredienser } = GetData;
		return (
			<MainContainer scroll={true}>
				<RecipeBanner title={Name} image={downloadUrl} />
				<View
					style={{
						flex: 1,
						marginTop: 0
					}}
				>
					{/* <RecipeOwner />
					<RecipeDescription /> */}

					{/* <RecipeIngredients data={{ Ingredienser, GetData, route }} /> */}
				</View>
			</MainContainer>
		);
	} else {
		return <Title>No data</Title>;
	}
}
