import React from 'react';
import { MainContainer, RecipeCard } from '../../components';
import firebase from 'firebase';
require('firebase/firestore');
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { IconButton } from 'react-native-paper';
import { addToCustomList, deleteFood } from '../../functions';

const setData = async (setGetData, currentUser) => {
	const AllData = [];
	const ownData = new Promise((resolve, reject) => {
		try {
			firebase
				.firestore()
				.collection('Allrecipes')
				.doc(firebase.auth().currentUser.uid)
				.collection('recipes')
				.onSnapshot((querySnapshot) => {
					const Data = [];
					querySnapshot.forEach((doc) => {
						Data.push(doc.data());
					});
					resolve(Data);
				});
		} catch (error) {
			reject([]);
		}
	});

	await ownData.then((data: string[]) => {
		data.map((mydata) => {
			AllData.push(mydata);
		});
	});

	const sharedData = new Promise((resolve, reject) => {
		try {
			firebase
				.firestore()
				.collection('Allrecipes')
				.doc(currentUser)
				.collection('recipes')
				.onSnapshot((querySnapshot) => {
					const Data = [];
					querySnapshot.forEach((doc) => {
						Data.push(doc.data());
					});
					resolve(Data);
				});
		} catch (error) {
			reject([]);
		}
	});
	await sharedData.then((data: string[]) => {
		data.map((mydata) => {
			AllData.push(mydata);
		});
	});

	await setGetData(AllData);
};

const List = ({ navigation, currentUser }) => {
	const [ GetData, setGetData ]: any = React.useState(null);

	setData(setGetData, currentUser.sharing);

	return (
		<MainContainer scroll={true}>
			<View style={styles.Container}>
				{GetData &&
					GetData.map((data, index) => (
						<RecipeCard key={index} navigation={navigation} data={data}>
							<IconButton
								color={'#000000'}
								size={25}
								icon="delete"
								onPress={() => deleteFood(data.Name, 'Allrecipes')}
							/>
							<IconButton
								color={'#000000'}
								size={25}
								icon="folder"
								onPress={() => addToCustomList(data)}
							/>
						</RecipeCard>
					))}
			</View>
		</MainContainer>
	);
};

const mapStateToProps = (store) => ({
	currentUser: store.userState.currentUser
});
export default connect(mapStateToProps, null)(List);

const styles = StyleSheet.create({
	Container: {
		flex: 1,
		flexWrap: 'wrap',
		marginTop: 0
	}
});
