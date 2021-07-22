import React from "react";
import { StyleSheet, ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { connect } from "react-redux";

const DetailsBanner = ({ Data }) => {
  return (
    <ImageBackground source={{ uri: Data.downloadUrl }} style={styles.image}>
      <LinearGradient
        style={styles.gradient}
        colors={["rgba(0,0,0,0.8)", "transparent"]}
      />
    </ImageBackground>
  );
};

export default connect(null, null)(DetailsBanner);
const styles = StyleSheet.create({
  gradient: {
    height: 350,
    top: -50,
  },
  image: {
    justifyContent: "center",
    top: -10,
    paddingTop: 50,
  },
});
