import React, { FC, useState, useEffect } from "react";
import { Dialog, Portal } from "react-native-paper";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { theme } from "../../core/theme";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  Image,
  Text,
} from "react-native";
import firebase from "firebase";

import {
  bindActionCreators,
  connect,
  addToCustomList,
} from "../../redux/actions";
import CachedImage from 'expo-cached-image'

interface CustomListPortalInterface {
  visible: any;
  hideDialog: any;
  navigation?: any;
  addToCustomList?: any;
  toDay: string;
  AllRecipes: any;
}

const CustomListPortal: FC<CustomListPortalInterface> = ({
  visible,
  hideDialog,
  addToCustomList,
  toDay,
  AllRecipes,
}) => {
  const addToCustomListButton = (data, day) => {
    addToCustomList(data, day);
    hideDialog();
  };

  const [recipes, setRecipes] = useState(null);
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
    <Portal>
      <Dialog
        style={{ backgroundColor: "lightgray" }}
        visible={visible}
        onDismiss={hideDialog}
      >
        <Dialog.Content>
          <ScrollView style={styles.Container}>
            {recipes &&
              recipes.map((data, index) => (
                <TouchableHighlight
                  key={index}
                  style={styles.Card}
                  underlayColor={theme.colors.primary}
                  onPress={() => addToCustomListButton(data, toDay)}
                >
                  <View style={styles.Content}>
                    {data.downloadUrl === "" ?
                      <Image style={styles.RecipeImage} source={require("../../assets/photo-1512621776951-a57141f2eefd.png")} />
                      :
                      <CachedImage source={{ uri: `${data.downloadUrl}` }}
                        cacheKey={`${data.Id}-thumb`} style={styles.RecipeImage} />
                    }


                    <Text style={styles.Title}>{data.Name}</Text>
                  </View>
                </TouchableHighlight>
              ))}
          </ScrollView>
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
};

const mapStateToProps = (store) => ({
  AllRecipes: store.recepiesState.AllRecipes,
});

const mapDispatchProps = (dispatch) =>
  bindActionCreators({ addToCustomList }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(CustomListPortal);

const styles = StyleSheet.create({
  Container: {
    width: "100%",
  },
  Card: {
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

  Title: {
    marginRight: 20,
    fontSize: 18,
  },
});
