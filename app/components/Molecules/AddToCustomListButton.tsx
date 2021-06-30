import React from 'react';
import { IconButton } from 'react-native-paper';
import { theme } from '../../core/theme';

function AddToCustomListButton() {
	const [ visible, setVisible ] = React.useState(false);

	const showDialog = () => setVisible(true);

	return <IconButton color={theme.colors.secondary} size={25} icon="check" onPress={() => showDialog()} />;
}

export default AddToCustomListButton;
