import React, { useState, useEffect, FC } from "react";
require("firebase/firestore");
import { Text, View, StyleSheet } from "react-native";
import firebase from "firebase";
import { MainContainer, RecipeCard, TextInput } from "../../components";
import { IconButton } from "react-native-paper";
import { theme } from "../../core/theme";

import {
  PickerComponent as Picker,
  CustomPortal as Portal,
  AddToCustomList,
} from "../../components";

interface SearchRecipeInterface {
  navigation: any
}

const SearchRecipe: FC<SearchRecipeInterface> = ({ navigation }) => {
  const [searchValue, setSearchValue] = React.useState({ value: "", error: "" });


  return (
    <MainContainer scroll={true}>
      <View style={styles.Container}>
        <View style={{ flex: 1, width: "100%" }}>

          <Text>Search</Text>
          <TextInput
            label="Search"
            returnKeyType="next"
            value={searchValue.value}
            onChangeText={(text) => setSearchValue({ value: text, error: "" })}
            error={!!searchValue.error}
            errorText={searchValue.error}
          />

        </View>
      </View>

      <View
        style={{ bottom: 0, width: "100%", flex: 1, position: "absolute" }}
      ></View>
    </MainContainer>
  );
};

export default SearchRecipe;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    flexWrap: "wrap",
    marginTop: 0,
  },
});
