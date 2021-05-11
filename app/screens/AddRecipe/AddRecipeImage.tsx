import React from 'react';
import { Image, StyleSheet, View, TouchableHighlight } from 'react-native';

const AddRecipeImage = ({ route, navigation }) => {
	return (
		<TouchableHighlight style={styles.CaptureImage} onPress={() => navigation.navigate('Add')}>
			<View>
				{route.params ? (
					<Image style={styles.RecipeImage} source={{ uri: route.params.image }} />
				) : (
					<Image style={styles.RecipeImage} source={require('images/no_image.jpg')} />
				)}
			</View>
		</TouchableHighlight>
	);
};

const styles = StyleSheet.create({
	CaptureImage: {
		width: 200,
		height: 200,
		borderRadius: 200,
		marginBottom: 40
	},
	RecipeImage: {
		width: 200,
		height: 200,
		borderRadius: 200
	}
});

export default AddRecipeImage;
