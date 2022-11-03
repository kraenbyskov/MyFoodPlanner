import React from "react"
import firebase from "firebase"

const collectRecipe = async (setGetData, currentUser, firebaseConnection) => {
    const AllData = []
    const ownData = new Promise((resolve, reject) => {
        try {
            firebaseConnection
                .doc(firebase.auth().currentUser.uid)
                .collection("recipes")
                .onSnapshot((querySnapshot) => {
                    const Data = []
                    querySnapshot.forEach((doc) => {
                        Data.push(doc.data())
                    })
                    resolve(Data)
                })
        } catch (error) {
            reject([])
        }
    })

    await ownData.then((data: string[]) => {
        data.map((mydata) => {
            AllData.push(mydata)
        })
    })

    const sharedData = new Promise((resolve, reject) => {
        try {
            firebaseConnection
                .doc(currentUser)
                .collection("recipes")
                .onSnapshot((querySnapshot) => {
                    const Data = []
                    querySnapshot.forEach((doc) => {
                        Data.push(doc.data())
                    })
                    resolve(Data)
                })
        } catch (error) {
            reject([])
        }
    })
    await sharedData.then((data: string[]) => {
        data.map((mydata) => {
            AllData.push(mydata)
        })
    })

    await setGetData(AllData)
}

export default collectRecipe
