import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import {
  Button,
  LogOutButton,
  MainContainer,
  TextInput,
} from "../../components";
import { connect } from "react-redux";
import firebase from "firebase";
import AddBugReportImage from "./AddBugReportImage";
import { AppBar } from "../../components";

const BugReport = (props) => {
  const [title, setTitle] = React.useState({ value: "", error: "" });
  const [description, setDescription] = React.useState({
    value: "",
    error: "",
  });

  const AddToList = async () => {
    const uri = props.route.params.image;
    const childPath = `post/${
      firebase.auth().currentUser.uid
    }/${Math.random().toString(36)}`;

    const response = await fetch(uri);
    const blob = await response.blob();

    const task = firebase.storage().ref().child(childPath).put(blob);

    const taskProgress = (snapshot) => {
      let percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    };

    const taskCompleted = () => {
      task.snapshot.ref.getDownloadURL().then((snapshot) => {
        firebase
          .firestore()
          .collection("Bugs")
          .doc(title.value)
          .set({
            Title: title.value,
            Description: description.value,
            downloadUrl: snapshot,
            Date: firebase.firestore.FieldValue.serverTimestamp(),
            Owner: firebase.auth().currentUser.uid,
          })
          .then(function () {
            props.navigation.popToTop();
          });
        setTitle({ value: "", error: "" });
      });
    };
    const taskError = (snapshot) => {
      console.log(snapshot);
    };

    task.on("state_changed", () => taskProgress, taskError, taskCompleted);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <MainContainer>
          <Text>Bug Report</Text>
          <AddBugReportImage
            route={props.route}
            navigation={props.navigation}
          />
          <TextInput
            label="Title på fejlen"
            returnKeyType="next"
            value={title.value}
            onChangeText={(text) => setTitle({ value: text, error: "" })}
            error={!!title.error}
            errorText={title.error}
          />
          <TextInput
            label="Beskrivelse"
            returnKeyType="next"
            value={description.value}
            onChangeText={(text) => setDescription({ value: text, error: "" })}
            error={!!description.error}
            errorText={description.error}
          />
          <Button mode="contained" onPress={() => AddToList()}>
            Submit Bug
          </Button>
        </MainContainer>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});
export default connect(mapStateToProps, null)(BugReport);
