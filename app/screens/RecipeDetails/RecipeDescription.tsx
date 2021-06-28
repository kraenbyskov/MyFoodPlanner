import React from 'react';
import { View, Text } from 'react-native';
import { Title, Subheading } from 'react-native-paper';

const RecipeDescription = ({ Data }) => {
	const { Name, description, Owner } = Data;
	return (
		<View
			style={{
				backgroundColor: 'white',
				marginLeft: 10,
				marginRight: 10,
				marginBottom: 10,
				height: 'auto',
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
			<Title>{Name}</Title>
			<Subheading>{Owner.User}</Subheading>
			{description ? <Text>{description}</Text> : null}
		</View>
	);
};

export default RecipeDescription;
