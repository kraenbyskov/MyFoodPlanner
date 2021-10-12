


import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import { TextInput, Button, MainContainer } from "../../components";
import firebase from "firebase";
import AddRecipeImage from "./AddRecipeImage";
import { List, ProgressBar } from "react-native-paper";
require("firebase/firestore");
import { connect } from "react-redux";
import { Snackbar } from "react-native-paper";
import { bindActionCreators } from "redux";
import { AddToListMessage } from "../../redux/actions";
import { theme } from "../../core/theme";

const style = StyleSheet.create({
  Content: {
    flex: 1,
    width: "100%",
    borderColor: "orange",
    justifyContent: "space-between",
    alignItems: "center",
  },
  barStyle: {
    backgroundColor: "green",
    top: 0,
    flex: 1,
  },
});

const AddFoodToListScreen = (props) => {
  const [Steps, setSteps] = React.useState(0.2)

  return (
    <MainContainer scroll={true}>
      <ProgressBar progress={Steps} color={theme.colors.primary} />
      <View style={style.Content}>

        <View style={{ position: "absolute", marginTop: 30, flex: 1, width: "100%", flexDirection: "row" }}>



          <Button style={{ width: "45%", marginRight: "10%" }} mode="outlined" onPress={console.log()}>
            Preview
          </Button>
          <Button style={{ width: "45%" }} mode="contained" onPress={() => setSteps(Steps + 0.2)}>
            Next
          </Button>
        </View>
      </View>
    </MainContainer>
  );
};

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});

const mapDispatchProps = (dispatch) =>
  bindActionCreators({ AddToListMessage }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(AddFoodToListScreen);






// import * as React from "react";
// import { Text, View, StyleSheet } from "react-native";
// import { TextInput, Button, MainContainer } from "../../components";
// import firebase from "firebase";
// import AddRecipeImage from "./AddRecipeImage";
// import { List } from "react-native-paper";
// require("firebase/firestore");
// import { connect } from "react-redux";
// import { Snackbar } from "react-native-paper";
// import { bindActionCreators } from "redux";
// import { AddToListMessage } from "../../redux/actions";

// const style = StyleSheet.create({
//   Content: {
//     flex: 1,
//     width: "100%",
//     borderColor: "orange",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   barStyle: {
//     backgroundColor: "green",
//     top: 0,
//     flex: 1,
//   },
// });

// const AddFoodToListScreen = (props) => {
//   const [title, setTitle] = React.useState({ value: "", error: "" });
//   const AddToList = async () => {
//     const uri = props.route.params.image;
//     const childPath = `post/${firebase.auth().currentUser.uid
//       }/${Math.random().toString(36)}`;

//     const response = await fetch(uri);
//     const blob = await response.blob();
//     const task = firebase.storage().ref().child(childPath).put(blob);

//     const taskProgress = (snapshot) => {
//       let percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//       props.AddToListMessage({ title: percent });
//     };

//     const taskCompleted = () => {
//       task.snapshot.ref.getDownloadURL().then((snapshot) => {
//         const db = firebase.firestore().collection("Allrecipes");
//         const object = {
//           Id: `${firebase.auth().currentUser.uid}_${title.value}`,
//           Name: title.value,
//           downloadUrl: snapshot ? snapshot : require("../../assets/photo-1512621776951-a57141f2eefd.png"),
//           Date: firebase.firestore.FieldValue.serverTimestamp(),
//           Owner: {
//             User: props.currentUser.name,
//             UserID: firebase.auth().currentUser.uid,
//           },
//           CookingTime: "",
//           Calories: "",
//         };
//         db.doc(`${firebase.auth().currentUser.uid}_${title.value}`)
//           .set(object)
//           .then(function () {
//             props.navigation.navigate("RecipeDetails", object);
//           });
//         setTitle({ value: "", error: "" });
//         props.AddToListMessage({ title: title.value });
//       });
//     };
//     const taskError = (snapshot) => {
//       props.AddToListMessage({ title: snapshot });
//     };

//     task.on("state_changed", () => taskProgress, taskError, taskCompleted);
//   };

//   return (
//     <MainContainer scroll={true}>
//       <View style={style.Content}>
//         <AddRecipeImage route={props.route} navigation={props.navigation} />

//         <Text>Tilføj ny Opskrift</Text>

//         <TextInput
//           label="Navn"
//           returnKeyType="next"
//           value={title.value}
//           onChangeText={(text) => setTitle({ value: text, error: "" })}
//           error={!!title.error}
//           errorText={title.error}
//         />
//         <View style={{ marginTop: 30, flex: 1, width: "100%" }}>
//           <Button mode="contained" onPress={AddToList}>
//             Tilføj
//           </Button>
//         </View>
//       </View>
//     </MainContainer>
//   );
// };

// const mapStateToProps = (store) => ({
//   currentUser: store.userState.currentUser,
// });

// const mapDispatchProps = (dispatch) =>
//   bindActionCreators({ AddToListMessage }, dispatch);

// export default connect(mapStateToProps, mapDispatchProps)(AddFoodToListScreen);
