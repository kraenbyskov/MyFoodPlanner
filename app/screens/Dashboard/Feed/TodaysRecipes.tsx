import React, { FC, useEffect, useState } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import firebase from "firebase";

import { useNavigation } from "@react-navigation/native";
import { theme } from "../../../core/theme";
import RecipeCard from "./RecipeCard";
import { Background } from "../../../components";

interface TodaysRecipesInterface {
    data: any
}

const TodaysRecipes: FC<TodaysRecipesInterface> = ({ data }) => {

    return (
        <View>
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: 10,
                    padding: 20,
                    margin: 20,
                    top: -100,
                    height: 300,
                    backgroundColor: "white"
                }}
            >
                <Text>Dages Ret : {data && data.Name}</Text>

            </View>

        </View>
    );
};

export default TodaysRecipes;

const styles = StyleSheet.create({

});
