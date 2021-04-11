import React, { memo } from 'react';
import Background from '../styledComponents/Background';
import Logo from '../styledComponents/Logo';
import Header from '../styledComponents/Header';
import Button from '../styledComponents/Button';
import Paragraph from '../styledComponents/Paragraph';
import { View } from 'react-native';

const Landing = ({ navigation }) => {
    return (
        <Background>
            <Logo />
            <Header>Welcommen til MyFoodPlanner</Header>

            <Paragraph>
                Login in eller Register dig som Bruger
        </Paragraph>
            <Button mode="contained" onPress={() => navigation.navigate('Login')}>
                Login
        </Button>
            <Button
                mode="outlined"
                onPress={() => navigation.navigate('Register')}
            >
                Sign Up
        </Button>
        </Background>
    )
}


export default memo(Landing);


