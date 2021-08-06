import React from "react";
require("firebase/firestore");
import { Text, View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import firebase from "firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { MainContainer, RecipeCard } from "../../components";
import { IconButton } from "react-native-paper";
import { cacheDirectory, getInfoAsync, downloadAsync } from "expo-file-system";
import { theme } from "../../core/theme";
import shorthash from "shorthash"

import {
  PickerComponent as Picker,
  CustomPortal as Portal,
  AddToCustomList,
} from "../../components/";

const List = ({ navigation, Message }) => {

  const [GetData, setGetData]: any = React.useState(null);
  console.log()
  const [addToCustomListState, setAddToCustomListState]: any =
    React.useState(null);
  const [selectedValue, setSelectedValue] = React.useState("Mandag");
  const [visible, setVisible] = React.useState(false);

  const addToCustomListDialog = (data) => {
    setVisible(true);
    setAddToCustomListState(data);
  };


  const query = firebase
    .firestore()
    .collection("Allrecipes")
    .where(
      "Owner.UserID",
      "==",
      firebase.auth().currentUser.uid
    );

  const cacheImages = async (uri) => {
    const name = shorthash.unique(uri)
    const path = `${cacheDirectory}${name}`
    const image = await getInfoAsync(path);
    if (image.exists) {
      return image.uri
    }

    const newImage = await downloadAsync(uri, path)
    return newImage.uri

  }




  React.useEffect(() => {
    const array = []
    query.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const object = doc.data()
        // cacheImages(doc.data().downloadUrl).then((data) => {
        //   object.downloadUrl = data
        // })
        array.push(object)

      })
      setGetData(array);
    })
  }, []);


  return (
    <MainContainer scroll={true}>
      <View style={styles.Container}>
        <View style={{ flex: 1, width: "100%" }}>
          {GetData &&
            GetData.map((data, index) => (
              <RecipeCard key={index} navigation={navigation} data={data}>
                <IconButton
                  color={theme.colors.secondary}
                  size={25}
                  icon="check"
                  onPress={() => addToCustomListDialog(data)}
                />
              </RecipeCard>
            ))}

          <AddToCustomList
            visible={visible}
            setVisible={setVisible}
            addToCustomListState={addToCustomListState}
            setState={setSelectedValue}
            state={selectedValue}
          />
        </View>
      </View>

      <Text>{Message}</Text>

      <View
        style={{ bottom: 0, width: "100%", flex: 1, position: "absolute" }}
      ></View>
    </MainContainer>
  );
};

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});
export default connect(mapStateToProps, null)(List);

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    flexWrap: "wrap",
    marginTop: 0,
  },
});
