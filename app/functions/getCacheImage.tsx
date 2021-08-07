import { cacheDirectory, getInfoAsync } from "expo-file-system";
import shorthash from "shorthash";

const getCacheImage = async (uri) => {
  const name = shorthash.unique(uri);
  const path = `${cacheDirectory}${name}`;
  const image = await getInfoAsync(path);

  if (image.exists) {
    return image.uri;
  } else {
    return uri;
  }
};

export default getCacheImage;
