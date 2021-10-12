import React, { useEffect, FC } from "react";

import {
  connect,
  bindActionCreators,
  fetchUser,
  clearData,
} from "../redux/actions/index";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { theme } from "../core/theme";

import DasbhoardScreen from "./Dashboard/Dashboard";
import ProfileScreen from "./Profile/Profile";
import RecipesScreen from "./RecipesFeed/RecipesFeed";
import CustomListScreen from "./CustomList/CustomList";
import { View } from "react-native";

const Tab = createBottomTabNavigator();

interface EmptyScreeenInterface { }

const EmptyScreen: FC<EmptyScreeenInterface> = () => {
  return <View />;
};

const Main = (props) => {
  useEffect(() => {
    props.clearData();
    props.fetchUser();
  }, []);

  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          position: "absolute",
          bottom: 25,
          left: 20,
          right: 20,
          paddingTop: 20,
          elevation: 4,
          backgroundColor: "#FFFFFF",
          borderRadius: 15,
          height: 75,
          borderTopWidth: 0,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.06,
          shadowRadius: 3.68,
        },
      }}
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
        name="CustomList"
        component={CustomListScreen}
        options={{
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
                top: -50,
                borderRadius: 100,
                backgroundColor: theme.colors.secondary,
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
        name="RecipesFeed"
        component={RecipesScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="format-list-checkbox"
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
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};


const mapDispatchProps = (dispatch) =>
  bindActionCreators({ fetchUser, clearData }, dispatch);

export default connect(null, mapDispatchProps)(Main);
