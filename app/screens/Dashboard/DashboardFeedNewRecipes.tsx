import React, { FC } from "react"
import { useCollectionData } from "react-firebase-hooks/firestore"
import { View, StyleSheet, TouchableHighlight, Image, Text, ScrollView } from "react-native"
import firebase from "firebase"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { connect } from "../../redux/actions"

import { useNavigation } from "@react-navigation/native"
import { theme } from "../../core/theme"

interface NewRecipesInterface {
    navigation?: any
    currentUser?: any
}

const NewRecipes: FC<NewRecipesInterface> = ({ currentUser }) => {
    const navigation = useNavigation()
    const [GetData, setGetData]: any = React.useState(null)
    console.log(GetData)
    const query = firebase
        .firestore()
        .collection("Allrecipes")
        .where("Owner.UserID", "==", firebase.auth().currentUser.uid)
        .limit(6)
    const [Food]: any = useCollectionData(query)
    React.useEffect(() => {
        setGetData(Food)
    }, [Food])

    return (
        <View>
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: 10,
                    padding: 20,
                }}
            >
                <Text
                    style={{
                        fontSize: 20,
                        fontFamily: "Lato_400Regular",
                    }}
                >
                    Nye Opskrifter
                </Text>
                <Text
                    style={{
                        fontSize: 20,
                        fontFamily: "Lato_400Regular",
                        color: theme.colors.secondary,
                    }}
                >
                    See all {">"}
                </Text>
            </View>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                {GetData &&
                    GetData.map((data, index) => (
                        <TouchableHighlight
                            key={index}
                            style={[styles.Card, { marginLeft: index == 0 ? 20 : 0 }]}
                            underlayColor={"white"}
                            onPress={() => navigation.navigate("RecipeDetails", data)}
                        >
                            <View style={styles.Content}>
                                <View>
                                    <Image
                                        style={styles.RecipeImage}
                                        source={
                                            data.downloadUrl
                                                ? { uri: data.downloadUrl }
                                                : require("../../assets/photo-1512621776951-a57141f2eefd.png")
                                        }
                                    />
                                    <View
                                        style={{
                                            paddingHorizontal: 10,
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            marginTop: -30,
                                        }}
                                    >
                                        <View
                                            style={{
                                                flexDirection: "row",
                                                alignItems: "center",
                                            }}
                                        >
                                            <MaterialCommunityIcons name="heart-outline" color={"white"} size={26} />
                                            <Text
                                                style={{
                                                    fontSize: 16,
                                                    color: "white",
                                                    paddingLeft: 5,
                                                }}
                                            >
                                                100
                                            </Text>
                                        </View>
                                        <Text style={{ color: "white", fontSize: 16 }}>55 min.</Text>
                                    </View>
                                </View>
                                <View style={{ marginTop: 15 }}>
                                    <Text style={styles.Title}>{data.Name}</Text>
                                </View>
                                <View
                                    style={{
                                        flex: 1,
                                        flexDirection: "row",
                                        alignItems: "center",
                                    }}
                                >
                                    <Image
                                        source={require("images/Profile.jpg")}
                                        style={{
                                            aspectRatio: 1 / 1,
                                            borderRadius: 5,
                                            width: 40,
                                            height: 40,
                                        }}
                                    />
                                    <View style={{ paddingLeft: 5 }}>
                                        <Text style={styles.Title}>{data.Owner.User}</Text>
                                        <Text style={[styles.Title, { color: theme.colors.secondary }]}>
                                            {"Rock and roller"}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableHighlight>
                    ))}
            </ScrollView>
        </View>
    )
}

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
})

export default connect(mapStateToProps, null)(NewRecipes)

const styles = StyleSheet.create({
    Title: {
        fontSize: 18,
    },
    RecipeImage: {
        width: "100%",
        height: 300,
        borderRadius: 10,
    },
    Card: {
        width: 250,
        height: 400,
        borderRadius: 10,
        marginRight: 10,
    },
    Content: {
        flex: 1,
        height: 400,
        width: 250,
    },
})
