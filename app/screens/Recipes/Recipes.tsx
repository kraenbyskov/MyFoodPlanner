import React from 'react';
import MainContainer from '../../components/Organisms/MainContainer';
import firebase from 'firebase';
require('firebase/firestore');
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { View, StyleSheet, TouchableHighlight, Image, Text } from 'react-native';

import { IconButton } from 'react-native-paper';
import { addToCustomList, deleteFood } from '../../functions';

export default function List({ navigation }) {
	const [ GetData, setGetData ]: any = React.useState(null);

	const query = firebase
		.firestore()
		.collection('Allrecipes')
		.doc(firebase.auth().currentUser.uid)
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
		<MainContainer scroll={true}>
			<View style={styles.Container}>
				{GetData &&
					GetData.map((data) => (
						<TouchableHighlight
							style={styles.Card}
							key={data.Name}
							onPress={() => navigation.navigate('RecipeDetails', data.Name)}
						>
							<View style={styles.Content}>
								<Image
									style={styles.RecipeImage}
									source={
										data.downloadUrl ? (
											{ uri: data.downloadUrl }
										) : (
											require('../../assets/photo-1512621776951-a57141f2eefd.png')
										)
									}
								/>
								<View style={{ width: '100%' }}>
									<Text style={styles.Title}>{data.Name}</Text>
								</View>

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
							</View>
						</TouchableHighlight>
					))}
			</View>
		</MainContainer>
	);
}

const styles = StyleSheet.create({
	Container: {
		flex: 1,
		flexWrap: 'wrap',
		marginTop: 0
	},
	Content: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '50%',
		borderRadius: 20
	},
	Title: {
		marginLeft: 20,
		fontSize: 24
	},
	RecipeImage: {
		marginLeft: 10,
		width: 60,
		height: 60,
		borderRadius: 50
	},
	Card: {
		width: '100%',
		height: 80,
		backgroundColor: 'white',
		borderRadius: 20,
		marginBottom: 20,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 3
		},
		shadowOpacity: 0.06,
		shadowRadius: 3.68,

		elevation: 10
	}
});
