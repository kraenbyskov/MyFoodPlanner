import React, { FC } from "react";
import { Button } from "../../components";
import { View, StyleSheet } from "react-native";

interface CustomListTopButtonsInterface {
  clearFoodList: any;
  navigation: any;
}

const CustomListTopButtons: FC<CustomListTopButtonsInterface> = ({
  clearFoodList,
  navigation,
}) => {
  return (
    <View style={styles.ButtonView}>
      <Button
        icon="delete"
        style={{ width: "40%" }}
        onPress={() => clearFoodList()}
      >
        Clear List
      </Button>
      <Button
        icon="plus"
        style={{ width: "50%" }}
        onPress={() => navigation.navigate("Recipes")}
      >
        Tilføj flere
      </Button>
    </View>
  );
};

export default CustomListTopButtons;

const styles = StyleSheet.create({
  ButtonView: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
});
