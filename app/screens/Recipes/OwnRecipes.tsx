import React from 'react';
import firebase from 'firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { MainContainer, RecipeCard } from '../../components';
import { IconButton } from 'react-native-paper';
import { addToCustomList, collectRecipe, deleteFood } from '../../functions';
import { View } from 'react-native';


interface OwnRecipesInterface {
	navigation: any,
	sharing?: string
}



const OwnRecipes: React.FC<OwnRecipesInterface> =({ navigation, sharing })  =>{
	const [ GetData, setGetData ]: any = React.useState(null);
	const query = firebase
		.firestore()
		.collection('Allrecipes')
		.doc(sharing ? sharing : firebase.auth().currentUser.uid)
		.collection('recipes')
		.orderBy('Name');
	const [ Food ]: any = useCollectionData(query, { idField: 'id' });

	React.useEffect(
		() => {
			setGetData(Food);
		},
		[ Food ]
	);

	return (
		<View style={{ flex: 1, width: '100%' }}>
			{GetData &&
				GetData.map((data, index) => (
					<RecipeCard key={index} navigation={navigation} data={data}>
						<IconButton
							color={'#000000'}
							size={25}
							icon="delete"
							onPress={() => deleteFood(data.Name, 'Allrecipes')}
						/>
						<IconButton color={'#000000'} size={25} icon="check" onPress={() => addToCustomList(data)} />
					</RecipeCard>
				))}
		</View>
	);
}

export default OwnRecipes;
