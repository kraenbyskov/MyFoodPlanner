import React from "react";
import { Text } from "react-native";
import { AppBar, RecipeCard } from "../../components";
import { View, StyleSheet, SafeAreaView, ScrollView } from "react-native";

import firebase from "firebase";
import { clearFoodList } from "../../functions";
import { useCollectionData } from "react-firebase-hooks/firestore";

import {
  connect,
  bindActionCreators,
  deleteFromstCustomList,
} from "../../redux/actions";

import Portal from "./CustomListPortal";
import TopButtons from "./CustomListTopButtons";

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
  const [toDay, setToDay] = React.useState("");
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
      <TopButtons
        navigation={navigation}
        clearFoodList={clearFoodList}
        resetDays={resetDays}
        sevenDaysPlan={sevenDaysPlan}
      />
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <Text>7 Dags Plan</Text>
          {sevenDaysPlan.map((data, index) => {
            return (
              <View key={index}>
                <Text style={{ marginBottom: 5 }}>{data.day}</Text>
                <RecipeCard
                  setVisible={setVisible}
                  setToDay={setToDay}
                  navigation={navigation}
                  data={data}
                />
              </View>
            );
          })}

          <Text>ekstra</Text>
          {GetEkstra &&
            GetEkstra.map((data, index) => {
              return (
                <View key={index}>
                  <RecipeCard
                    setVisible={setVisible}
                    navigation={navigation}
                    data={data}
                  />
                </View>
              );
            })}
        </View>
      </ScrollView>
      <Portal visible={visible} toDay={toDay} hideDialog={hideDialog} />
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
