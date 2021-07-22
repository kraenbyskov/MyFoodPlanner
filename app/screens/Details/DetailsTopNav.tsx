import React from "react";
import { StyleSheet, View } from "react-native";
import { IconButton } from "react-native-paper";
import { Appbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { deleteFood, addToCustomList, EditRecipe } from "../../redux/actions";
import {
  AddToCustomList,
  Button,
  CustomInput as Input,
  CustomPortal as Portal,
} from "../../components";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const DetailsTopNav = ({ Data, deleteFood, EditRecipe }) => {
  const { Name, description, Id } = Data;

  const [visible, setVisible] = React.useState(false);
  const [addRecipePortal, setAddRecipePortal] = React.useState(false);
  const [addToCustomListState, setAddToCustomListState]: any =
    React.useState(null);
  const [selectedValue, setSelectedValue] = React.useState("");

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const [title, setTitle] = React.useState({ value: Name, error: "" });
  const [stateDescription, setStateDescription] = React.useState({
    value: description,
    error: "",
  });

  const navigation = useNavigation();

  const deleteAndNavigateBack = () => {
    deleteFood({ id: Id, collection: "Allrecipes" });
    navigation.goBack();
  };

  const EditRecipeButton = ({ id, Name, description }) => {
    EditRecipe({ id, Name, description });
    hideDialog();
  };

  const addToCustomListDialog = (data) => {
    setAddRecipePortal(true);
    setAddToCustomListState(data);
  };

  return (
    <View>
      <Appbar style={styles.Appbar}>
        {navigation.canGoBack() ? (
          <Appbar.Action
            icon={() => (
              <MaterialCommunityIcons
                color={"white"}
                name={"arrow-left-thick"}
                size={26}
              />
            )}
            onPress={() => navigation.goBack()}
          />
        ) : null}
        <Appbar.Content title="" />
        <IconButton
          color={"#FFFFFF"}
          size={25}
          icon="delete"
          onPress={() => deleteAndNavigateBack()}
        />
        <IconButton
          color={"#FFFFFF"}
          size={25}
          icon="check"
          onPress={() => addToCustomListDialog(Data)}
        />
        <IconButton
          color={"#FFFFFF"}
          size={25}
          icon="pencil-outline"
          onPress={() => showDialog()}
        />
      </Appbar>
      <Portal
        visible={visible}
        onDismiss={hideDialog}
        title={"Rediger indhold"}
        Actions={() => (
          <Button
            mode="contained"
            onPress={() =>
              EditRecipeButton({
                id: Id,
                Name: title.value,
                description: stateDescription.value,
              })
            }
          >
            Rediger
          </Button>
        )}
      >
        <Input value={title.value} setValue={setTitle} error={!!title.error} />
        <Input
          value={stateDescription.value}
          setValue={setStateDescription}
          error={!!stateDescription.error}
        />
      </Portal>
      <AddToCustomList
        visible={addRecipePortal}
        setVisible={setAddRecipePortal}
        addToCustomListState={addToCustomListState}
        setState={setSelectedValue}
        state={selectedValue}
      />
    </View>
  );
};

const mapDispatchProps = (dispatch) =>
  bindActionCreators({ deleteFood, addToCustomList, EditRecipe }, dispatch);

export default connect(null, mapDispatchProps)(DetailsTopNav);
const styles = StyleSheet.create({
  Appbar: {
    backgroundColor: "transparent",
    top: -10,
  },
});
