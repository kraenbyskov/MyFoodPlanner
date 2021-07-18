import React from "react";
import { MainContainer, RecipeCard, AppBar } from "../../components";
import {
  View,
  StyleSheet,
  TouchableHighlight,
  Image,
  Text,
  ScrollView,
  ImageBackground,
} from "react-native";
import firebase from "firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { SafeAreaView } from "react-native";
import { theme } from "../../core/theme";

import {
  connect,
  bindActionCreators,
  addToCustomList,
} from "../../redux/actions";

const Dashboard = ({ currentUser, navigation, addToCustomList }) => {
  const [GetData, setGetData]: any = React.useState(null);
  const query = firebase
    .firestore()
    .collection("Allrecipes")
    .where("Owner.UserID", "==", firebase.auth().currentUser.uid)
    .limit(4);
  const [Food]: any = useCollectionData(query);
  React.useEffect(() => {
    setGetData(Food);
  }, [Food]);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.TopDashboard}>
        <ImageBackground
          source={require("../../assets/background.jpg")}
          style={{ width: "100%", height: 330, top: -50, paddingTop: 100 }}
        >
          <AppBar mainColor="white" />
          <Text
            style={{
              fontSize: 40,
              fontFamily: "Lato_900Black",
              color: "white",
              textAlign: "center",
            }}
          >
            Hej {currentUser && currentUser.name}!
          </Text>
        </ImageBackground>
      </View>
      <ScrollView
        style={{
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          top: -100,
          backgroundColor: theme.colors.background,
          padding: 20,
        }}
      >
        <Text
          style={{
            marginBottom: 10,
            fontSize: 20,
            fontFamily: "Lato_400Regular",
          }}
        >
          Nye Opskrifter
        </Text>
        <View style={styles.RecipeContainer}>
          {GetData &&
            GetData.map((data, index) => (
              <TouchableHighlight
                style={styles.Card}
                underlayColor={theme.colors.primary}
                onPress={() => navigation.navigate("RecipeDetails", data)}
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});

const mapDispatchProps = (dispatch) =>
  bindActionCreators({ addToCustomList }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Dashboard);

const styles = StyleSheet.create({
  TopDashboard: {
    top: -50,
    backgroundColor: theme.colors.primary,
    height: 300,
  },
  container: {
    flex: 1,
    padding: 20,
    width: "100%",
    alignSelf: "center",
  },
  RecipeContainer: {
    flex: 1,
    flexWrap: "wrap",
    marginTop: 8,
    maxHeight: 400,
    flexDirection: "row",
  },
  Title: {
    fontSize: 18,
    bottom: 10,
  },
  RecipeImage: {
    width: "90%",
    height: 150,
    marginTop: "5%",
    borderRadius: 10,
  },
  Card: {
    width: "45%",
    height: 200,
    margin: "2.5%",
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.06,
    shadowRadius: 3.68,
    elevation: 10,
  },
  Content: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  NonScroll: {
    alignItems: "center",
    justifyContent: "center",
  },
});
