import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Snackbar } from 'react-native-paper';

const styles = StyleSheet.create({
	barStyle: {
		backgroundColor: 'green',
		top: 0,
		flex: 1
	}
});

function SnackBar({ visible, setVisible }) {
	const onDismissSnackBar = () => setVisible(false);

	return (
		<Snackbar
			style={styles.barStyle}
			visible={visible}
			onDismiss={onDismissSnackBar}
			duration={700}
			action={{
				label: 'Undo',
				onPress: () => {
					// Do something
				}
			}}
		>
			Hey there! I'm a Snackbar.
		</Snackbar>
	);
}

export default SnackBar;
