import React, { FC } from "react";
import { StyleSheet } from "react-native";
import { View, Text, ScrollView, Image } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { theme } from "../../core/theme";

import { CustomCard as Card } from "../../components";

const array = [1, 23];

interface RecipeEkstraImagesInterface {
  Data: { downloadUrl: string }
}

const RecipeEkstraImages: FC<RecipeEkstraImagesInterface> = ({ Data }) => {
  return (
    <Card>
      <ScrollView horizontal={true}>
        {array.map((index) => (
          <Image key={index} source={
            Data.downloadUrl
              ? { uri: Data.downloadUrl }
              : require("../../assets/photo-1512621776951-a57141f2eefd.png")
          }
            style={styles.Image} />
        ))}
        <View style={styles.AddImage}>
          <MaterialCommunityIcons
            name="camera"
            color={theme.colors.primary}
            size={50}
          />
        </View>
      </ScrollView>
    </Card>
  );
};

export default RecipeEkstraImages;

const styles = StyleSheet.create({
  Image: {
    width: 100,
    height: 100,
    marginRight: 5,
    borderRadius: 10,
  },
  AddImage: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 100,
    marginRight: 5,
    borderRadius: 10,
    borderColor: theme.colors.primary,
    borderWidth: 4,
  },
});
