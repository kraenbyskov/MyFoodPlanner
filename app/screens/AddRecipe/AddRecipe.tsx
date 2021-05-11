import * as React from 'react';
import { Text, View, StyleSheet, Image, SafeAreaView, TouchableHighlight } from 'react-native';
import { TextInput, Button, MainContainer } from '../../components';
import firebase from 'firebase';
import AddRecipeImage from './AddRecipeImage';
import { DataTable, List } from 'react-native-paper';
require('firebase/firestore');

const AddRecipeIngredients = () => {
	const [ title, setTitle ] = React.useState({ value: '', error: '' });

	const DataTableArra = [
		{
			name: 'Beef Stock',
			volume: 450,
			type: 'gram'
		},
		{
			name: 'Ost',
			volume: 450,
			type: 'gram'
		},
		{
			name: 'Pasta',
			volume: 450,
			type: 'gram'
		}
	];

	return (
		<View style={{ flex: 1, width: '100%' }}>
			<Text>Ingredients</Text>
			<View>
				<DataTable>
					{DataTableArra.map((data) => (
						<DataTable.Header>
							<DataTable.Title>{data.name}</DataTable.Title>
							<DataTable.Title numeric>{data.volume}</DataTable.Title>
							<DataTable.Title numeric>{data.type}</DataTable.Title>
						</DataTable.Header>
					))}
				</DataTable>
			</View>
		</View>
	);
};

const AddFoodToListScreen = (props) => {
	const [ title, setTitle ] = React.useState({ value: '', error: '' });

	const AddToList = async () => {
		firebase
			.firestore()
			.collection('Allrecipes')
			.doc(firebase.auth().currentUser.uid)
			.collection('recipes')
			.doc(title.value)
			.set({
				Name: title.value,
				Date: new Date()
			});
		setTitle({ value: '', error: '' });

		const uri = props.route.params.image;
		const childPath = `post/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`;

		const response = await fetch(uri);
		const blob = await response.blob();

		const task = firebase.storage().ref().child(childPath).put(blob);

		const taskProgress = (snapshot) => {
			console.log(`transferred: ${snapshot.bytesTransferred}`);
		};

		const taskCompleted = () => {
			task.snapshot.ref.getDownloadURL().then((snapshot) => {
				savePostData(snapshot);
			});
		};

		const taskError = (snapshot) => {
			console.log(snapshot);
		};

		task.on('state_changed', taskProgress, taskError, taskCompleted);
	};

	const savePostData = (downloadUrl) => {
		firebase
			.firestore()
			.collection('Allrecipes')
			.doc(firebase.auth().currentUser.uid)
			.collection('recipes')
			.doc(title.value)
			.set({
				Name: title.value,
				downloadUrl,
				Date: firebase.firestore.FieldValue.serverTimestamp()
			})
			.then(function() {
				props.navigation.popToTop();
			});
	};

	return (
		<MainContainer scroll={true}>
			<AddRecipeImage route={props.route} navigation={props.navigation} />

			<Text>Add Recipe</Text>

			<TextInput
				label="Title"
				returnKeyType="next"
				value={title.value}
				onChangeText={(text) => setTitle({ value: text, error: '' })}
				error={!!title.error}
				errorText={title.error}
			/>
			<View style={{ flex: 1, width: '100%' }}>
				<List.AccordionGroup>
					<List.Accordion title="Difficulty" id="1">
						<List.Item title="Item 1" />
					</List.Accordion>
					<List.Accordion title="Tid" id="2">
						<List.Item title="Item 2" />
					</List.Accordion>
				</List.AccordionGroup>
			</View>
			<AddRecipeIngredients />

			<Button mode="contained" onPress={AddToList}>
				Tilføj
			</Button>
		</MainContainer>
	);
};

const styles = StyleSheet.create({
	CaptureImage: {
		width: 200,
		height: 200,
		borderRadius: 200,
		marginBottom: 40
	},
	RecipeImage: {
		width: 200,
		height: 200,
		borderRadius: 200
	}
});

export default AddFoodToListScreen;
