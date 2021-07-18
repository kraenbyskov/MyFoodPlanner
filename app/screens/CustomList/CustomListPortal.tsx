import React, { FC } from "react";
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

import {
  bindActionCreators,
  connect,
  GetAllRecipes,
  addToCustomList,
} from "../../redux/actions";

interface CustomListPortalInterface {
  visible: any;
  hideDialog: any;
  navigation?: any;
  addToCustomList?: any;
  toDay: string;
  AllRecipes: any;
  GetAllRecipes?: any;
}

const CustomListPortal: FC<CustomListPortalInterface> = ({
  visible,
  hideDialog,
  addToCustomList,
  toDay,
  AllRecipes,
}) => {
  const [GetData, setGetData]: any = React.useState(null);
  const [Recipes]: any = useCollectionData(AllRecipes);
  console.log(AllRecipes);

  React.useEffect(() => {
    setGetData(Recipes);
  }, [Recipes]);

  const addToCustomListButton = (data, day) => {
    addToCustomList(data, day);
    hideDialog();
  };

  return (
    <Portal>
      <Dialog
        style={{ backgroundColor: "lightgray" }}
        visible={visible}
        onDismiss={hideDialog}
      >
        <Dialog.Content>
          <ScrollView style={styles.Container}>
            {GetData &&
              GetData.map((data, index) => (
                <TouchableHighlight
                  key={index}
                  style={styles.Card}
                  underlayColor={theme.colors.primary}
                  onPress={() => addToCustomListButton(data, toDay)}
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
        </Dialog.Content>
        <Dialog.Actions>
          <Text>hello</Text>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const mapStateToProps = (store) => ({
  AllRecipes: store.recepiesState.AllRecipes,
});

const mapDispatchProps = (dispatch) =>
  bindActionCreators({ GetAllRecipes, addToCustomList }, dispatch);

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
