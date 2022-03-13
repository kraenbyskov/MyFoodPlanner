import React, { FC, useEffect, useState } from "react";
import { StyleSheet, ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { connect } from "react-redux";


interface DetailsBannerInterface {
  Data: { downloadUrl: string }
}


const DetailsBanner: FC<DetailsBannerInterface> = ({ Data }) => {

  return (
    <ImageBackground
      source={
        Data.downloadUrl
          ? { uri: Data.downloadUrl }
          : require("../../assets/photo-1512621776951-a57141f2eefd.png")
      }
      style={styles.image}
    >
      <LinearGradient
        style={styles.gradient}
        colors={["rgba(0,0,0,0.8)", "transparent"]}
      />
    </ImageBackground>
  );
};

export default DetailsBanner;
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
