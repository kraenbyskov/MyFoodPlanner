import React, { memo, FC } from "react";
import { StyleSheet } from "react-native";
import { Button as PaperButton } from "react-native-paper";
import { theme } from "../../core/theme";

interface ButtonInterface {
  style?: any;
  children: any;
  props?: any;
  onPress?: any;
  icon?: string;
  size?: "small" | "medium" | "large";
  mode?: "contained" | "text" | "outlined"
}

const Button: FC<ButtonInterface> = ({
  icon,
  mode = "contained",
  style,
  children,
  size,
  ...props
}) => (
  <PaperButton
    style={[
      styles.button,
      mode === "outlined" && { backgroundColor: theme.colors.background },

      style,
    ]}
    color={mode === "outlined" && "#135d4b"}
    labelStyle={[styles.text, { fontSize: size === "small" ? 10 : 15, },]}
    mode={mode}
    icon={icon}
    {...props}
  >
    {children}
  </PaperButton>
);

const styles = StyleSheet.create({
  button: {
    width: "100%",
    marginVertical: 25,
    backgroundColor: theme.colors.primary,
  },
  text: {
    fontWeight: "bold",
    lineHeight: 26,
  },
});

export default memo(Button);
