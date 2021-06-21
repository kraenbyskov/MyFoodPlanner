import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { MainContainer, RecipeCard } from '../../components';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { IconButton } from 'react-native-paper';
import { addToCustomList } from '../../functions';

const Dashboard = ({ currentUser, navigation }) => {
	const [ GetData, setGetData ]: any = React.useState(null);
	const query = firebase
		.firestore()
		.collection('Allrecipes')
		.doc(firebase.auth().currentUser.uid)
		.collection('recipes')
		.orderBy('Date', "desc").limit(3);
	const [ Food ]: any = useCollectionData(query);
	React.useEffect(
		() => {
			setGetData(Food);
		},
		[ Food ]
	);
	return (
		<MainContainer scroll={true}>
			<Text>Velkommen {currentUser && currentUser.name}</Text>
			<Text>Nye Opskrifter</Text>
			<View style={styles.Container}>
				{GetData &&
					GetData.map((data, index) => (
						<RecipeCard key={index} navigation={navigation} data={data}>
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
export default connect(mapStateToProps, null)(Dashboard);

const styles = StyleSheet.create({
	Container: {
		flex: 1,
		flexWrap: 'wrap',
		marginTop: 0
	}
});
