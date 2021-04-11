import React from "react";
import { Text, View, SafeAreaView, StyleSheet } from "react-native";
import { theme } from "../../core/theme";
import TopAppBar from "../AppBar";
import LogOutButton from "../LogOutButton";
import { connect } from "react-redux";
import MainContainer from "../styledComponents/MainContainer";

const Dashboard = ({ currentUser }) => {
  return (
    <MainContainer>
      <LogOutButton />
      <Text>{currentUser && currentUser.name}</Text>
      <Text>{currentUser && currentUser.email}</Text>
    </MainContainer>
  );
};

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});
export default connect(mapStateToProps, null)(Dashboard);
