import * as React from "react";
import { Text, View, StyleSheet, Image, SafeAreaView } from "react-native";
import TextInput from "../styledComponents/TextInput";
import Button from "../styledComponents/Button";
import firebase from "firebase";
import MainContainer from "../styledComponents/MainContainer";
require("firebase/firestore");
import styled from "styled-components";

const RecipeImage = styled.Image`
  width: 200px;
  height: 200px;
  border-radius: 200px;
`;

const CaptureImage = styled.TouchableHighlight`
  width: 200px;
  height: 200px;
  border-radius: 200px;
  margin-bottom: 40px;
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
