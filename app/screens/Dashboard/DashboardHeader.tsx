import React from "react";
import { connect } from "react-redux";
import { View, StyleSheet, Text, ImageBackground } from "react-native";
import { AppBar } from "../../components";
import { theme } from "../../core/theme";

import firebase from "firebase";

export const DashboardHeader = ({ data }) => {
  return (
    <View style={styles.TopDashboard}>
      <Text
        style={{
          marginTop: 70,
          paddingHorizontal: 25,
          color: "white",
          fontSize: 16,
          fontWeight: "600",
        }}
      >
        Dagens opskrifter
      </Text>
    </View>
  );
};

export default DashboardHeader;

const styles = StyleSheet.create({
  TopDashboard: {
    top: -50,
    backgroundColor: theme.colors.primary,
    height: 100,
  },
});
