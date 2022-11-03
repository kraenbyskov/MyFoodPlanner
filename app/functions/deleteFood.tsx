import firebase from "firebase"

const deleteFood = ({ id, collection }) => {
    firebase.firestore().collection(collection).doc(id).delete()
}

export default deleteFood
