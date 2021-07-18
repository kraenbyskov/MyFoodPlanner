import React from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  StatusBar,
  RefreshControl,
  Text,
} from "react-native";
import MainContainer from "../../components/Organisms/MainContainer";
import firebase from "firebase";
require("firebase/firestore");
import { Title, IconButton } from "react-native-paper";

import RecipeOwner from "./RecipeOwner";
import RecipeBanner from "./RecipeBanner";
import RecipeIngredients from "./RecipeIngredients";
import RecipeDescription from "./RecipeDescription";

import { Button } from "../../components";
import RecipeEkstraImages from "./RecipeEkstraImages";
import ParallaxScrollView from "react-native-parallax-scroll-view";
import { theme } from "../../core/theme";

export default function RecipeDetails({ route, navigation }) {
  const [GetData, setGetData]: any = React.useState(null);
  const [GetScrollY, setGetScrollY]: any = React.useState(0);

  const db = firebase.firestore().collection("Allrecipes");

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    db.doc(route.params.Id)
      .get()
      .then((snapshot) => {
        setGetData(snapshot.data());
      });
    setRefreshing(false);
  }, []);

  React.useEffect(() => {
    db.doc(route.params.Id)
      .get()
      .then((snapshot) => {
        setGetData(snapshot.data());
      });
  }, []);

  const addToOwnList = () => {
    db.doc(`${firebase.auth().currentUser.uid}_${GetData.Name}`)
      .collection("recipes")
      .doc(route.params[0])
      .set(GetData);
  };

  if (GetData) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle={"light-content"} />
        <ParallaxScrollView
          style={{ top: -50 }}
          backgroundColor={theme.colors.background}
          contentBackgroundColor={theme.colors.background}
          parallaxHeaderHeight={350}
          renderForeground={() => <RecipeBanner Data={GetData} />}
        >
          <RecipeDescription Data={GetData} />
          <RecipeEkstraImages Data={GetData} />
          <RecipeIngredients data={GetData} />
        </ParallaxScrollView>
      </SafeAreaView>
    );
  } else {
    return <Title>No data</Title>;
  }
}
