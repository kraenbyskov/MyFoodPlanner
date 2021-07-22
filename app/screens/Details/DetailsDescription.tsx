import React from "react";
import { StyleSheet } from "react-native";
import { View, Text } from "react-native";
import { Paragraph, Title } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { CustomCard as Card } from "../../components";

const RecipeDescription = ({ Data }) => {
  const { Name, description, Owner } = Data;
  return (
    <View style={{ marginTop: -50 }}>
      <Card title={Name} subtitle={Owner.User}>
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <View style={styles.TextBox}>
            <Text style={styles.Text}>
              <MaterialCommunityIcons name="clock-check-outline" size={20} />
            </Text>
            <Text style={styles.Text}>30 min.</Text>
          </View>
          <View style={styles.TextBox}>
            <Text style={styles.Text}>
              <MaterialCommunityIcons name="fire" size={20} />
            </Text>
            <Text style={styles.Text}>400 Kcal.</Text>
          </View>
        </View>
      </Card>
      {description ? (
        <Card>
          <Title>Beskrivelse</Title>
          <Paragraph>{description}</Paragraph>
        </Card>
      ) : null}
    </View>
  );
};

export default RecipeDescription;

const styles = StyleSheet.create({
  Text: {
    paddingRight: 10,
  },
  TextBox: {
    flexDirection: "row",
    alignItems: "center",
  },
});
