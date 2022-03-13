import React, { FC } from "react";
import { View, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { theme } from "../../core/theme";
import { Pressable, RefreshControl, Text } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

interface TabSwitchInterface {
    setSwitchState: any,
    switchState: boolean
}


const TabSwitch: FC<TabSwitchInterface> = ({ setSwitchState, switchState }) => {
    return (
        <View style={{
            width: "100%",
            height: 25,
            right: 20,
            justifyContent: "flex-end",
            flexDirection: "row"
        }}>
            <View style={{
                width: 50,
                height: 25,
                flexDirection: "row"

            }}>
                <Pressable
                    style={{
                        width: 25,
                        height: 25,
                        backgroundColor: switchState ? theme.colors.primary : theme.colors.lightGray,
                        justifyContent: "center",
                        alignItems: "center",
                        borderTopLeftRadius: 5,
                        borderBottomLeftRadius: 5,


                    }}
                    onPress={() => setSwitchState(true)}>
                    <MaterialCommunityIcons
                        name="view-grid"
                        color={switchState ? theme.colors.lightGray : theme.colors.Gray}
                        size={16}
                    />
                </Pressable>
                <Pressable
                    style={{
                        width: 25,
                        height: 25,
                        backgroundColor: switchState ? theme.colors.lightGray : theme.colors.primary,
                        justifyContent: "center",
                        alignItems: "center",
                        borderTopRightRadius: 5,
                        borderBottomRightRadius: 5,


                    }}
                    onPress={() => setSwitchState(false)}>

                    <MaterialCommunityIcons
                        name="format-list-checkbox"
                        color={switchState ? theme.colors.Gray : theme.colors.lightGray}
                        size={16}
                    />
                </Pressable>

            </View>
        </View>
    )
}


export default TabSwitch