import React, { useEffect, useState } from "react";
import { Image } from "react-native";
import { getCacheImage } from "../../functions";

const CustomImage = ({ url, style }) => {
  const [CacheImage, setCacheImage] = useState(null);

  useEffect(() => {
    getCacheImage(url).then((data) => {
      setCacheImage(data);
    });
  }, []);

  return (
    <Image
      style={style}
      source={
        CacheImage
          ? { uri: CacheImage }
          : require("../../assets/photo-1512621776951-a57141f2eefd.png")
      }
    />
  );
};

export default CustomImage;
