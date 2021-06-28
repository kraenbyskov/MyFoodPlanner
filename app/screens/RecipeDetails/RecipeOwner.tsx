import React from 'react';
import { View, Text } from 'react-native';

const RecipeOwner = ({ User }) => {
	return (
		<View>
			<Text>{User}</Text>
		</View>
	);
};

export default RecipeOwner;
