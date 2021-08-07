import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  View,
  TouchableHighlight,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Platform,
} from "react-native";
import { Title, Text, Appbar } from "react-native-paper";

import { AppBar as TopAppBar, Button } from "../../components";

const MORE_ICON = Platform.OS === "ios" ? "dots-horizontal" : "dots-vertical";

import { connect } from "../../redux/actions";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Feed from "./ProfileFeed";

const Profile = ({ currentUser, navigation }) => {
  const destination = "ProfileImage";
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle={"dark-content"} />
      <TopAppBar
        RightSideButtons={
          <>
            <Appbar.Action
              icon={() => (
                <MaterialCommunityIcons
                  color={"black"}
                  name={"bug-outline"}
                  size={26}
                />
              )}
              onPress={() => navigation.navigate("BugReport")}
            />
            <Appbar.Action
              icon={() => (
                <MaterialCommunityIcons
                  color={"black"}
                  name={MORE_ICON}
                  size={26}
                  onPress={() => navigation.navigate("Settings")}
                />
              )}
            />
          </>
        }
      />
      <ScrollView style={styles.container}>
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
            <Button
              size={"small"}
              mode={"outlined"}
              onPress={() => navigation.navigate("EditProfile")}
            >
              Edit Profile
            </Button>
          </View>
        </View>

        <Feed navigation={navigation} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  RecipeImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
  container: {
    flex: 1,
    padding: 20,
    width: "100%",
    // maxWidth: 340,
    alignSelf: "center",
  },
});
