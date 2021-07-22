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

import { connect } from "../../redux/actions";
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

const Dashboard = ({ navigation }) => {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    console.log("hey");
    setRefreshing(false);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ParallaxScrollView
        style={{ top: -50 }}
        parallaxHeaderHeight={300}
        stickyHeaderHeight={50}
        parallaxHeader={() => <Header />}
        fixedHeader={() => <AppBar mainColor={"white"} />}
        stickyHeader={RenderStickyHeader}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Feed />
      </ParallaxScrollView>
    </SafeAreaView>
  );
};

export default connect()(Dashboard);

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
