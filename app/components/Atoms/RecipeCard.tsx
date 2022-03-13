import React, { FC, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableHighlight,
  Image,
  Text,
} from "react-native";
import { theme } from "../../core/theme";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "react-native/Libraries/NewAppScreen";



interface RecipeCardInterface {
  navigation: any;
  data: { downloadUrl?: string; Name?: string; empty?: boolean; day: string, Id?: string };
  children?: any;
  setVisible?: (boolean: boolean) => void;
  setToDay?: any;
  GetAllRecipes?: any;
  switchState: boolean
}

const RecipeCard: FC<RecipeCardInterface> = ({
  navigation,
  data,
  children,
  setVisible,
  setToDay,
  switchState
}) => {
  const getAllRecipesPopUp = () => {
    setVisible(true);
    setToDay(data.day);
  };



  return !data.empty ? (
    <TouchableHighlight
      style={switchState ? styles.Card : styles.CardSmall}
      underlayColor={theme.colors.primary}
      onPress={() => navigation.navigate("RecipeDetails", data)}
    >
      <View style={styles.Content}>
        {switchState ?
          <LinearGradient
            style={styles.overlay}
            colors={["rgba(0,0,0,0.2)", "rgba(0,0,0,0.8)"]}
          /> : null
        }
        <Image style={switchState ? styles.RecipeImage : styles.RecipeImageSmall} source={data.downloadUrl === "" ? require("../../assets/photo-1512621776951-a57141f2eefd.png") : { uri: `${data.downloadUrl}` }} />
        <Text style={switchState ? styles.Title : styles.TitleSmall}>{data.Name}</Text>
        <View style={styles.Icons}>{children}</View>
      </View>
    </TouchableHighlight>
  ) : (
    <TouchableHighlight
      style={[switchState ? styles.Card : styles.CardSmall, styles.CardEmpty, { borderColor: theme.colors.primary, }]}
      underlayColor={"white"}
      onPress={() => getAllRecipesPopUp()}
    >
      <View style={[styles.Content, styles.ContentEmpty]}>
        <MaterialCommunityIcons
          name="plus"
          color={theme.colors.primary}
          size={26}
        />
      </View>
    </TouchableHighlight>
  );
};

export default RecipeCard;

const styles = StyleSheet.create({
  Card: {
    flex: 1,
    width: "100%",
    height: 140,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.06,
    shadowRadius: 3.68,
  },
  CardSmall: {
    flex: 1,
    width: "100%",
    height: 40,
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.06,
    shadowRadius: 3.68,
  },
  overlay: {
    position: "absolute",
    zIndex: 10,
    left: 0,
    top: 0,
    width: "100%",
    borderRadius: 10,
    height: 140,
  },
  CardEmpty: {
    borderWidth: 2,
    borderStyle: "dashed",
    backgroundColor: undefined,
  },
  RecipeImage: {
    marginLeft: 0,
    width: "100%",
    height: 140,
    borderRadius: 10,
  },
  RecipeImageSmall: {
    marginLeft: 0,
    width: 40,
    height: 40,
    borderRadius: 10,
  },
  Content: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 20,
  },
  ContentEmpty: {
    justifyContent: "center",
    alignItems: "center",
  },
  Title: {
    position: "absolute",
    bottom: 10,
    left: 10,
    zIndex: 20,
    color: "white",
    marginLeft: 0,
    fontSize: 18,
  },
  TitleSmall: {
    marginLeft: 10,
    fontSize: 18,
  },
  Icons: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    // backgroundColor: 'orange'
  },
});
