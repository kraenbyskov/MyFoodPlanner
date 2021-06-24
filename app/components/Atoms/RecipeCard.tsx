import React from 'react';
import { View, StyleSheet, TouchableHighlight, Image, Text } from 'react-native';

function RecipeCard({ navigation, data, children }) {
	return (
		<TouchableHighlight style={styles.Card} onPress={() => navigation.navigate('RecipeDetails', data)}>
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
				<Text style={styles.Title}>{data.Name}</Text>
				<View style={styles.Icons}>{children}</View>
			</View>
		</TouchableHighlight>
	);
}

export default RecipeCard;

const styles = StyleSheet.create({
	Card: {
		flex: 1,
		width: '100%',
		height: 60,
		backgroundColor: 'white',
		borderRadius: 10,
		marginBottom: 20,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 3
		},
		shadowOpacity: 0.06,
		shadowRadius: 3.68,
		elevation: 10
	},
	RecipeImage: {
		marginLeft: 5,
		width: 50,
		height: 50,
		borderRadius: 10
	},
	Content: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		borderRadius: 20
	},
	Title: {
		marginLeft: 20,
		fontSize: 18
	},
	Icons: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-end'
		// backgroundColor: 'orange'
	}
});
