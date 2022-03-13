


import * as React from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import { Button, MainContainer, ProgressBar } from "../../components";
require("firebase/firestore");
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { AddToListMessage } from "../../redux/actions";
import { theme } from "../../core/theme";



const AddFoodToListScreen = (props) => {
  const [Steps, setSteps] = React.useState(1)

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ProgressBar Steps={Steps} />
      <View style={style.Content}>

        <View style={{ position: "absolute", marginTop: 30, flex: 1, width: "100%", flexDirection: "row" }}>



          <Button style={{ width: "45%", marginRight: "10%" }} mode="outlined" onPress={console.log()}>
            Preview
          </Button>
          <Button style={{ width: "45%" }} mode="contained" onPress={() => setSteps(Steps + 1)}>
            Next
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});

const mapDispatchProps = (dispatch) =>
  bindActionCreators({ AddToListMessage }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(AddFoodToListScreen);


const style = StyleSheet.create({
  Content: {
    flex: 1,
    width: "100%",
    borderColor: "orange",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10
  },
  barStyle: {
    backgroundColor: "green",
    top: 0,
    flex: 1,
  },
});
