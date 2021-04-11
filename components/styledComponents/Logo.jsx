import React, { memo } from 'react';
import { Image, StyleSheet } from 'react-native';
import LogoImage from "../../assets/LoginScreen.png"

const Logo = () => (
    <Image source={LogoImage} style={styles.image} />
);

const styles = StyleSheet.create({
    image: {
        width: 228,
        height: 228,
        marginBottom: 12,
    },
});

export default memo(Logo);