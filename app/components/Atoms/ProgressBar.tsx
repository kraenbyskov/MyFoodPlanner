import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { theme } from "../../core/theme";

const ProgressBar = ({ Steps }) => {
    console.log(Steps)
    return (
        <View style={styles.container}>
            <View style={[styles.activebar, { borderRightWidth: 4, backgroundColor: Steps >= 1 ? theme.colors.primary : theme.colors.Gray }]} />
            <View style={[styles.activebar, { borderRightWidth: 4, backgroundColor: Steps >= 2 ? theme.colors.primary : theme.colors.Gray }]} />
            <View style={[styles.activebar, { backgroundColor: Steps >= 3 ? theme.colors.primary : theme.colors.Gray }]} />
        </View>
    )
}

export default ProgressBar

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 20,
        backgroundColor: "orange"
        , flexDirection: "row"
    },
    activebar: {
        height: 20,
        borderColor: "white",
        width: "33.3333%",
        backgroundColor: "blue"
    }
})
