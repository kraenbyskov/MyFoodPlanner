import React, { FC, useState, useEffect } from "react";
import { View, StyleSheet, TouchableHighlight, Text, Image } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { theme } from "../../../core/theme";

interface RecipeCardInterface {
  data: {
    downloadUrl: string;
    Name: string;
    Owner: { User: string };
    Id: string
  };
  index: Number;
  navigation: any;
}

const RecipeCard: FC<RecipeCardInterface> = ({ data, index, navigation }) => {
  return (
    <TouchableHighlight
      style={[styles.Card, { marginLeft: index == 0 ? 20 : 0 }]}
      underlayColor={"white"}
      onPress={() => navigation.navigate("RecipeDetails", data)}
    >
      <View style={styles.Content}>
        <View>
          <Image source={{ uri: `${data.downloadUrl}` }}
            style={styles.RecipeImage} />
          <View
            style={{
              paddingHorizontal: 10,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: -30,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <MaterialCommunityIcons
                name="heart-outline"
                color={"white"}
                size={26}
              />
              <Text
                style={{
                  fontSize: 16,
                  color: "white",
                  paddingLeft: 5,
                }}
              >
                100
              </Text>
            </View>
            <Text style={{ color: "white", fontSize: 16 }}>55 min.</Text>
          </View>
        </View>
        <View style={{ marginTop: 15 }}>
          <Text style={styles.Title}>{data.Name}</Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
          }}
        >

          <Image source={{ uri: `${data.downloadUrl}` }}
            style={{
              aspectRatio: 1 / 1,
              borderRadius: 5,
              width: 40,
              height: 40,
            }} />
          <View style={{ paddingLeft: 5 }}>
            <Text style={styles.Title}>{data.Owner.User}</Text>
            <Text style={[styles.Title, { color: theme.colors.primary }]}>
              {"Rock and roller"}
            </Text>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default RecipeCard;

const styles = StyleSheet.create({
  Title: {
    fontSize: 18,
  },
  RecipeImage: {
    width: "100%",
    height: 300,
    borderRadius: 10,
  },
  Card: {
    width: 250,
    height: 400,
    borderRadius: 10,
    marginRight: 10,
  },
  Content: {
    flex: 1,
    height: 400,
    width: 250,
  },
});
