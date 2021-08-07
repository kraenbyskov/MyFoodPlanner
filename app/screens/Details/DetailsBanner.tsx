import React, { useEffect, useState } from "react";
import { StyleSheet, ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { connect } from "react-redux";
import { cacheDirectory, getInfoAsync } from "expo-file-system";
import shorthash from "shorthash";
import { getCacheImage } from "../../functions";

const DetailsBanner = ({ Data }) => {
  const [image, setImage] = useState();

  useEffect(() => {
    getCacheImage(Data.downloadUrl).then((image) => {
      setImage(image);
    });
  }, []);

  return (
    <ImageBackground
      source={
        image
          ? { uri: image }
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
