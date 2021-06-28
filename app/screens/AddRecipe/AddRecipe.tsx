import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { TextInput, Button, MainContainer } from '../../components';
import firebase from 'firebase';
import AddRecipeImage from './AddRecipeImage';
import { List } from 'react-native-paper';
import AddRecipeIngredients from './AddRecipeIngredients';
require('firebase/firestore');
import { connect } from 'react-redux';
import { Snackbar } from 'react-native-paper';

const style = StyleSheet.create({
	Content: {
		flex: 1,
		width: '100%',
		borderColor: 'orange',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	barStyle: {
		backgroundColor: 'green',
		top: 0,
		flex: 1
	}
});

const AddFoodToListScreen = (props) => {
	const [ visible, setVisible ] = React.useState(false);
	const [ loading, setLoading ] = React.useState(0);
	const onDismissSnackBar = () => setVisible(false);

	const [ title, setTitle ] = React.useState({ value: '', error: '' });
	const AddToList = async () => {
		const uri = props.route.params.image;
		const childPath = `post/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`;

		const response = await fetch(uri);
		const blob = await response.blob();

		const task = firebase.storage().ref().child(childPath).put(blob);

		const taskProgress = (snapshot) => {
			let percent = snapshot.bytesTransferred / snapshot.totalBytes * 100;
			setVisible(true);
			setLoading(percent);
		};

		const taskCompleted = () => {
			task.snapshot.ref.getDownloadURL().then((snapshot) => {
				const db = firebase.firestore().collection('Allrecipes');
				db
					.doc(`${firebase.auth().currentUser.uid}_${title.value}`)
					.set({
						Id: `${firebase.auth().currentUser.uid}_${title.value}`,
						Name: title.value,
						downloadUrl: snapshot,
						Date: firebase.firestore.FieldValue.serverTimestamp(),
						Owner: {
							User: props.currentUser.name,
							UserID: firebase.auth().currentUser.uid
						},
						CookingTime: '',
						Calories: ''
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
			<View style={style.Content}>
				<AddRecipeImage route={props.route} navigation={props.navigation} />

				<Text>Tilføj ny Opskrift</Text>

				<TextInput
					label="Navn"
					returnKeyType="next"
					value={title.value}
					onChangeText={(text) => setTitle({ value: text, error: '' })}
					error={!!title.error}
					errorText={title.error}
				/>
				<View style={{ marginTop: 30, flex: 1, width: '100%' }}>
					<Button mode="contained" onPress={AddToList}>
						Tilføj
					</Button>
				</View>
			</View>
			<Snackbar
				style={style.barStyle}
				visible={visible}
				onDismiss={onDismissSnackBar}
				duration={700}
				action={{
					label: 'Undo',
					onPress: () => {
						setVisible(false);
					}
				}}
			>
				{loading}
			</Snackbar>
		</MainContainer>
	);
};

const mapStateToProps = (store) => ({
	currentUser: store.userState.currentUser
});
export default connect(mapStateToProps, null)(AddFoodToListScreen);
