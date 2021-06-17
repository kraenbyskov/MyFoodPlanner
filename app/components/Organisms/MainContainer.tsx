import React, { memo } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import TopAppBar from '../Molecules/AppBar';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		width: '100%',
		// maxWidth: 340,
		alignSelf: 'center'
	},
	NonScroll: {
		alignItems: 'center',
		justifyContent: 'center'
	}
});

const MainContainer = ({ children, scroll = false, refresh = false }) => {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<TopAppBar />
			{scroll ? (
				<ScrollView style={styles.container}>{children}</ScrollView>
			) : (
				<View style={[ styles.container, styles.NonScroll ]}>{children}</View>
			)}
		</SafeAreaView>
	);
};

export default memo(MainContainer);
