import React, { FC, useEffect, useState } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import firebase from "firebase";

import { useNavigation } from "@react-navigation/native";
import { theme } from "../../../core/theme";
import RecipeCard from "./RecipeCard";

interface NewRecipesInterface {}

const NewRecipes: FC<NewRecipesInterface> = () => {
  const navigation = useNavigation();
  const [recipes, setRecipes] = useState(null);
  const db = firebase
    .firestore()
    .collection("Allrecipes")
    .where("Owner.UserID", "==", firebase.auth().currentUser.uid);

  useEffect(() => {
    db.get().then((snapshot) => {
      const array = [];
      snapshot.forEach((doc) => {
        array.push(doc.data());
      });
      setRecipes(array);
    });
  }, []);

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 10,
          padding: 20,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontFamily: "Lato_400Regular",
          }}
        >
          Nye Opskrifter
        </Text>
        <Text
          style={{
            fontSize: 20,
            fontFamily: "Lato_400Regular",
            color: theme.colors.secondary,
          }}
        >
          See all {">"}
        </Text>
      </View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {recipes &&
          recipes
            .splice(0, 5)
            .map((data, index) => (
              <RecipeCard
                key={index}
                data={data}
                index={index}
                navigation={navigation}
              />
            ))}
      </ScrollView>
    </View>
  );
};

export default NewRecipes;

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
