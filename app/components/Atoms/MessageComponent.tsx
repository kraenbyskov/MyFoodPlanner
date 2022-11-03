import React, { useEffect, useState } from "react"
import { Snackbar } from "react-native-paper"
import { Text, StyleSheet } from "react-native"
import { connect } from "react-redux"

const MessageComponent: any = ({ Message }) => {
    const onDismissSnackBar = () => setVisible(false)
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        setVisible(true)
    }, [Message])

    return (
        <>
            {Message ? (
                <Snackbar
                    style={styles.snackbar}
                    visible={visible}
                    onDismiss={onDismissSnackBar}
                    duration={2000}
                    action={{
                        label: "Ok",
                        onPress: () => {
                            setVisible(false)
                        },
                    }}
                >
                    <Text style={{ color: "black" }}>{Message}</Text>
                </Snackbar>
            ) : null}
        </>
    )
}

const styles = StyleSheet.create({
    snackbar: {
        backgroundColor: "white",
    },
})

const mapStateToProps = (store) => ({
    Message: store.Message.ActionMessage,
})
export default connect(mapStateToProps, null)(MessageComponent)
