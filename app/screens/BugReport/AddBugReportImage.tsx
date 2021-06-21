import React from 'react';
import { Image, StyleSheet, View, TouchableHighlight } from 'react-native';

const AddBugReportImage = ({ route, navigation }) => {
	const destination = 'BugReport';
	return (
		<TouchableHighlight style={styles.CaptureImage} onPress={() => navigation.navigate('Add', { destination })}>
			<Image
				style={styles.RecipeImage}
				source={route.params ? { uri: route.params.image } : require('images/no_image.jpg')}
			/>
		</TouchableHighlight>
	);
};

const styles = StyleSheet.create({
	CaptureImage: {
		width: 200,
		height: 300
	},
	RecipeImage: {
		width: 200,
		height: 300
	}
});

export default AddBugReportImage;
