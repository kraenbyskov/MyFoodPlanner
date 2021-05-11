import React, { memo } from 'react';
import { Image, StyleSheet } from 'react-native';

const Logo = () => <Image source={require('images/LoginScreen.png')} style={styles.image} />;

const styles = StyleSheet.create({
	image: {
		width: 228,
		height: 228,
		marginBottom: 12
	}
});

export default memo(Logo);
