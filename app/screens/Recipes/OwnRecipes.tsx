import React from "react"
import firebase from "firebase"
import { useCollectionData } from "react-firebase-hooks/firestore"
import { MainContainer, RecipeCard } from "../../components"
import { IconButton } from "react-native-paper"
import { View, StyleSheet } from "react-native"
import { theme } from "../../core/theme"
import { deleteFood, addToCustomList } from "../../redux/actions"
import { Button } from "../../components"

import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { PickerComponent as Picker, CustomPortal as Portal, AddToCustomList } from "../../components/"

interface OwnRecipesInterface {
    navigation: any
    sharing?: string
}

const OwnRecipes: React.FC<OwnRecipesInterface> = ({ navigation, sharing }) => {
    const [GetData, setGetData]: any = React.useState(null)
    const [addToCustomListState, setAddToCustomListState]: any = React.useState(null)

    const [selectedValue, setSelectedValue] = React.useState("Mandag")
    const [visible, setVisible] = React.useState(false)

    const addToCustomListDialog = (data) => {
        setVisible(true)
        setAddToCustomListState(data)
    }

    const query = firebase
        .firestore()
        .collection("Allrecipes")
        .where("Owner.UserID", "==", sharing ? sharing : firebase.auth().currentUser.uid)
    const [Food]: any = useCollectionData(query)

    React.useEffect(() => {
        setGetData(Food)
    }, [Food])

    return (
        <View style={{ flex: 1, width: "100%" }}>
            {GetData &&
                GetData.map((data, index) => (
                    <RecipeCard key={index} navigation={navigation} data={data}>
                        <IconButton
                            color={theme.colors.secondary}
                            size={25}
                            icon="check"
                            onPress={() => addToCustomListDialog(data)}
                        />
                    </RecipeCard>
                ))}

            <AddToCustomList
                visible={visible}
                setVisible={setVisible}
                addToCustomListState={addToCustomListState}
                setState={setSelectedValue}
                state={selectedValue}
            />
        </View>
    )
}

export default connect(null, null)(OwnRecipes)
