import React, { useEffect, FC } from "react";

import {
  connect,
  bindActionCreators,
  fetchUser,
  clearData,
} from "../redux/actions/index";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Icon from "react-native-vector-icons/FontAwesome";
import { theme } from "../core/theme";

import DasbhoardScreen from "./Dashboard/Dashboard";
import ProfileScreen from "./Profile/Profile";
import RecipesScreen from "./SearchRecipe/SearchRecipe";
import CustomListScreen from "./CustomList/CustomList";
import { View } from "react-native";
import { Dispatch, AnyAction } from "redux";

const Tab = createBottomTabNavigator();

interface EmptyScreeenInterface { }

const EmptyScreen: FC<EmptyScreeenInterface> = () => {
  return <View />;
};

const Main = (props: { clearData: () => void; fetchUser: () => void; }) => {
  useEffect(() => {
    props.clearData();
    props.fetchUser();
  }, []);

  return (
    <Tab.Navigator


      screenOptions={{
        tabBarStyle: {
          position: "absolute",
          bottom: 20,
          left: 20,
          right: 20,
          paddingTop: 20,
          elevation: 4,
          backgroundColor: "white",
          borderRadius: 15,
          height: 65,
          borderTopWidth: 0,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.06,
          shadowRadius: 3.68,
        },
        tabBarItemStyle: {
          height: 65,
          top: -20,

        },
        tabBarIconStyle: {
          color: "blue"
        },
        tabBarShowLabel: false
      }}



    >
      <Tab.Screen
        name="Dasbhoard"
        component={DasbhoardScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="CustomList"
        component={CustomListScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="playlist-check"
              color={color}
              size={26}
            />
          ),
        }}
      />

      <Tab.Screen
        name="AddContainerdsads"
        component={EmptyScreen}
        listeners={({ navigation }) => ({
          tabPress: (event) => {
            event.preventDefault();
            navigation.navigate("AddRecipe");
          },
        })}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <View
              style={{
                flex: 1,
                position: "absolute",
                shadowColor: "#000",
                shadowOffset: {
                  width: 1,
                  height: 3,
                },
                shadowOpacity: 0.16,
                shadowRadius: 3.68,
                justifyContent: "center",
                alignItems: "center",
                width: 70,
                height: 70,
                top: -30,
                borderRadius: 100,
                backgroundColor: theme.colors.primary,
              }}
            >
              <MaterialCommunityIcons
                style={{
                  color: "white",
                }}
                name="plus"
                color={color}
                size={50}
              />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="SearchRecipe"
        component={RecipesScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Icon
              name="search"
              color={color}
              size={26}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};


const mapDispatchProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators({ fetchUser, clearData }, dispatch);

export default connect(null, mapDispatchProps)(Main);
