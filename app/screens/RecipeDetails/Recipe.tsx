import React from 'react';
import { View, SafeAreaView, ScrollView, StatusBar, RefreshControl } from 'react-native';
import MainContainer from '../../components/Organisms/MainContainer';
import firebase from 'firebase';
require('firebase/firestore');
import { Title, IconButton } from 'react-native-paper';

import RecipeOwner from './RecipeOwner';
import RecipeBanner from './RecipeBanner';
import RecipeIngredients from './RecipeIngredients';
import RecipeDescription from './RecipeDescription';

import { Button } from '../../components';

export default function RecipeDetails({ route, navigation }) {
	const [ GetData, setGetData ]: any = React.useState(null);

	const db = firebase.firestore().collection('Allrecipes');

	const [ refreshing, setRefreshing ] = React.useState(false);

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		db.doc(route.params.Id).get().then((snapshot) => {
			setGetData(snapshot.data());
		});
		setRefreshing(false);
	}, []);

	React.useEffect(() => {
		db.doc(route.params.Id).get().then((snapshot) => {
			setGetData(snapshot.data());
		});
	}, []);

	const addToOwnList = () => {
		db
			.doc(`${firebase.auth().currentUser.uid}_${GetData.Name}`)
			.collection('recipes')
			.doc(route.params[0])
			.set(GetData);
	};

	if (GetData) {
		return (
			<SafeAreaView style={{ flex: 1 }}>
				<StatusBar barStyle={'light-content'} />

				<RecipeBanner Data={GetData} />

				{!firebase.auth().currentUser.uid === GetData.Owner.UserID ? (
					<Button onPress={() => addToOwnList()}>Add to my own</Button>
				) : null}
				<ScrollView
					style={{
						flex: 1,
						top: -40
					}}
					refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
				>
					<RecipeDescription Data={GetData} />
					<RecipeIngredients data={GetData} />
				</ScrollView>
			</SafeAreaView>
		);
	} else {
		return <Title>No data</Title>;
	}
}
