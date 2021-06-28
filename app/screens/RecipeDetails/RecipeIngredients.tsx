import React from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';
import { Title } from 'react-native-paper';
import firebase from 'firebase';
import { Picker } from '@react-native-picker/picker';
import { Paragraph, Dialog, Portal, TextInput as Input, List } from 'react-native-paper';
import { Button } from '../../components';
import { theme } from '../../core/theme';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { TextInput } from 'react-native-paper';

const label = [ '', 'g', 'kg', 'dl', 'spsk', 'l' ];

const RecipeIngredients = ({ data }) => {
	const query = firebase.firestore().collection('Allrecipes').doc(data.Id).collection('ingredients');
	const [ Ingredients ]: any = useCollectionData(query);

	React.useEffect(
		() => {
			setingredients(Ingredients);
		},
		[ Ingredients ]
	);

	const [ ingredients, setingredients ] = React.useState([]);
	console.log(ingredients);
	const [ title, setTitle ] = React.useState({ value: '', error: '' });
	const [ amount, setamount ] = React.useState({ value: '', error: '' });
	const [ selectedValue, setSelectedValue ] = React.useState('');
	const AddIngredien = () => {
		const db = firebase
			.firestore()
			.collection('Allrecipes')
			.doc(data.Id)
			.collection('ingredients')
			.doc(title.value);

		db.set({
			navn: title.value,
			amount: amount.value,
			type: selectedValue
		});
		setVisible(false);
		setTitle({ value: '', error: '' });
		setamount({ value: '', error: '' });
		setSelectedValue('');
	};

	const [ visible, setVisible ] = React.useState(false);

	const showDialog = () => setVisible(true);

	const hideDialog = () => setVisible(false);

	return (
		<View
			style={{
				flex: 1,
				backgroundColor: 'white',
				marginLeft: 10,
				marginRight: 10,
				marginBottom: 10,
				padding: 20,
				borderRadius: 5,
				shadowColor: '#000',
				shadowOffset: {
					width: 0,
					height: 3
				},
				shadowOpacity: 0.06,
				shadowRadius: 3.68,
				elevation: 10
			}}
		>
			<List.Section>
				{ingredients &&
					ingredients.map((ingredient, index) => (
						<List.Item
							style={{ padding: 0 }}
							key={index}
							title={`${ingredient.navn} ${ingredient.amount} ${ingredient.type}`}
						/>
					))}
			</List.Section>
			<Button onPress={showDialog}>Tilføj Ingrediens</Button>
			<Portal>
				<Dialog visible={visible} onDismiss={hideDialog}>
					<Dialog.Title>Alert</Dialog.Title>
					<Dialog.Content>
						<View style={styles.inputfields}>
							<View style={styles.input}>
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
							</View>
							<View style={styles.input}>
								<Input
									style={{ backgroundColor: theme.colors.surface }}
									// underlineColor="transparent"
									theme={{ colors: { primary: theme.colors.primary } }}
									mode="flat"
									label="Amount"
									returnKeyType="next"
									value={amount.value}
									onChangeText={(text) => setamount({ value: text, error: '' })}
									error={!!amount.error}
								/>
							</View>
							<Picker
								style={{ width: '30%', height: 60, top: -70 }}
								selectedValue={selectedValue}
								onValueChange={(itemValue: any, itemIndex) => setSelectedValue(itemValue)}
							>
								{label.map((labels, index) => (
									<Picker.Item key={index} label={labels} value={labels} />
								))}
							</Picker>
						</View>
					</Dialog.Content>
					<Dialog.Actions>
						<Button mode="contained" onPress={() => AddIngredien()}>
							Tilføj Ingrediens
						</Button>
					</Dialog.Actions>
				</Dialog>
			</Portal>
		</View>
	);
};

export default RecipeIngredients;

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
