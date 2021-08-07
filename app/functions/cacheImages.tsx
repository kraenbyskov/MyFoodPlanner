import { cacheDirectory, getInfoAsync, downloadAsync } from "expo-file-system";
import shorthash from "shorthash";

const cacheImages = async (uri) => {
  const name = shorthash.unique(uri);
  const path = `${cacheDirectory}${name}`;
  const image = await getInfoAsync(path);
  if (!image.exists) {
    await downloadAsync(uri, path);
  }
};

export default cacheImages;
