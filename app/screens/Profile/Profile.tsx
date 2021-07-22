import React, { useEffect, useState } from "react";
import { Image, StyleSheet, View, TouchableHighlight } from "react-native";
import { Title, Text } from "react-native-paper";

import {
  Button,
  LogOutButton,
  MainContainer,
  TextInput,
} from "../../components";
import { connect } from "react-redux";
import firebase from "firebase";

const Profile = ({ currentUser, navigation, route }) => {
  const [userValue, setuserValue] = useState({ value: "", error: "" });
  const destination = "Profile";

  console.log(route);
  const shareListWith = (text) => {
    const searchUser = firebase
      .firestore()
      .collection("users")
      .where("name", "==", text);
    searchUser.get().then((snapshot) => {
      snapshot.forEach((data) => {
        firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .update({
            sharing: data.id,
          });
      });
    });
  };

  return (
    <MainContainer>
      <Title>Profile</Title>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
        }}
      >
        <TouchableHighlight
          onPress={() => navigation.navigate("Add", { destination })}
        >
          <Image
            style={styles.RecipeImage}
            source={require("images/no_image.jpg")}
          />
        </TouchableHighlight>
        <View style={{ paddingLeft: 20 }}>
          <Text>{currentUser && currentUser.name}</Text>
          <Text>{currentUser && currentUser.email}</Text>
        </View>
      </View>
      <View style={{ flex: 1, width: "100%" }}>
        <TextInput
          label="Email"
          returnKeyType="next"
          value={userValue.value}
          onChangeText={(text) => setuserValue({ value: text, error: "" })}
          error={!!userValue.error}
          errorText={userValue.error}
          autoCapitalize="none"
          autoCompleteType="email"
          textContentType="emailAddress"
          keyboardType="email-address"
        />
        <View
          style={{
            marginTop: 30,
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <View>
            <Button onPress={() => shareListWith(userValue.value)}>
              Share With
            </Button>
          </View>
          <View>
            <Button onPress={() => navigation.navigate("BugReport")}>
              Bug reporting
            </Button>
          </View>
        </View>
        <LogOutButton />
      </View>
    </MainContainer>
  );
};

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});
export default connect(mapStateToProps, null)(Profile);

const styles = StyleSheet.create({
  RecipeImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
});
