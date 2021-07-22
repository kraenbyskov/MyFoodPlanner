import React, { FC } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import {
  View,
  StyleSheet,
  TouchableHighlight,
  Image,
  Text,
  ScrollView,
} from "react-native";
import firebase from "firebase";

import { theme } from "../../core/theme";
import { useNavigation } from "@react-navigation/native";

interface NewRecipesInterface {
  navigation?: any;
}

const NewRecipes: FC<NewRecipesInterface> = () => {
  const navigation = useNavigation();

  const [GetData, setGetData]: any = React.useState(null);
  const query = firebase
    .firestore()
    .collection("Allrecipes")
    .where("Owner.UserID", "==", firebase.auth().currentUser.uid)
    .limit(6);
  const [Food]: any = useCollectionData(query);
  React.useEffect(() => {
    setGetData(Food);
  }, [Food]);

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            marginBottom: 10,
            fontSize: 20,
            fontFamily: "Lato_400Regular",
          }}
        >
          Nye Opskrifter
        </Text>
        <Text
          style={{
            marginBottom: 10,
            fontSize: 20,
            fontFamily: "Lato_400Regular",
          }}
        >
          See all {">"}
        </Text>
      </View>
      <ScrollView horizontal={true}>
        {GetData &&
          GetData.map((data, index) => (
            <TouchableHighlight
              key={index}
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
              </View>
            </TouchableHighlight>
          ))}
      </ScrollView>
    </View>
  );
};

export default NewRecipes;

const styles = StyleSheet.create({
  Title: {
    fontSize: 18,
    bottom: 20,
  },
  RecipeImage: {
    width: "100%",
    height: 300,
    borderRadius: 10,
  },
  Card: {
    width: 250,
    height: 400,
    backgroundColor: "white",
    borderRadius: 10,
    marginRight: 10,
  },
  Content: {
    flex: 1,
    justifyContent: "space-between",
  },
});
