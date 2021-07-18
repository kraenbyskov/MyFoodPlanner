import React from "react";
import { StyleSheet } from "react-native";
import { View, Text } from "react-native";
import { Card, Avatar, Paragraph, Title } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const RecipeDescription = ({ Data }) => {
  const { Name, description, Owner } = Data;
  return (
    <View>
      <Card
        style={{
          marginLeft: 10,
          marginRight: 10,
          marginBottom: 10,
          height: "auto",
          padding: 5,
        }}
      >
        <Card.Title
          title={Name}
          subtitle={Owner.User}
          // left={(props) => <Avatar.Icon {...props} icon="folder" />}
        />
        <Card.Content>
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
        </Card.Content>
      </Card>
      {description ? (
        <Card
          style={{
            marginLeft: 10,
            marginRight: 10,
            marginBottom: 10,
            height: "auto",
            padding: 5,
          }}
        >
          <Card.Content>
            <Title>Beskrivelse</Title>
            <Paragraph>{description}</Paragraph>
          </Card.Content>
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
