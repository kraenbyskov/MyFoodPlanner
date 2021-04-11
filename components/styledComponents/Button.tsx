import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import { Button as PaperButton } from 'react-native-paper';
import { theme } from '../../core/theme';

// interface ButtonInterface {
//     mode: any,
//     style: any,
//     children: any,

// }


const Button: any =  ({ mode, style, children, ...props }) => (
    <PaperButton
        style={[
            styles.button,
            mode === 'outlined' && { backgroundColor: theme.colors.surface },
            style,
        ]}

        color={mode === 'outlined' && "#135d4b"}

        labelStyle={styles.text}
        mode={mode}
        {...props}
    >
        {children}
    </PaperButton>
);

const styles = StyleSheet.create({
    button: {
        width: '100%',
        marginVertical: 10,
        backgroundColor: theme.colors.primary
    },
    text: {
        fontWeight: 'bold',
        fontSize: 15,
        lineHeight: 26,
    },
});

export default memo(Button);