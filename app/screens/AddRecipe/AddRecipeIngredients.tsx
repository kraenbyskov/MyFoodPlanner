import React from 'react';
import { Text, View } from 'react-native';
import { DataTable } from 'react-native-paper';

const AddRecipeIngredients = () => {
	const DataTableArra = [
		{
			name: 'Beef Stock',
			volume: 450,
			type: 'gram'
		},
		{
			name: 'Ost',
			volume: 450,
			type: 'gram'
		},
		{
			name: 'Pasta',
			volume: 450,
			type: 'gram'
		}
	];

	return (
		<View style={{ flex: 1, width: '100%' }}>
			<Text>Ingredients</Text>
			<View>
				<DataTable>
					{DataTableArra.map((data, key) => (
						<DataTable.Header key={key}>
							<DataTable.Title>{data.name}</DataTable.Title>
							<DataTable.Title numeric>{data.volume}</DataTable.Title>
							<DataTable.Title numeric>{data.type}</DataTable.Title>
						</DataTable.Header>
					))}
				</DataTable>
			</View>
		</View>
	);
};

export default AddRecipeIngredients;
