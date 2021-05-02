import React, { Component, useEffect, FC } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchUser, clearData } from "../redux/actions/index";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { theme } from "../core/theme";

import DasbhoardScreen from "./main/Dashboard";
import ListScreen from "./main/List";
import AddToListScreen from "./main/AddToList";
import EditFoodScreen from "./main/EditFood";

const Tab = createMaterialBottomTabNavigator();

interface EmptyScreeenInterface {}

const EmptyScreen: FC<EmptyScreeenInterface> = () => {
  return <></>;
};

const Main = (props) => {
  useEffect(() => {
    props.clearData();
    props.fetchUser();
  }, []);

  return (
    <Tab.Navigator
      activeColor="white"
      barStyle={{ backgroundColor: theme.colors.primary }}
      initialRouteName="Dasbhoard"
      labeled={false}
    >
      <Tab.Screen
        name="Dasbhoard"
        component={DasbhoardScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="List"
        component={ListScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />

      <Tab.Screen
        name="AddContainer"
        component={EmptyScreen}
        listeners={({ navigation }) => ({
          tabPress: (event) => {
            event.preventDefault();
            navigation.navigate("AddToList");
          },
        })}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="camera" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});
const mapDispatchProps = (dispatch) =>
  bindActionCreators({ fetchUser, clearData }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Main);
