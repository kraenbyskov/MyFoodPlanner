import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import { Button, AppBar, RecipeCard } from "../../components";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  StatusBar,
  ScrollView,
} from "react-native";
import { connect } from "react-redux";
import { Dialog, Portal, TextInput as Input, List } from "react-native-paper";

import firebase from "firebase";
import { IconButton } from "react-native-paper";
import { clearFoodList } from "../../functions";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { bindActionCreators } from "redux";
import { deleteFromstCustomList } from "../../redux/actions";

let sevenDaysPlan = [
  { day: "Mandag", empty: true },
  { day: "Tirsdag", empty: true },
  { day: "Onsdag", empty: true },
  { day: "Torsdag", empty: true },
  { day: "Fredag", empty: true },
  { day: "Lørdag", empty: true },
  { day: "Søndag", empty: true },
];
const resetDays = [
  { day: "Mandag", empty: true },
  { day: "Tirsdag", empty: true },
  { day: "Onsdag", empty: true },
  { day: "Torsdag", empty: true },
  { day: "Fredag", empty: true },
  { day: "Lørdag", empty: true },
  { day: "Søndag", empty: true },
];

function CustomList({ navigation, deleteFromstCustomList }) {
  const [GetData, setGetData]: any = React.useState(null);
  const [GetEkstra, setGetEkstra]: any = React.useState(null);
  const db = firebase
    .firestore()
    .collection("AddToCustomList")
    .doc(firebase.auth().currentUser.uid)
    .collection("CustomList");

  const esktraRecipes = db.where("day", "==", "ekstra");
  const sevenDays = db.where("day", "!=", "ekstra");
  const [ekstraPlan]: any = useCollectionData(esktraRecipes);
  const [weekPlan]: any = useCollectionData(sevenDays);
  const [visible, setVisible] = React.useState(false);
  const hideDialog = () => setVisible(false);

  React.useEffect(() => {
    setGetData(weekPlan);
    setGetEkstra(ekstraPlan);
  }, [weekPlan, ekstraPlan]);

  if (GetData) {
    weekPlan.map((element) => {
      sevenDaysPlan.map((Weekdays, index) => {
        if (Weekdays.day === element.day) {
          Weekdays.empty = false;
          sevenDaysPlan.splice(index, 1, { ...Weekdays, ...element });
        }
      });
    });
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AppBar />
      <View style={styles.ButtonView}>
        <Button
          icon="delete"
          style={{ width: "40%" }}
          onPress={() => {
            clearFoodList();
            sevenDaysPlan = resetDays;
          }}
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
      {/* <ScrollView style={styles.container}>
        <View style={styles.content}>
          <Text>7 Dags Plan</Text>
          {sevenDaysPlan.map((data, index) => {
            return (
              <View key={index}>
                <Text style={{ marginBottom: 5 }}>{data.day}</Text>
                <RecipeCard navigation={navigation} data={data} />
              </View>
            );
          })}

          <Text>ekstra</Text>
          {GetEkstra &&
            GetEkstra.map((data, index) => {
              return (
                <View key={index}>
                  <RecipeCard navigation={navigation} data={data} />
                </View>
              );
            })}
        </View>
      </ScrollView>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Alert</Dialog.Title>
          <Dialog.Content>
            <Text>hello</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Text>hello</Text>
          </Dialog.Actions>
        </Dialog>
      </Portal> */}
    </SafeAreaView>
  );
}

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});

const mapDispatchProps = (dispatch) =>
  bindActionCreators({ deleteFromstCustomList }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(CustomList);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignSelf: "center",
    marginBottom: 50,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },

  ButtonView: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
});
