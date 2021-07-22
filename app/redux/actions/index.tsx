import {
  USER_STATE_CHANGE,
  CLEAR_DATA,
  DELETE_RECIPE,
  ADD_TO_CUSTOM_LIST,
  EDIT_RECIPE,
  ADD_RECIPE_MESSAGE,
  DELETE_CUSTOM_LIST_ITEM,
  GET_ALL_RECIPES,
  GET_CUSTOM_LIST,
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

// Fetch Users

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

// Get all Recipes by user ID

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

//  Get Custom list from User ID

export const GetCustomList = () => {
  return (dispatch) => {
    const query = firebase
      .firestore()
      .collection("AddToCustomList")
      .doc(firebase.auth().currentUser.uid)
      .collection("CustomList");

    const onCollection = async (querySnapshot) => {
      const collectAndSort = new Promise((resolve, reject) => {
        const Data = [
          { day: "Mandag", empty: true },
          { day: "Tirsdag", empty: true },
          { day: "Onsdag", empty: true },
          { day: "Torsdag", empty: true },
          { day: "Fredag", empty: true },
          { day: "Lørdag", empty: true },
          { day: "Søndag", empty: true },
        ];
        querySnapshot.forEach((doc) => {
          const { day } = doc.data();

          Data.map((Weekdays, index) => {
            if (Weekdays.day === day) {
              Weekdays.empty = false;
              Data.splice(index, 1, { ...Weekdays, ...doc.data() });
            }
          });
        });
        resolve(Data);
        reject([
          { day: "Mandag", empty: true },
          { day: "Tirsdag", empty: true },
          { day: "Onsdag", empty: true },
          { day: "Torsdag", empty: true },
          { day: "Fredag", empty: true },
          { day: "Lørdag", empty: true },
          { day: "Søndag", empty: true },
        ]);
      });
      collectAndSort.then((array) => {
        dispatch({
          type: GET_CUSTOM_LIST,
          CustomRecipesList: array,
        });
      });
    };
    query.onSnapshot(onCollection);
  };
};

// Deletes a Recipe from your own list

export const deleteFood = ({ id, collection, recipe }) => {
  return (dispatch) => {
    firebase.firestore().collection(collection).doc(id).delete();
    dispatch({
      type: DELETE_RECIPE,
      Message: recipe ? `${recipe} slettet.` : "Opskrift slettet.",
    });
  };
};

// Removes Recipe from your custom list

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

// Add recipe to your own custom list

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

// Edits your own recipe

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

// Sends a message that the Recipe was added.

export const AddToListMessage = ({ title }) => {
  return (dispatch) => {
    dispatch({ type: ADD_RECIPE_MESSAGE, Message: `${title} blev tilføjet` });
  };
};
