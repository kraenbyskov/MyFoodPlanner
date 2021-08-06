import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Platform,
} from "react-native";
import { Title, Text, Appbar } from "react-native-paper";

import {
  AppBar as TopAppBar, LogOutButton,
} from "../../components";
import { connect } from "react-redux";
const MORE_ICON = Platform.OS === "ios" ? "dots-horizontal" : "dots-vertical";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Settings = ({ currentUser, navigation, route }) => {

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle={"dark-content"} />
      <TopAppBar />
      <ScrollView style={styles.container}>
        <Title>Settings</Title>
        <LogOutButton />

      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});
export default connect(mapStateToProps, null)(Settings);

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
    width: "100%",
    // maxWidth: 340,
    alignSelf: "center",
  },
});
