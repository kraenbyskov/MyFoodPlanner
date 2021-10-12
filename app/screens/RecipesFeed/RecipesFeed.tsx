import React, { useState, useEffect } from "react";
require("firebase/firestore");
import { Text, View, StyleSheet } from "react-native";
import firebase from "firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { MainContainer, RecipeCard } from "../../components";
import { IconButton } from "react-native-paper";
import { theme } from "../../core/theme";

import {
  PickerComponent as Picker,
  CustomPortal as Portal,
  AddToCustomList,
} from "../../components";

const RecipesFeed = ({ navigation }) => {
  const [recipes, setRecipes] = useState(null);
  const [addToCustomListState, setAddToCustomListState]: any = useState(null);
  const [selectedValue, setSelectedValue] = useState("Mandag");
  const [visible, setVisible] = useState(false);

  const addToCustomListDialog = (data) => {
    setVisible(true);
    setAddToCustomListState(data);
  };

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
    <MainContainer scroll={true}>
      <View style={styles.Container}>
        <View style={{ flex: 1, width: "100%" }}>
          {recipes
            ? recipes.map((data, index) => (
              <RecipeCard key={index} navigation={navigation} data={data}>
                <IconButton
                  color={theme.colors.secondary}
                  size={25}
                  icon="check"
                  onPress={() => addToCustomListDialog(data)}
                />
              </RecipeCard>
            ))
            : null}

          <AddToCustomList
            visible={visible}
            setVisible={setVisible}
            addToCustomListState={addToCustomListState}
            setState={setSelectedValue}
            state={selectedValue}
          />
        </View>
      </View>

      <View
        style={{ bottom: 0, width: "100%", flex: 1, position: "absolute" }}
      ></View>
    </MainContainer>
  );
};

export default RecipesFeed;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    flexWrap: "wrap",
    marginTop: 0,
  },
});
