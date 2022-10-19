import React, { memo, useState } from "react";
import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import {
  Background,
  Logo,
  Header,
  Button,
  TextInput,
  BackButton,
} from "../../components";

import { theme } from "../../core/theme";
import { emailValidator, passwordValidator } from "../../core/utils";
import firebase from "firebase";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [loginError, setloginError] = useState("");

  const _onLoginPressed = () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }

    firebase
      .auth()
      .signInWithEmailAndPassword(email.value, password.value)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        setloginError(error.code);
      });
  };

  return (
    <Background>
      <Logo />

      <View
        style={{
          marginBottom: 20,
          width: "100%",
        }}
      >
        <TextInput
          label="Email"
          returnKeyType="next"
          value={email.value}
          onChangeText={(text) => setEmail({ value: text, error: "" })}
          error={!!email.error}
          errorText={email.error}
          autoCapitalize="none"
          autoCompleteType="email"
          textContentType="emailAddress"
          keyboardType="email-address"
        />
      </View>
      <View
        style={{
          marginBottom: 20,
          width: "100%",
        }}
      >
        <TextInput
          label="Password"
          returnKeyType="done"
          value={password.value}
          onChangeText={(text) => setPassword({ value: text, error: "" })}
          error={!!password.error}
          errorText={password.error}
          secureTextEntry
        />
      </View>
      {loginError ? (
        <Text>
          {loginError === "auth/user-not-found"
            ? "Forkert Email"
            : loginError === "auth/wrong-password"
            ? "Forkert Password"
            : loginError === "auth/too-many-requests"
            ? "Glemt dit password ? "
            : loginError}
        </Text>
      ) : null}
      <View
        style={{
          width: "100%",
          marginTop: 100,
        }}
      >
        <Button mode="contained" onPress={_onLoginPressed}>
          Login
        </Button>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Har du ikke en bruger? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.link}>Register</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  forgotPassword: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  label: {
    color: theme.colors.primary,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
});

export default memo(Login);
