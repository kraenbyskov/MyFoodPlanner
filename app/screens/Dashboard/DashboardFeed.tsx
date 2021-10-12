import React from "react";
import { View } from "react-native";

import { theme } from "../../core/theme";
import NewRecipes from "./Feed/Recipes";
import TodaysRecipes from "./Feed/TodaysRecipes";

const Feed = ({ todaysRecipe }) => {
  return (
    <View
      style={{
        top: -50,
        backgroundColor: theme.colors.background,
      }}
    >
      <TodaysRecipes data={todaysRecipe} />
      {/* <NewRecipes /> */}
    </View>
  );
};

export default Feed;
