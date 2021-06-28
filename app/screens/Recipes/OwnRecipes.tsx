import React from 'react';
import firebase from 'firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { MainContainer, RecipeCard } from '../../components';
import { IconButton } from 'react-native-paper';
import { View, Text } from 'react-native';
import { theme } from '../../core/theme';
import { deleteFood, addToCustomList} from "../../Redux/actions"


import { connect } from "react-redux";
import { bindActionCreators } from "redux";

interface OwnRecipesInterface {
	navigation: any;
	sharing?: string;
	deleteFood: ({id, collection}) => void
	addToCustomList: (data) => void
}

const OwnRecipes: React.FC<OwnRecipesInterface> = ({ navigation, sharing, deleteFood, addToCustomList }) => {
	const [ GetData, setGetData ]: any = React.useState(null);

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
							icon="delete"
							onPress={() => deleteFood({ id: data.Id, collection: 'Allrecipes' })}
						/>
						<IconButton
							color={theme.colors.secondary}
							size={25}
							icon="check"
							onPress={() => addToCustomList(data)}
						/>
					</RecipeCard>
				))}
		</View>
	);
};


const mapDispatchProps = (dispatch) => bindActionCreators({ deleteFood, addToCustomList }, dispatch)

export default connect(null, mapDispatchProps)(OwnRecipes)
