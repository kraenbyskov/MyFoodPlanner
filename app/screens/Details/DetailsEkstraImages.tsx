import React from "react";
import { StyleSheet } from "react-native";
import { View, Text, ScrollView } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { theme } from "../../core/theme";
import CachedImage from 'expo-cached-image'

import { CustomCard as Card } from "../../components";

const array = [1, 23];

const RecipeEkstraImages = ({ Data }) => {
  return (
    <Card>
      <ScrollView horizontal={true}>
        {array.map((index) => (
          <CachedImage key={index} source={{ uri: `${Data.downloadUrl}` }}
            cacheKey={`${Data.Id}-thumb`} style={styles.Image} />
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
