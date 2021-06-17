import React, { useEffect } from 'react';
import { MainContainer, RecipeCard } from '../../components';
require('firebase/firestore');
import { Text, View, StyleSheet, RefreshControl, SafeAreaView, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';

import { IconButton } from 'react-native-paper';
import { addToCustomList, collectRecipe, deleteFood } from '../../functions';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import OwnRecipes from './OwnRecipes';

const List = ({ navigation, currentUser }) => {
	console.log(currentUser.sharing)
	return (
		<MainContainer scroll={true}>
			<View style={styles.Container}>
				<Text>Own Recipes</Text>
				<OwnRecipes navigation={navigation} />
				{currentUser ? 
				<>
				<Text>Shared Recipes</Text>
				<OwnRecipes navigation={navigation} sharing={currentUser.sharing} />
				</>
				 : null}
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
