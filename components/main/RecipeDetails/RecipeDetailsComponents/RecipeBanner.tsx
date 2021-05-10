import React from 'react'
import { Image, View,Text } from 'react-native';
import { Title } from 'react-native-paper';


const RecipeBanner = ({ title, image }) => {
	return (
		<View>
			<Image style={{ width: '100%', height: 350 }} source={{ uri: image }} />
			<Title>{title}</Title>
			<Text>Likes 347</Text>
			<Text>4.9 (349 ratings)</Text>
		</View>
	);
};

export default RecipeBanner