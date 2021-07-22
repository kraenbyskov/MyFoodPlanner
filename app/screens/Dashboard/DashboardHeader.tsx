import React from "react";
import { connect } from "react-redux";
import { View, StyleSheet, Text, ImageBackground } from "react-native";
import { AppBar } from "../../components";
import { theme } from "../../core/theme";

export const DashboardHeader = ({ currentUser }) => {
  return (
    <View style={styles.TopDashboard}>
      <ImageBackground
        source={require("../../assets/background.jpg")}
        style={{ width: "100%", height: 330, paddingTop: 150 }}
      >
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
  );
};

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardHeader);

const styles = StyleSheet.create({
  TopDashboard: {
    top: -50,
    backgroundColor: theme.colors.primary,
    height: 300,
  },
});
