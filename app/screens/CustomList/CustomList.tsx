import React from "react";
import { RefreshControl, Text } from "react-native";
import { AppBar, RecipeCard } from "../../components";
import { View, StyleSheet, SafeAreaView, ScrollView } from "react-native";

import { clearFoodList } from "../../functions";

import {
  connect,
  bindActionCreators,
  deleteFromstCustomList,
  GetCustomList,
} from "../../redux/actions";

import Portal from "./CustomListPortal";
import TopButtons from "./CustomListTopButtons";

function CustomList({ navigation, CustomRecipesList, GetCustomList }) {
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    GetCustomList();
    setRefreshing(false);
  }, []);
  console.log(CustomRecipesList);
  const [visible, setVisible] = React.useState(false);
  const [toDay, setToDay] = React.useState("");
  const hideDialog = () => setVisible(false);

  React.useEffect(() => {
    GetCustomList();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AppBar />
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <TopButtons navigation={navigation} clearFoodList={clearFoodList} />
        <View style={styles.content}>
          <Text>7 Dags Plan</Text>
          {CustomRecipesList
            ? CustomRecipesList.map((data, index) => {
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
              })
            : null}

          {/* <Text>ekstra</Text>
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
            })} */}
        </View>
      </ScrollView>
      <Portal visible={visible} toDay={toDay} hideDialog={hideDialog} />
    </SafeAreaView>
  );
}

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  CustomRecipesList: store.recepiesState.CustomRecipesList,
});

const mapDispatchProps = (dispatch) =>
  bindActionCreators({ deleteFromstCustomList, GetCustomList }, dispatch);

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
