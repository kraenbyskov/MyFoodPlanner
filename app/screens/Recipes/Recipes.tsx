import React from "react";
import { MainContainer } from "../../components";
require("firebase/firestore");
import { Text, View, StyleSheet } from "react-native";
import { connect } from "react-redux";

import OwnRecipes from "./OwnRecipes";

const List = ({ navigation, currentUser, Message }) => {
  return (
    <MainContainer scroll={true}>
      <View style={styles.Container}>
        <Text>Own Recipes</Text>
        <OwnRecipes navigation={navigation} />
        {currentUser ? (
          <>
            <Text>Shared Recipes</Text>
            <OwnRecipes navigation={navigation} sharing={currentUser.sharing} />
          </>
        ) : null}
      </View>

      <Text>{Message}</Text>

      <View
        style={{ bottom: 0, width: "100%", flex: 1, position: "absolute" }}
      ></View>
    </MainContainer>
  );
};

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});
export default connect(mapStateToProps, null)(List);

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    flexWrap: "wrap",
    marginTop: 0,
  },
});
