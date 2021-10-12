import React from "react";
import { theme } from "../../core/theme";

import {
  SafeAreaView,
  StatusBar,
  Image,
  Text,
  RefreshControl,
  View,
  StyleSheet,
  Animated,
} from "react-native";
import firebase from "firebase";


import { AppBar, ParallaxScrollView } from "../../components";
import Feed from "./DashboardFeed";

import Header from "./DashboardHeader";

const RenderStickyHeader = (value) => {
  const opacity = value.interpolate({
    inputRange: [0, 0, 1],
    outputRange: [0, 150, 200],
    extrapolate: "clamp",
  });
  return (
    <View style={Styles.stickyHeader}>
      <Animated.View style={[Styles.stickyHeaderBackground, { opacity }]} />
    </View>
  );
};

const Dashboard = () => {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    setRefreshing(false);
  }, []);

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
      .collection("CustomList").doc(weekday[Day]);

    Today.get().then((doc) => {
      if (doc.exists) {
        setToday(doc.data())
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }).catch((error) => {
      console.log("Error getting document:", error);
    });
  }, []);




  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ParallaxScrollView
        style={{ top: -50 }}
        parallaxHeaderHeight={500}
        stickyHeaderHeight={50}
        parallaxHeader={() => <Header data={Today} />}
        fixedHeader={() => <AppBar mainColor={"white"} />}
        stickyHeader={RenderStickyHeader}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Feed todaysRecipe={Today} />
      </ParallaxScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;

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
