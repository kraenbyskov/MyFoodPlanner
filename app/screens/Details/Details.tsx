import React from "react"
import { SafeAreaView, StatusBar, RefreshControl, View, Animated } from "react-native"
import firebase from "firebase"
require("firebase/firestore")
import { Title } from "react-native-paper"

import Banner from "./DetailsBanner"
import Ingredients from "./DetailsIngredients"
import Description from "./DetailsDescription"

import EkstraImages from "./DetailsEkstraImages"
import { ParallaxScrollView } from "../../components"
import { theme } from "../../core/theme"
import TopNav from "./DetailsTopNav"

const RenderStickyHeader = (value) => {
    const opacity = value.interpolate({
        inputRange: [0, 0, 1],
        outputRange: [0, 150, 200],
        extrapolate: "clamp",
    })
    return (
        <View style={{ height: 50, width: "100%" }}>
            <Animated.View style={[{ position: "absolute", top: 0, left: 0, bottom: 0, right: 0 }, { opacity }]} />
        </View>
    )
}

export default function Details({ route, navigation }) {
    const [GetData, setGetData]: any = React.useState(null)

    const db = firebase.firestore().collection("Allrecipes")

    const [refreshing, setRefreshing] = React.useState(false)

    const onRefresh = React.useCallback(() => {
        setRefreshing(true)
        db.doc(route.params.Id)
            .get()
            .then((snapshot) => {
                setGetData(snapshot.data())
            })
        setRefreshing(false)
    }, [])

    React.useEffect(() => {
        db.doc(route.params.Id)
            .get()
            .then((snapshot) => {
                setGetData(snapshot.data())
            })
    }, [])

    if (GetData) {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar barStyle={"light-content"} />
                <ParallaxScrollView
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                    style={{ marginTop: -50, marginBottom: -30 }}
                    parallaxHeaderHeight={350}
                    stickyHeaderHeight={50}
                    stickyHeader={RenderStickyHeader}
                    parallaxHeader={() => <Banner Data={GetData} />}
                    fixedHeader={() => <TopNav Data={GetData} />}
                >
                    <View
                        style={{
                            width: "100%",
                            backgroundColor: theme.colors.background,
                            borderTopLeftRadius: 2,
                            borderTopRightRadius: 2,
                            marginBottom: 100,
                        }}
                    >
                        <Description Data={GetData} />
                        <EkstraImages Data={GetData} />
                        <Ingredients data={GetData} />
                    </View>
                </ParallaxScrollView>
            </SafeAreaView>
        )
    } else {
        return <Title>No data</Title>
    }
}
