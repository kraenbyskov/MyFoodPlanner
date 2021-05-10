import React, { memo } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import TopAppBar from "../AppBar";

const MainContainer = ({ children, scroll = false, fixTop = false }) => {
  if (scroll) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <TopAppBar  fixTop={fixTop} />
        <ScrollView style={styles.containerScroll}>{children}</ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopAppBar />
      <View style={styles.container}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    width: "100%",
    maxWidth: 340,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  containerScroll: {
    flex: 1,
    padding: 10,
    width: "100%",
    maxWidth: 340,
    alignSelf: "center",
  },
});

export default memo(MainContainer);
