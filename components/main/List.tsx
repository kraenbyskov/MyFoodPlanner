import React from "react";
import { View } from "react-native";
import MainContainer from "../styledComponents/MainContainer";
import firebase from "firebase";
require("firebase/firestore");
import { useCollectionData } from "react-firebase-hooks/firestore";
import styled from "styled-components";

const Container = styled.View`
  flex: 1;
  flex-wrap: wrap;
  margin-top: 0;
`;

const Card = styled.TouchableHighlight`
  width: 100%;
  height: 80;
  background-color: white;
  border-radius: 20;
  margin-bottom: 20;
`;

const Content = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-radius: 20;
`;

const Title = styled.Text`
  margin-left: 20;
  font-size: 24;
`;

const RecipeImage = styled.Image`
  margin-left: 10;
  width: 60;
  height: 60;
  border-radius: 50;
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

export default function List() {
  const [GetData, setGetData]: any = React.useState(null);

  const query = firebase
    .firestore()
    .collection("Allrecipes")
    .doc(firebase.auth().currentUser.uid)
    .collection("recipes")
    .orderBy("Name");
  const [Food]: any = useCollectionData(query, { idField: "id" });

  React.useEffect(() => {
    setGetData(Food);
  }, [Food]);

  console.log(GetData);

  return (
    <MainContainer scroll={true}>
      <Container>
        {GetData &&
          GetData.map((data) => (
            <Card style={Shadow} key={data.Name}>
              <Content>
                <RecipeImage
                  source={require("../../assets/photo-1512621776951-a57141f2eefd.png")}
                />
                <View style={{ width: "100%" }}>
                  <Title>{data.Name}</Title>
                </View>
              </Content>
            </Card>
          ))}
      </Container>
    </MainContainer>
  );
}