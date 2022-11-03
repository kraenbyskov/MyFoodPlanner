import React from "react"
import { View, StyleSheet } from "react-native"
import { Button, Snackbar } from "react-native-paper"

const styles = StyleSheet.create({
    barStyle: {
        backgroundColor: "green",
        top: 0,
        flex: 1,
    },
})

function SnackBar({ visible, setVisible, data }) {
    const onDismissSnackBar = () => setVisible(false)

    return (
        <Snackbar
            style={styles.barStyle}
            visible={visible}
            onDismiss={onDismissSnackBar}
            duration={7000}
            action={{
                label: "Undo",
                onPress: () => {
                    setVisible(true)
                },
            }}
        >
            {data}
        </Snackbar>
    )
}

export default SnackBar
