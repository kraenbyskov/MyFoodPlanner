import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableHighlight,
} from "react-native";
import TextInput from "../styledComponents/TextInput";
import Button from "../styledComponents/Button";
import firebase from "firebase";
import MainContainer from "../styledComponents/MainContainer";
require("firebase/firestore");

const AddFoodToListScreen = (props) => {
  const [title, setTitle] = React.useState({ value: "", error: "" });

  const AddToList = async () => {
    firebase
      .firestore()
      .collection("Allrecipes")
      .doc(firebase.auth().currentUser.uid)
      .collection("recipes")
      .doc(title.value)
      .set({
        Name: title.value,
        Date: new Date(),
      });
    setTitle({ value: "", error: "" });

    const uri = props.route.params.image;
    const childPath = `post/${
      firebase.auth().currentUser.uid
    }/${Math.random().toString(36)}`;

    const response = await fetch(uri);
    const blob = await response.blob();

    const task = firebase.storage().ref().child(childPath).put(blob);

    const taskProgress = (snapshot) => {
      console.log(`transferred: ${snapshot.bytesTransferred}`);
    };

    const taskCompleted = () => {
      task.snapshot.ref.getDownloadURL().then((snapshot) => {
        savePostData(snapshot);
      });
    };

    const taskError = (snapshot) => {
      console.log(snapshot);
    };

    task.on("state_changed", taskProgress, taskError, taskCompleted);
  };

  const savePostData = (downloadUrl) => {
    firebase
      .firestore()
      .collection("Allrecipes")
      .doc(firebase.auth().currentUser.uid)
      .collection("recipes")
      .doc(title.value)
      .set({
        Name: title.value,
        downloadUrl,
        Date: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(function () {
        props.navigation.popToTop();
      });
  };

  return (
    <MainContainer>
      <TouchableHighlight
        style={styles.CaptureImage}
        onPress={() => props.navigation.navigate("Add")}
      >
        <View>
          {props.route.params ? (
            <Image
              style={styles.RecipeImage}
              source={{ uri: props.route.params.image }}
            />
          ) : (
            <Image
              style={styles.RecipeImage}
              source={require("../../assets/no_image.jpg")}
            />
          )}
        </View>
      </TouchableHighlight>

      <Text>Add Food to List</Text>

      <TextInput
        label="Title"
        returnKeyType="next"
        value={title.value}
        onChangeText={(text) => setTitle({ value: text, error: "" })}
        error={!!title.error}
        errorText={title.error}
      />
      <Button mode="contained" onPress={AddToList}>
        Tilføj
      </Button>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  CaptureImage: {
    width: 200,
    height: 200,
    borderRadius: 200,
    marginBottom: 40,
  },
  RecipeImage: {
    width: 200,
    height: 200,
    borderRadius: 200,
  },
});

export default AddFoodToListScreen;
