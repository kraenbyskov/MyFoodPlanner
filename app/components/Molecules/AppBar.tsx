import React, { FC } from "react"
import { StyleSheet } from "react-native"
import { Appbar } from "react-native-paper"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { Platform } from "react-native"
import { useNavigation } from "@react-navigation/native"
const MORE_ICON = Platform.OS === "ios" ? "dots-horizontal" : "dots-vertical"

interface AppBarInterface {
    mainColor?: string
    RightSideButtons?: any
}

const TopAppBar: FC<AppBarInterface> = ({ mainColor = "black", RightSideButtons }) => {
    const navigation = useNavigation()
    return (
        <Appbar style={styles.Appbar}>
            {navigation.canGoBack() ? (
                <Appbar.Action
                    icon={() => <MaterialCommunityIcons color={mainColor} name={"arrow-left-thick"} size={26} />}
                    onPress={() => navigation.goBack()}
                />
            ) : null}
            <Appbar.Content title="" />
            {RightSideButtons}
        </Appbar>
    )
}

export default TopAppBar

const styles = StyleSheet.create({
    Appbar: {
        backgroundColor: "transparent",
        shadowOpacity: 0,
        // alignItems: "flex-end",
    },
})
