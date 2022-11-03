import React, { memo, useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import firebase from "firebase"

import { Background, Logo, Header, Button, TextInput, BackButton } from "../components"

import { theme } from "../core/theme"
import { emailValidator, passwordValidator, nameValidator } from "../core/utils"

const Register = ({ navigation }) => {
    const [name, setName] = useState({ value: "", error: "" })
    const [email, setEmail] = useState({ value: "", error: "" })
    const [password, setPassword] = useState({ value: "", error: "" })

    const _onSignUpPressed = () => {
        const nameError = nameValidator(name.value)
        const emailError = emailValidator(email.value)
        const passwordError = passwordValidator(password.value)

        if (emailError || passwordError || nameError) {
            setName({ ...name, error: nameError })
            setEmail({ ...email, error: emailError })
            setPassword({ ...password, error: passwordError })
            return
        }

        firebase
            .auth()
            .createUserWithEmailAndPassword(email.value, password.value)
            .then((result) => {
                firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).set({
                    name: name.value,
                    email: email.value,
                })
                console.log(result)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <Background>
            <BackButton goBack={() => navigation.navigate("Landing")} />

            <Logo />
            <Header>Opret Konto</Header>
            {/* <TextInput placeholder="name" onChangeText={(name) => setName(name)} />

            <TextInput placeholder="Email" onChangeText={(name) => setEmail(name)} />

            <TextInput placeholder="Password" secureTextEntry={true} onChangeText={(name) => setPassword(name)} /> */}

            <TextInput
                label="Name"
                returnKeyType="next"
                value={name.value}
                onChangeText={(text) => setName({ value: text, error: "" })}
                error={!!name.error}
                errorText={name.error}
            />

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

            <TextInput
                label="Password"
                returnKeyType="done"
                value={password.value}
                onChangeText={(text) => setPassword({ value: text, error: "" })}
                error={!!password.error}
                errorText={password.error}
                secureTextEntry
            />

            <Button mode="contained" onPress={_onSignUpPressed} style={styles.button}>
                Opret
            </Button>

            {/* <Button mode="contained" onPress={() => onSignUp()} style={styles.button}>
                Sign Up
      </Button> */}

            <View style={styles.row}>
                <Text style={styles.label}>Already have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                    <Text style={styles.link}>Login</Text>
                </TouchableOpacity>
            </View>
        </Background>
    )
}

const styles = StyleSheet.create({
    label: {
        color: theme.colors.secondary,
    },
    button: {
        marginTop: 24,
    },
    row: {
        flexDirection: "row",
        marginTop: 4,
    },
    link: {
        fontWeight: "bold",
        color: theme.colors.primary,
    },
})

export default memo(Register)
