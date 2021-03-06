import React, { FC } from "react";
import { Pressable, RefreshControl, Text } from "react-native";
import { AppBar, RecipeCard, TabSwitch } from "../../components";
import { View, StyleSheet, SafeAreaView, ScrollView } from "react-native";

import { clearFoodList } from "../../functions";

import firebase from "firebase";
import { theme } from "../../core/theme";
import Portal from "./CustomListPortal";
import TopButtons from "./CustomListTopButtons";


interface CustomListInterface {
  navigation: () => void
}

const CustomList: FC<CustomListInterface> = ({ navigation }) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [list, setList] = React.useState([]);
  const [switchState, setSwitchState] = React.useState(false);

  const [visible, setVisible] = React.useState(false);
  const [toDay, setToDay] = React.useState("");
  const hideDialog = () => setVisible(false);

  const FirebaseAuth: { currentUser: any } = firebase.auth()
  const query = firebase
    .firestore()
    .collection("AddToCustomList")
    .doc(FirebaseAuth.currentUser.uid)
    .collection("CustomList");

  const onCollection = async (querySnapshot: any[]) => {
    const collectAndSort = new Promise((resolve, reject) => {
      const Data = [
        { day: "Mandag", empty: true },
        { day: "Tirsdag", empty: true },
        { day: "Onsdag", empty: true },
        { day: "Torsdag", empty: true },
        { day: "Fredag", empty: true },
        { day: "Lørdag", empty: true },
        { day: "Søndag", empty: true },
      ];
      querySnapshot.forEach((doc) => {
        const { day } = doc.data();

        Data.map((Weekdays, index) => {
          if (Weekdays.day === day) {
            Weekdays.empty = false;
            Data.splice(index, 1, { ...Weekdays, ...doc.data() });
          }
        });
      });
      resolve(Data);
      reject([
        { day: "Mandag", empty: true },
        { day: "Tirsdag", empty: true },
        { day: "Onsdag", empty: true },
        { day: "Torsdag", empty: true },
        { day: "Fredag", empty: true },
        { day: "Lørdag", empty: true },
        { day: "Søndag", empty: true },
      ]);
    });
    collectAndSort
      .then((array: any) => {
        setList(array);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    query.onSnapshot(() => onCollection);
    setRefreshing(false);
  }, []);

  React.useEffect(() => {
    query.onSnapshot(() => onCollection);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopButtons navigation={navigation} clearFoodList={clearFoodList} />
      <TabSwitch setSwitchState={setSwitchState} switchState={switchState} />
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.content}>
          {list
            ? list.map((data: { day: string }, index) => {
              return (
                <View key={index}>
                  <Text style={{ marginBottom: 5 }}>{data.day}</Text>
                  <RecipeCard
                    switchState={switchState}
                    setVisible={setVisible}
                    setToDay={setToDay}
                    navigation={navigation}
                    data={data}
                  />
                </View>
              );
            })
            : null}
        </View>
      </ScrollView>
      <Portal visible={visible} toDay={toDay} hideDialog={hideDialog} />
    </SafeAreaView>
  );
}

export default CustomList;

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
