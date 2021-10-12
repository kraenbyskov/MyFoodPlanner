import * as React from "react";
import { Text, View, StyleSheet, SafeAreaView } from "react-native";
import { TextInput, Button, MainContainer, AppBar } from "../../components";
import firebase from "firebase";
import AddRecipeImage from "./AddRecipeImage";
import { List } from "react-native-paper";
require("firebase/firestore");
import { connect } from "react-redux";
import { Snackbar } from "react-native-paper";
import { bindActionCreators } from "redux";
import { AddToListMessage } from "../../redux/actions";
import { ScrollView, TouchableHighlight } from "react-native-gesture-handler";
import { theme } from "../../core/theme";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";


const Fields = ({ Value, setValue, index }) => {
    const [Text, setText] = React.useState(undefined);

    const updateValue = (text: string | undefined) => {
        setText(text)
        Value[index] = { Title: text }
        setValue(Value)
    }
    return (
        <TextInput
            label="Opskrift"
            returnKeyType="next"
            value={Text}
            onChangeText={(text) => updateValue(text)}
            error={!!Value.error}
            errorText={Value.error}
        />
    )
}



const AddFoodToListScreen = (props) => {
    const [Recipes, setRecipes] = React.useState([{
        Title: undefined
    }]);
    const addField = () => {
        setRecipes([...Recipes, {
            Title: undefined
        }])
    }
    const AddRecipesToDatabase = (data) => {
        console.log(data)
        data.forEach(element => {
            if (element.Title) {

                const db = firebase.firestore().collection("Allrecipes");
                const object = {
                    Id: `${firebase.auth().currentUser.uid}_${element.Title}`,
                    Name: element.Title,
                    downloadUrl: "",
                    Date: firebase.firestore.FieldValue.serverTimestamp(),
                    Owner: {
                        User: props.currentUser.name,
                        UserID: firebase.auth().currentUser.uid,
                    },
                    CookingTime: "",
                    Calories: "",
                };
                db.doc(`${firebase.auth().currentUser.uid}_${element.Title}`)
                    .set(object)
                    .then(function () {
                        props.navigation.navigate("Profile", object);
                    });
            }
        })
        setRecipes([]);
        props.AddToListMessage({ title: "Opskrifter Tilfæjet til Liste" });
    };


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <AppBar />
            <ScrollView style={styles.Container}>

                <Text>Tilføj ny Opskrift</Text>
                {Recipes.map((doc, index) => (
                    <Fields Value={Recipes} index={index} key={index} setValue={setRecipes} />
                ))}
                <View style={styles.CardContainer}>
                    <TouchableHighlight
                        style={styles.Card}
                        underlayColor={theme.colors.primary}
                        onPress={() => addField()}
                    >
                        <View style={styles.Content}>
                            <MaterialCommunityIcons
                                name="plus"
                                color={theme.colors.primary}
                                size={26}
                            />
                        </View>
                    </TouchableHighlight>
                </View>

                <View>
                    <Button mode="contained" onPress={() => AddRecipesToDatabase(Recipes)}>
                        Tilføj
                    </Button>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};



const styles = StyleSheet.create({
    Container: {
        padding: 20,
    },
    CardContainer: {
        marginVertical: 20
    },
    Card: {
        width: "100%",
        height: 50,
        backgroundColor: "white",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.06,
        shadowRadius: 3.68,
        borderWidth: 2,
        borderColor: "lightgray",
        borderStyle: "dashed",
    },
    Content: {
        flex: 1,
        flexDirection: "row",
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
    },

    Title: {
        marginLeft: 10,
        fontSize: 18,
    },
    Icons: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end",
        // backgroundColor: 'orange'
    },
});



const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
});

const mapDispatchProps = (dispatch) =>
    bindActionCreators({ AddToListMessage }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(AddFoodToListScreen);
