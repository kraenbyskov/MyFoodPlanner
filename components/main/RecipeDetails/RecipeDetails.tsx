import React from 'react';
import { View } from 'react-native';
import MainContainer from '../../styledComponents/MainContainer';
import firebase from 'firebase';
require('firebase/firestore');
import { Title } from 'react-native-paper';

import RecipeOwner from './RecipeDetailsComponents/RecipeOwner';
import RecipeBanner from './RecipeDetailsComponents/RecipeBanner';
import RecipeIngredients from './RecipeDetailsComponents/RecipeIngredients';
import RecipeDescription from './RecipeDetailsComponents/RecipeDescription';

export default function RecipeDetails({ route }) {
	const [ GetData, setGetData ]: any = React.useState(null);

	React.useEffect(() => {
		firebase
			.firestore()
			.collection('Allrecipes')
			.doc(firebase.auth().currentUser.uid)
			.collection('recipes')
			.doc(route.params)
			.get()
			.then((snapshot) => {
				setGetData(snapshot.data());
			});
	}, []);

	if (GetData) {
		const { Name, downloadUrl, Ingredienser } = GetData;
		return (
			<MainContainer fixTop={true} scroll={true}>
				<RecipeBanner title={Name} image={downloadUrl} />
				<View
					style={{
						flex: 1,
						marginTop: 0
					}}
				>
					<RecipeOwner />
					<RecipeDescription />

					<RecipeIngredients data={{ Ingredienser, GetData, route }} />
				</View>
			</MainContainer>
		);
	} else {
		return <Title>No data</Title>;
	}
}
