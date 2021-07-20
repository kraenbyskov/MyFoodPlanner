import React from "react";
import { SafeAreaView, StatusBar, RefreshControl } from "react-native";
import firebase from "firebase";
require("firebase/firestore");
import { Title } from "react-native-paper";

import Banner from "./DetailsBanner";
import Ingredients from "./DetailsIngredients";
import Description from "./DetailsDescription";

import EkstraImages from "./DetailsEkstraImages";
import ParallaxScrollView from "react-native-parallax-scroll-view";
import { theme } from "../../core/theme";

export default function Details({ route, navigation }) {
  const [GetData, setGetData]: any = React.useState(null);

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

  // const addToOwnList = () => {
  //   db.doc(`${firebase.auth().currentUser.uid}_${GetData.Name}`)
  //     .collection("recipes")
  //     .doc(route.params[0])
  //     .set(GetData);
  // };

  if (GetData) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle={"light-content"} />
        <ParallaxScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          style={{ top: -50 }}
          backgroundColor={theme.colors.background}
          contentBackgroundColor={theme.colors.background}
          parallaxHeaderHeight={350}
          renderForeground={() => <Banner Data={GetData} />}
        >
          <Description Data={GetData} />
          <EkstraImages Data={GetData} />
          <Ingredients data={GetData} />
        </ParallaxScrollView>
      </SafeAreaView>
    );
  } else {
    return <Title>No data</Title>;
  }
}
