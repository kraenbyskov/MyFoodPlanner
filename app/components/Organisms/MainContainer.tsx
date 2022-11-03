import React, { memo } from "react"
import { SafeAreaView, ScrollView, StyleSheet, View, StatusBar } from "react-native"
import AppBar from "../Molecules/AppBar"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        width: "100%",
        alignSelf: "center",
    },
    NonScroll: {
        alignItems: "center",
        justifyContent: "center",
    },
})

const MainContainer = ({ children, scroll = false, refresh = false }) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar barStyle={"dark-content"} />
            <AppBar />
            {scroll ? (
                <ScrollView style={styles.container}>{children}</ScrollView>
            ) : (
                <View style={[styles.container, styles.NonScroll]}>{children}</View>
            )}
        </SafeAreaView>
    )
}

export default memo(MainContainer)
