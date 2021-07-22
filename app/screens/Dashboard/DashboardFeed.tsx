import React from "react";
import { View } from "react-native";

import { theme } from "../../core/theme";
import NewRecipes from "./DashboardFeedNewRecipes";

const Feed = () => {
  return (
    <View
      style={{
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        top: -50,
        backgroundColor: theme.colors.background,
        padding: 20,
      }}
    >
      <NewRecipes />
    </View>
  );
};

export default Feed;
