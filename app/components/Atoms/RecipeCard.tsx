import React, { FC } from 'react';
import { View, StyleSheet, TouchableHighlight, Image, Text } from 'react-native';
import { theme } from '../../core/theme';

interface RecipeCardInterface {
	navigation: any;
	data: any;
	children?: any;
}

const RecipeCard: FC<RecipeCardInterface> = ({ navigation, data, children }) => {
	return (
		<TouchableHighlight
			style={styles.Card}
			underlayColor={theme.colors.primary}
			onPress={() => navigation.navigate('RecipeDetails', data)}
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
				<Text style={styles.Title}>{data.Name}</Text>
				<View style={styles.Icons}>{children}</View>
			</View>
		</TouchableHighlight>
	);
};

export default RecipeCard;

const styles = StyleSheet.create({
	Card: {
		flex: 1,
		width: '100%',
		height: 40,
		backgroundColor: 'white',
		borderRadius: 10,
		marginBottom: 10,
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
		width: 30,
		height: 30,
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
		marginLeft: 10,
		fontSize: 18
	},
	Icons: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-end'
		// backgroundColor: 'orange'
	}
});
