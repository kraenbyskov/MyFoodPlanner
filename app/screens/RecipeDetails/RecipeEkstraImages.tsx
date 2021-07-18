import React from "react";
import { StyleSheet } from "react-native";
import { View, Text, Image, ScrollView } from "react-native";
import { Card, Avatar, Paragraph, Title } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { theme } from "../../core/theme";

const array = [1, 23];

const RecipeEkstraImages = ({ Data }) => {
  return (
    <View>
      <Card
        style={{
          marginLeft: 10,
          marginRight: 10,
          marginBottom: 10,
          height: "auto",
          padding: 0,
        }}
      >
        <Card.Content style={{ flexDirection: "row" }}>
          <ScrollView horizontal={true}>
            {array.map(() => (
              <Image source={{ uri: Data.downloadUrl }} style={styles.Image} />
            ))}
            <View style={styles.AddImage}>
              <MaterialCommunityIcons
                name="camera"
                color={theme.colors.primary}
                size={50}
              />
            </View>
          </ScrollView>
        </Card.Content>
      </Card>
    </View>
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
