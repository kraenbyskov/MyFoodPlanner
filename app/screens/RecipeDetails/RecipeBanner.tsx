import React from 'react';
import { Image, View, StyleSheet, ImageBackground, Text } from 'react-native';
import { IconButton } from 'react-native-paper';
import { theme } from '../../core/theme';
import { Appbar, Paragraph, Dialog, Portal, TextInput as Input, List } from 'react-native-paper';
import { Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import firebase from 'firebase';
import { deleteFood, addToCustomList, EditRecipe } from '../../Redux/actions';
import { Button } from '../../components';
import { LinearGradient } from 'expo-linear-gradient';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const RecipeBanner = ({ Data, deleteFood, addToCustomList, EditRecipe }) => {
	const { Name, downloadUrl, description, Id } = Data;

	const [ visible, setVisible ] = React.useState(false);

	const showDialog = () => setVisible(true);

	const hideDialog = () => setVisible(false);

	const [ title, setTitle ] = React.useState({ value: Name, error: '' });
	const [ stateDescription, setStateDescription ] = React.useState({ value: description, error: '' });

	const navigation = useNavigation();

	const deleteAndNavigateBack = () => {
		deleteFood({ id: Id, collection: 'Allrecipes' });
		navigation.goBack();
	};

	const EditRecipeButton = ({ id, Name, description }) => {
		EditRecipe({ id, Name, description });
		hideDialog();
	};

	return (
		<ImageBackground source={{ uri: downloadUrl }} style={styles.image}>
			<LinearGradient style={styles.gradient} colors={[ 'rgba(0,0,0,0.8)', 'transparent' ]}>
				<Appbar style={styles.Appbar}>
					{navigation.canGoBack() ? (
						<Appbar.Action
							icon={() => <MaterialCommunityIcons color={'white'} name={'arrow-left-thick'} size={26} />}
							onPress={() => navigation.goBack()}
						/>
					) : null}
					<Appbar.Content title="" />
					<IconButton color={'#FFFFFF'} size={25} icon="delete" onPress={() => deleteAndNavigateBack()} />
					<IconButton color={'#FFFFFF'} size={25} icon="check" onPress={() => addToCustomList(Data)} />
					<IconButton color={'#FFFFFF'} size={25} icon="pencil-outline" onPress={() => showDialog()} />
				</Appbar>
				<Portal>
					<Dialog visible={visible} onDismiss={hideDialog}>
						<Dialog.Title>Rediger indhold</Dialog.Title>
						<Dialog.ScrollArea>
							<Dialog.Content>
								<Input
									style={{ backgroundColor: theme.colors.surface }}
									underlineColor="transparent"
									theme={{ colors: { primary: theme.colors.primary } }}
									mode="flat"
									label="Title"
									returnKeyType="next"
									value={title.value}
									onChangeText={(text) => setTitle({ value: text, error: '' })}
									error={!!title.error}
								/>
								<Input
									style={{ backgroundColor: theme.colors.surface }}
									underlineColor="transparent"
									theme={{ colors: { primary: theme.colors.primary } }}
									mode="flat"
									label="Title"
									returnKeyType="next"
									value={stateDescription.value}
									onChangeText={(text) => setStateDescription({ value: text, error: '' })}
									error={!!stateDescription.error}
								/>
							</Dialog.Content>
						</Dialog.ScrollArea>
						<Dialog.Actions>
							<Button
								mode="contained"
								onPress={() =>
									EditRecipeButton({
										id: Id,
										Name: title.value,
										description: stateDescription.value
									})}
							>
								Rediger
							</Button>
						</Dialog.Actions>
					</Dialog>
				</Portal>
			</LinearGradient>
		</ImageBackground>
	);
};

const mapDispatchProps = (dispatch) => bindActionCreators({ deleteFood, addToCustomList, EditRecipe }, dispatch);

export default connect(null, mapDispatchProps)(RecipeBanner);
const styles = StyleSheet.create({
	Appbar: {
		backgroundColor: 'transparent',
		shadowOpacity: 0,
		top: 50
	},
	gradient: {
		height: 350,
		top: -50
	},
	image: {
		width: '100%',
		height: 350,
		top: -50,
		paddingTop: 50
	}
});
