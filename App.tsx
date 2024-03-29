import React from "react";
import { View, LogBox } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider as PaperProvider } from "react-native-paper";

import { ActivityIndicator } from "react-native-paper";

import firebase from "firebase";

LogBox.ignoreLogs(["Setting a timer"]);
LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

import { Provider } from "react-redux";
import LandingScreen from "./app/screens/auth/Landing";
import RegisterScreen from "./app/screens/auth/Register";
import LoginScreen from "./app/screens/auth/Login";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./app/redux/reducers/index";
import thunk from "redux-thunk";
import MainScreen from "./app/screens/Main";
import { MessageComponent } from "./app/components";

import {
  useFonts,
  Lato_100Thin,
  Lato_100Thin_Italic,
  Lato_300Light,
  Lato_300Light_Italic,
  Lato_400Regular,
  Lato_400Regular_Italic,
  Lato_700Bold,
  Lato_700Bold_Italic,
  Lato_900Black,
  Lato_900Black_Italic,
} from "@expo-google-fonts/lato";

import AddScreen from "./app/components/Organisms/AddImage";
import AddRecipeScreen from "./app/screens/AddRecipe/AddRecipe";
import RecipeDetailsScreen from "./app/screens/Details/Details";
import ProfileScreen from "./app/screens/Profile/Profile";
import BugReportScreen from "./app/screens/BugReport/BugReport";
import { theme } from "./app/core/theme";
import EditProfileScreen from "./app/screens/EditProfile/EditProfile";
import SettingsScreen from "./app/screens/Settings/Settings";

const Stack = createStackNavigator();
const store = createStore(rootReducer, applyMiddleware(thunk));

const firebaseConfig = {
  apiKey: "AIzaSyD3LazlxdCrVt3qIuc7qxa7j0MTFvo-mjM",
  authDomain: "myfoodplanner-7f63b.firebaseapp.com",
  projectId: "myfoodplanner-7f63b",
  storageBucket: "myfoodplanner-7f63b.appspot.com",
  messagingSenderId: "986565033593",
  appId: "1:986565033593:web:215e0d9c0cae0a5e0d5ea8",
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const App = () => {
  let [fontsLoaded] = useFonts({
    Lato_100Thin,
    Lato_100Thin_Italic,
    Lato_300Light,
    Lato_300Light_Italic,
    Lato_400Regular,
    Lato_400Regular_Italic,
    Lato_700Bold,
    Lato_700Bold_Italic,
    Lato_900Black,
    Lato_900Black_Italic,
  });

  const navTheme = DefaultTheme;
  navTheme.colors.background = theme.colors.background;

  const [LoggedIn, setLoggedIn] = React.useState(false);
  const [Loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        setLoaded(true);
        setLoggedIn(false);
      } else {
        setLoaded(true);
        setLoggedIn(true);
      }
    });
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }

  if (!Loaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator
          size="large"
          animating={true}
          hidesWhenStopped={true}
          color={theme.colors.primary}
        />
      </View>
    );
  }

  if (!LoggedIn) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Lading">
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer theme={DefaultTheme}>
          <Stack.Navigator initialRouteName="Main">
            <Stack.Screen
              name="Main"
              component={MainScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Add"
              component={AddScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="AddRecipe"
              component={AddRecipeScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="EditProfile"
              component={EditProfileScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Settings"
              component={SettingsScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Profile"
              component={ProfileScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="BugReport"
              component={BugReportScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="RecipeDetails"
              component={RecipeDetailsScreen}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
        <MessageComponent />
      </PaperProvider>
    </Provider>
  );
};

export default App;
