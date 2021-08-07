import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import { TextInput, Button, MainContainer } from "../../components";
import firebase from "firebase";
import AddRecipeImage from "./AddRecipeImage";
import { List } from "react-native-paper";
require("firebase/firestore");
import { connect } from "react-redux";
import { Snackbar } from "react-native-paper";
import { bindActionCreators } from "redux";
import { AddToListMessage } from "../../redux/actions";

const style = StyleSheet.create({
  Content: {
    flex: 1,
    width: "100%",
    borderColor: "orange",
    justifyContent: "space-between",
    alignItems: "center",
  },
  barStyle: {
    backgroundColor: "green",
    top: 0,
    flex: 1,
  },
});

const AddFoodToListScreen = (props) => {
  const [title, setTitle] = React.useState({ value: "", error: "" });
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
      props.AddToListMessage({ title: percent });
    };

    const taskCompleted = () => {
      task.snapshot.ref.getDownloadURL().then((snapshot) => {
        const db = firebase.firestore().collection("Allrecipes");
        const object = {
          Id: `${firebase.auth().currentUser.uid}_${title.value}`,
          Name: title.value,
          downloadUrl: snapshot,
          Date: firebase.firestore.FieldValue.serverTimestamp(),
          Owner: {
            User: props.currentUser.name,
            UserID: firebase.auth().currentUser.uid,
          },
          CookingTime: "",
          Calories: "",
        };
        db.doc(`${firebase.auth().currentUser.uid}_${title.value}`)
          .set(object)
          .then(function () {
            props.navigation.navigate("RecipeDetails", object);
          });
        setTitle({ value: "", error: "" });
        props.AddToListMessage({ title: title.value });
      });
    };
    const taskError = (snapshot) => {
      props.AddToListMessage({ title: snapshot });
    };

    task.on("state_changed", () => taskProgress, taskError, taskCompleted);
  };

  return (
    <MainContainer scroll={true}>
      <View style={style.Content}>
        <AddRecipeImage route={props.route} navigation={props.navigation} />

        <Text>Tilføj ny Opskrift</Text>

        <TextInput
          label="Navn"
          returnKeyType="next"
          value={title.value}
          onChangeText={(text) => setTitle({ value: text, error: "" })}
          error={!!title.error}
          errorText={title.error}
        />
        <View style={{ marginTop: 30, flex: 1, width: "100%" }}>
          <Button mode="contained" onPress={AddToList}>
            Tilføj
          </Button>
        </View>
      </View>
    </MainContainer>
  );
};

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});

const mapDispatchProps = (dispatch) =>
  bindActionCreators({ AddToListMessage }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(AddFoodToListScreen);
