import React, { memo } from "react"
import { Background, Logo, Header, Button, Paragraph } from "../components"

const Landing = ({ navigation }) => {
    return (
        <Background>
            <Logo />
            <Header>Welcommen til MyFoodPlanner</Header>

            <Paragraph>Login in eller Register dig som Bruger</Paragraph>
            <Button mode="contained" onPress={() => navigation.navigate("Login")}>
                Login
            </Button>
            <Button mode="outlined" onPress={() => navigation.navigate("Register")}>
                Sign Up
            </Button>
        </Background>
    )
}

export default memo(Landing)
