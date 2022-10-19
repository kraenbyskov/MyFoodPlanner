import React, { memo } from "react";
import { Image, StyleSheet } from "react-native";

const Logo = () => (
  <Image
    source={require("images/myFoodPlannerLogo.png")}
    style={styles.image}
  />
);

const styles = StyleSheet.create({
  image: {
    width: 288,
    height: 288,
    marginBottom: 12,
  },
});

export default memo(Logo);
