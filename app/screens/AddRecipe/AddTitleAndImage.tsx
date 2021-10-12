import React from 'react'
import { View } from 'react-native'
import { TextInput, Button, MainContainer } from "../../components";
import AddRecipeImage from "./AddRecipeImage";


function AddTitleAndImage(props) {
    const [title, setTitle] = React.useState({ value: "", error: "" });

    return (
        <View>

            <AddRecipeImage route={props.route} navigation={props.navigation} />

            <TextInput
                label="Navn"
                returnKeyType="next"
                value={title.value}
                onChangeText={(text) => setTitle({ value: text, error: "" })}
                error={!!title.error}
                errorText={title.error}
            />
        </View>
    )
}

export default AddTitleAndImage
