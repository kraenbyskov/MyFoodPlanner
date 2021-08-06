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
import {
  connect,
  bindActionCreators,
  GetAllRecipes,
} from "../../redux/actions";

interface RecipeCardInterface {
  navigation: any;
  data: { downloadUrl?: string; Name?: string; empty?: boolean; day: string };
  children?: any;
  setVisible?: (boolean: boolean) => void;
  setToDay?: any;
  GetAllRecipes?: any;
}

const FeedCard: FC<RecipeCardInterface> = ({
  navigation,
  data,
  children,
  setVisible,
  setToDay,
  GetAllRecipes,
}) => {
  const getAllRecipesPopUp = () => {
    GetAllRecipes();
    setVisible(true);
    setToDay(data.day);
  };

  return (
    <View style={styles.Container}>
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
        </View>
      </TouchableHighlight>
    </View>
  )
};

const mapStateToProps = (store) => ({
  AllRecipes: store.recepiesState.AllRecipes,
});

const mapDispatchProps = (dispatch) =>
  bindActionCreators({ GetAllRecipes }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(FeedCard);

const styles = StyleSheet.create({
  Container: {
    width: "33%",
    height: 128,
    padding: 4,
  },
  Card: {
    height: 120,
    backgroundColor: "white",
    borderRadius: 5,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.06,
    shadowRadius: 3.68,
  },

  RecipeImage: {
    width: "100%",
    height: 120,
    borderRadius: 5,
  },
  Content: {
  },

  Title: {
    top: 5,
    marginLeft: 5,
    fontSize: 12,
  },
  Icons: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    // backgroundColor: 'orange'
  },
});
