import React, { FC } from "react";
import {
  View,
  StyleSheet,
  TouchableHighlight,
  Image,
  Text,
} from "react-native";
import { theme } from "../../core/theme";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

interface RecipeCardInterface {
  navigation: any;
  data: { downloadUrl?: string; Name?: string; empty?: boolean };
  children?: any;
  //   setVisible: (boolean: boolean) => void;
}

const RecipeCard: FC<RecipeCardInterface> = ({
  navigation,
  data,
  children,
  //   setVisible,
}) => {
  return !data.empty ? (
    <TouchableHighlight
      style={styles.Card}
      underlayColor={theme.colors.primary}
      onPress={() => navigation.navigate("RecipeDetails", data)}
    >
      <View style={styles.Content}>
        <Image
          style={styles.RecipeImage}
          source={
            data.downloadUrl
              ? { uri: data.downloadUrl }
              : require("../../assets/photo-1512621776951-a57141f2eefd.png")
          }
        />
        <Text style={styles.Title}>{data.Name}</Text>
        <View style={styles.Icons}>{children}</View>
      </View>
    </TouchableHighlight>
  ) : (
    <TouchableHighlight
      style={[styles.Card, styles.CardEmpty]}
      underlayColor={theme.colors.primary}
      //   onPress={() => setVisible(true)}
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
    height: 50,
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
    elevation: 10,
  },
  CardEmpty: {
    borderWidth: 2,
    borderColor: "lightgray",
    borderStyle: "dashed",
    backgroundColor: null,
  },
  RecipeImage: {
    marginLeft: 5,
    width: 30,
    height: 30,
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
