import React from 'react';
import { Button, Paragraph, Dialog } from 'react-native-paper';

function DialogBox({ visible, hideDialog }) {
	return (
		<Dialog visible={visible} onDismiss={hideDialog}>
			<Dialog.Title>Alert</Dialog.Title>
			<Dialog.Content>
				<Paragraph>This is simple dialog</Paragraph>
			</Dialog.Content>
			<Dialog.Actions>
				<Button onPress={hideDialog}>Done</Button>
			</Dialog.Actions>
		</Dialog>
	);
}

export default DialogBox;
