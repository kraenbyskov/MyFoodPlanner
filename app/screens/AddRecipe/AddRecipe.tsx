import * as React from 'react';
import { Text, View } from 'react-native';
import { TextInput, Button, MainContainer } from '../../components';
import firebase from 'firebase';
import AddRecipeImage from './AddRecipeImage';
import { DataTable, List } from 'react-native-paper';
import AddRecipeIngredients from './AddRecipeIngredients';
require('firebase/firestore');

const AddFoodToListScreen = (props) => {
	const [ title, setTitle ] = React.useState({ value: '', error: '' });

	const AddToList = async () => {
		const uri = props.route.params.image;
		const childPath = `post/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`;

		const response = await fetch(uri);
		const blob = await response.blob();

		const task = firebase.storage().ref().child(childPath).put(blob);

		const taskProgress = (snapshot) => {
			let percent = snapshot.bytesTransferred / snapshot.totalBytes * 100;
			console.log(percent + '% done');
		};

		const taskCompleted = () => {
			task.snapshot.ref.getDownloadURL().then((snapshot) => {
				firebase
					.firestore()
					.collection('Allrecipes')
					.doc(firebase.auth().currentUser.uid)
					.collection('recipes')
					.doc(title.value)
					.set({
						Name: title.value,
						downloadUrl: snapshot,
						Date: firebase.firestore.FieldValue.serverTimestamp()
					})
					.then(function() {
						props.navigation.popToTop();
					});
				setTitle({ value: '', error: '' });
			});
		};
		const taskError = (snapshot) => {
			console.log(snapshot);
		};

		task.on('state_changed', () => taskProgress, taskError, taskCompleted);
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

export default AddFoodToListScreen;
