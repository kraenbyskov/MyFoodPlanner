import React from "react"
import { Image, StyleSheet, View, TouchableHighlight } from "react-native"

const AddRecipeImage = ({ route, navigation }) => {
    const destination = "AddRecipe"

    return (
        <TouchableHighlight style={styles.CaptureImage} onPress={() => navigation.navigate("Add", { destination })}>
            <Image
                style={styles.RecipeImage}
                source={route.params ? { uri: route.params.image } : require("images/no_image.jpg")}
            />
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    CaptureImage: {
        width: 200,
        height: 200,
        borderRadius: 200,
        marginBottom: 40,
    },
    RecipeImage: {
        width: 200,
        height: 200,
        borderRadius: 200,
    },
})

export default AddRecipeImage
