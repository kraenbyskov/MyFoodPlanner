import React from "react";
import { View, Image, Text } from "react-native";
import MainContainer from "../styledComponents/MainContainer";
import firebase from "firebase";
require("firebase/firestore");
import styled from "styled-components";
import { List, Title } from "react-native-paper";
import TextInput from "../styledComponents/TextInput";
import Button from "../styledComponents/Button";

const Container = styled.View`
  flex: 1;
  flex-wrap: wrap;
  margin-top: 0;
`;

const Shadow = {
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 3,
  },
  shadowOpacity: 0.06,
  shadowRadius: 3.68,

  elevation: 10,
};

export default function EditFood({ route }) {
  const [GetData, setGetData]: any = React.useState(null);
  const [title, setTitle] = React.useState({ value: "", error: "" });

  console.log(
    "🚀 ~ file: EditFood.tsx ~ line 29 ~ EditFood ~ GetData",
    GetData
  );

  React.useEffect(() => {
    firebase
      .firestore()
      .collection("Allrecipes")
      .doc(firebase.auth().currentUser.uid)
      .collection("recipes")
      .doc(route.params)
      .get()
      .then((snapshot) => {
        setGetData(snapshot.data());
      });
  }, []);

  const AddIngredien = () => {
    console.log("hey");
    firebase
      .firestore()
      .collection("Allrecipes")
      .doc(firebase.auth().currentUser.uid)
      .collection("recipes")
      .doc(route.params)
      .update({
        Ingredienser: [...GetData.Ingredienser, "Sukker"],
      });
  };

  if (GetData) {
    const { Name, downloadUrl, Ingredienser } = GetData;
    return (
      <MainContainer scroll={true}>
        <Container>
          <Title>{Name}</Title>
          <Image
            style={{ width: "100%", height: 200 }}
            source={{ uri: downloadUrl }}
          />
          <Title>Description</Title>
          <Text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem
            quisquam temporibus aspernatur at facilis odit est similique
            delectus aliquam quam cum, exercitationem nesciunt animi illum quasi
            vero sit nobis nulla!
          </Text>

          <List.Accordion title="Ingredienser: ">
            {Ingredienser &&
              Ingredienser.map((data) => <List.Item title={data} />)}

            <Button mode="contained" onPress={() => AddIngredien()}>
              Tilføj Ingrediens
            </Button>
          </List.Accordion>
        </Container>
      </MainContainer>
    );
  } else {
    return <Title>No data</Title>;
  }
}
