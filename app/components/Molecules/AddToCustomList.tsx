import React from "react"
import { CustomPortal as Portal, PickerComponent as Picker, Button } from "../Atoms"
import { View, StyleSheet } from "react-native"
import { addToCustomList, bindActionCreators, connect } from "../../redux/actions"

function AddToCustomList({ addToCustomListState, addToCustomList, visible, setVisible, setState, state }) {
    const hideDialog = () => setVisible(false)

    const addToCustomListButton = (data, day) => {
        addToCustomList(data, day)
        setVisible(false)
    }

    return (
        <Portal
            visible={visible}
            onDismiss={hideDialog}
            title={"Alert"}
            Actions={() => (
                <Button mode="contained" onPress={() => addToCustomListButton(addToCustomListState, state)}>
                    Tilføj til listen
                </Button>
            )}
        >
            <View style={styles.inputfields}>
                <Picker setState={setState} state={state} />
            </View>
        </Portal>
    )
}

const mapDispatchProps = (dispatch) => bindActionCreators({ addToCustomList }, dispatch)

export default connect(null, mapDispatchProps)(AddToCustomList)

const styles = StyleSheet.create({
    inputfields: {
        flexDirection: "row",
        alignItems: "center",
    },
    input: {
        flex: 1,
        width: "30%",
    },
})
