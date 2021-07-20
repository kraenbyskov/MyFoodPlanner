import React, { FC } from "react";
import { Card } from "react-native-paper";
import { StyleSheet } from "react-native";

interface CustomCardInterface {
  title?: string;
  subtitle?: string;
  CustomStyle?: {};
  children: any;
}

const CustomCard: FC<CustomCardInterface> = ({
  title,
  subtitle,
  children,
  CustomStyle,
}) => {
  return title ? (
    <Card style={[CustomStyle, style.card]}>
      <Card.Title title={title} subtitle={subtitle} />
      <Card.Content>{children}</Card.Content>
    </Card>
  ) : (
    <Card style={[CustomStyle, style.card]}>
      <Card.Content>{children}</Card.Content>
    </Card>
  );
};

export default CustomCard;

const style = StyleSheet.create({
  card: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    height: "auto",
    padding: 5,
  },
});
