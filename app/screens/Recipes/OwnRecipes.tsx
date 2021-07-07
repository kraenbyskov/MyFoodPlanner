import React from 'react';
import firebase from 'firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { MainContainer, RecipeCard } from '../../components';
import { IconButton } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import { theme } from '../../core/theme';
import { deleteFood, addToCustomList } from '../../Redux/actions';
import { Button } from '../../components';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Dialog, Portal, TextInput as Input, List } from 'react-native-paper';
import { PickerComponent as Picker } from './PickerComponent';

const label = [ 'Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag', 'Søndag', 'ekstra' ];

interface OwnRecipesInterface {
	navigation: any;
	sharing?: string;
	deleteFood: ({ id, collection, recipe }) => void;
	addToCustomList: (data, day) => void;
}

const OwnRecipes: React.FC<OwnRecipesInterface> = ({ navigation, sharing, deleteFood, addToCustomList }) => {
	const [ GetData, setGetData ]: any = React.useState(null);
	const [ addToCustomListState, setAddToCustomListState ]: any = React.useState(null);

	const [ selectedValue, setSelectedValue ] = React.useState('');
	const [ visible, setVisible ] = React.useState(false);

	const addToCustomListDialog = (data) => {
		setVisible(true);
		setAddToCustomListState(data);
	};

	const hideDialog = () => setVisible(false);

	const addToCustomListButton = (data, day) => {
		addToCustomList(data, day);
		setVisible(false);
	};

	const query = firebase
		.firestore()
		.collection('Allrecipes')
		.where('Owner.UserID', '==', sharing ? sharing : firebase.auth().currentUser.uid);
	const [ Food ]: any = useCollectionData(query);

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
							color={theme.colors.secondary}
							size={25}
							icon="check"
							onPress={() => addToCustomListDialog(data)}
						/>
					</RecipeCard>
				))}

			<Portal>
				<Dialog visible={visible} onDismiss={hideDialog}>
					<Dialog.Title>Alert</Dialog.Title>
					<Dialog.Content>
						<View style={styles.inputfields}>
							<Picker setState={setSelectedValue} state={selectedValue} />
						</View>
					</Dialog.Content>
					<Dialog.Actions>
						<Button
							mode="contained"
							onPress={() => addToCustomListButton(addToCustomListState, selectedValue)}
						>
							Tilføj Ingrediens
						</Button>
					</Dialog.Actions>
				</Dialog>
			</Portal>
		</View>
	);
};

const mapDispatchProps = (dispatch) => bindActionCreators({ deleteFood, addToCustomList }, dispatch);

export default connect(null, mapDispatchProps)(OwnRecipes);

const styles = StyleSheet.create({
	inputfields: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	input: {
		flex: 1,
		width: '30%'
	}
});
