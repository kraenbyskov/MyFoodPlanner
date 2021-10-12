import React from "react";
import { connect } from "react-redux";
import { View, StyleSheet, Text, ImageBackground } from "react-native";
import { AppBar } from "../../components";
import { theme } from "../../core/theme";

import firebase from "firebase";


export const DashboardHeader = ({ data }) => {


  return (
    <View style={styles.TopDashboard}>
      {data ?
        <ImageBackground
          source={{ uri: data.downloadUrl }}
          style={{ width: "100%", height: 530, paddingTop: 150 }}
        >

        </ImageBackground>
        : null}
    </View>
  );
};



export default DashboardHeader;

const styles = StyleSheet.create({
  TopDashboard: {
    top: -50,
    backgroundColor: theme.colors.primary,
    height: 500,
  },
});
