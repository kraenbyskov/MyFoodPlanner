import React from "react";
import { theme } from "../../core/theme";

import {
  SafeAreaView,
  StatusBar,
  Text,
  View,
  StyleSheet,
  Dimensions,
} from "react-native";
import firebase from "firebase";

import Header from "./DashboardHeader";
import Carousel from "react-native-snap-carousel";

const data = [
  { weekday: "Mandag" },
  { weekday: "Tirsdag" },
  { weekday: "Onsdag" },
  { weekday: "Torsdag" },
  { weekday: "Fredag" },
  { weekday: "Lørdag" },
  { weekday: "Søndag" },
];

const Dashboard = () => {
  const screenWidth = Dimensions.get("screen").width;
  const [Today, setToday] = React.useState(null);
  var getDate = new Date();
  var Day = getDate.getDay();

  var weekday = new Array(7);
  weekday[0] = "Søndag";
  weekday[1] = "Mandag";
  weekday[2] = "Tirsdag";
  weekday[3] = "Onsdag";
  weekday[4] = "Torsdag";
  weekday[5] = "Fredag";
  weekday[6] = "Lørdag";

  React.useEffect(() => {
    const Today = firebase
      .firestore()
      .collection("AddToCustomList")
      .doc(firebase.auth().currentUser.uid)
      .collection("CustomList")
      .doc(weekday[Day]);

    Today.get()
      .then((doc) => {
        if (doc.exists) {
          setToday(doc.data());
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar
        animated={true}
        backgroundColor="#61dafb"
        barStyle={"light-content"}
      />
      <Header data={Today} />

      <Carousel
        layout={"default"}
        data={data}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <RenderRecipeCard item={item} />}
        sliderWidth={screenWidth}
        itemWidth={250}
      />
    </SafeAreaView>
  );
};

export default Dashboard;

const RenderRecipeCard = ({ item }) => {
  console.log(item);
  return (
    <View
      style={{
        backgroundColor: "orange",
        height: 400,
      }}
    >
      <Text>{item.weekday}</Text>
    </View>
  );
};

const Styles = StyleSheet.create({
  stickyHeader: {
    height: 50,
    width: "100%",
  },
  stickyHeaderBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    // backgroundColor: "white",
  },
});
