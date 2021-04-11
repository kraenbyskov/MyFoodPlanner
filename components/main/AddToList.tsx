import * as React from "react";
import { Text, View, StyleSheet, Image, SafeAreaView } from "react-native";
import TextInput from "../styledComponents/TextInput.jsx";
import Button from "../styledComponents/Button.jsx";
import firebase from "firebase";
import MainContainer from "../styledComponents/MainContainer";
require("firebase/firestore");
import styled from "styled-components";

const RecipeImage = styled.Image`
  width: 200;
  height: 200;
  border-radius: 200;
`;

const CaptureImage = styled.TouchableHighlight`
  width: 200;
  height: 200;
  border-radius: 200;
  margin-bottom: 40;
`;

const AddFoodToListScreen = (props) => {
  const [title, setTitle] = React.useState({ value: "", error: "" });

  //   console.log(props.route.params && props.route.params.image);
  const AddToList = () => {
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

    console.log("items was added");
  };

  console.log();
  return (
    <MainContainer>
      <CaptureImage onPress={() => props.navigation.navigate("Add")}>
        <View>
          {props.route.params ? (
            <RecipeImage source={{ uri: props.route.params.image }} />
          ) : (
            <RecipeImage source={require("../../assets/no_image.jpg")} />
          )}
        </View>
      </CaptureImage>

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

export default AddFoodToListScreen;
