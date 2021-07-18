import {
  USER_STATE_CHANGE,
  CLEAR_DATA,
  DELETE_RECIPE,
  ADD_TO_CUSTOM_LIST,
  EDIT_RECIPE,
  ADD_RECIPE_MESSAGE,
  DELETE_CUSTOM_LIST_ITEM,
  GET_ALL_RECIPES,
} from "../constants/index";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import firebase from "firebase";
require("firebase/firestore");

export { connect, bindActionCreators };

export function clearData() {
  return (dispatch) => {
    dispatch({ type: CLEAR_DATA });
  };
}
export function fetchUser() {
  return (dispatch) => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          dispatch({ type: USER_STATE_CHANGE, currentUser: snapshot.data() });
        } else {
          dispatch({ type: USER_STATE_CHANGE, currentUser: "does not exist" });
        }
      });
  };
}

export const GetAllRecipes = () => {
  return (dispatch) => {
    const query = firebase
      .firestore()
      .collection("Allrecipes")
      .where("Owner.UserID", "==", firebase.auth().currentUser.uid);

    dispatch({
      type: GET_ALL_RECIPES,
      AllRecipes: query,
    });
  };
};

export const deleteFood = ({ id, collection, recipe }) => {
  return (dispatch) => {
    firebase.firestore().collection(collection).doc(id).delete();
    dispatch({
      type: DELETE_RECIPE,
      Message: recipe ? `${recipe} slettet.` : "Opskrift slettet.",
    });
  };
};
export const deleteFromstCustomList = ({ id, collection, recipe }) => {
  return (dispatch) => {
    firebase
      .firestore()
      .collection(collection)
      .doc(firebase.auth().currentUser.uid)
      .collection("CustomList")
      .doc(id)
      .delete();
    dispatch({
      type: DELETE_CUSTOM_LIST_ITEM,
      Message: recipe
        ? `${recipe} slettet fra din List.`
        : "Opskrift slettet fra din List.",
    });
  };
};

export const addToCustomList = (data, day) => {
  const days = day !== "ekstra" ? day : data.Id;
  return (dispatch) => {
    firebase
      .firestore()
      .collection("AddToCustomList")
      .doc(firebase.auth().currentUser.uid)
      .collection("CustomList")
      .doc(days)
      .set({
        Id: data.Id,
        day: day,
        Name: data.Name,
        downloadUrl: data.downloadUrl,
        Owner: data.Owner,
      });
    dispatch({
      type: ADD_TO_CUSTOM_LIST,
      Message: `${data.Name} tilføjet til ${day}`,
    });
  };
};

export const EditRecipe = ({ id, Name, description }) => {
  return (dispatch) => {
    const db = firebase.firestore().collection("Allrecipes").doc(id);

    db.update({
      Name: Name,
      description: description,
    });
    dispatch({ type: EDIT_RECIPE, Message: `${Name} Er blevet ændret` });
  };
};

export const AddToListMessage = ({ title }) => {
  return (dispatch) => {
    dispatch({ type: ADD_RECIPE_MESSAGE, Message: `${title} blev tilføjet` });
  };
};
