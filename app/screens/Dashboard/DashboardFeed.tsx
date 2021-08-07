import React from "react";
import { View } from "react-native";

import { theme } from "../../core/theme";
import NewRecipes from "./Feed/Recipes";

const Feed = () => {
  return (
    <View
      style={{
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        top: -50,
        backgroundColor: theme.colors.background,
      }}
    >
      <NewRecipes />
    </View>
  );
};

export default Feed;
