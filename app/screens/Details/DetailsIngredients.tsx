import React from "react";
import { View, StyleSheet } from "react-native";
import firebase from "firebase";
import { Picker } from "@react-native-picker/picker";
import {
  Dialog,
  TextInput as Input,
  List,
  DataTable,
} from "react-native-paper";
import { Button } from "../../components";
import { theme } from "../../core/theme";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { CustomCard as Card, CustomPortal as Portal } from "../../components";

const label = ["", "g", "kg", "dl", "spsk", "l"];

const RecipeIngredients = ({ data }) => {
  const query = firebase
    .firestore()
    .collection("Allrecipes")
    .doc(data.Id)
    .collection("ingredients");
  const [Ingredients]: any = useCollectionData(query);

  React.useEffect(() => {
    setingredients(Ingredients);
  }, [Ingredients]);

  const [ingredients, setingredients] = React.useState([]);
  const [title, setTitle] = React.useState({ value: "", error: "" });
  const [amount, setamount] = React.useState({ value: "", error: "" });
  const [selectedValue, setSelectedValue] = React.useState("");
  const AddIngredien = () => {
    const db = firebase
      .firestore()
      .collection("Allrecipes")
      .doc(data.Id)
      .collection("ingredients")
      .doc(title.value);

    db.set({
      navn: title.value,
      amount: amount.value,
      type: selectedValue,
    });
    setVisible(false);
    setTitle({ value: "", error: "" });
    setamount({ value: "", error: "" });
    setSelectedValue("");
  };

  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  return (
    <View>
      <Card title={"Ingrediencer"}>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Title</DataTable.Title>
            <DataTable.Title numeric>Amount</DataTable.Title>
            <DataTable.Title numeric>{""}</DataTable.Title>
          </DataTable.Header>
          {ingredients &&
            ingredients.map((ingredient, index) => (
              <DataTable.Row key={index}>
                <DataTable.Cell>{ingredient.navn}</DataTable.Cell>
                <DataTable.Cell numeric>{ingredient.amount}</DataTable.Cell>
                <DataTable.Cell numeric>{ingredient.type}</DataTable.Cell>
              </DataTable.Row>
            ))}
        </DataTable>
        <Button onPress={showDialog}>Tilføj Ingrediens</Button>
      </Card>
      <Portal
        visible={visible}
        onDismiss={hideDialog}
        title={"Alert"}
        Actions={() => (
          <Button mode="contained" onPress={() => AddIngredien()}>
            Tilføj Ingrediens
          </Button>
        )}
      >
        <View style={styles.inputfields}>
          <View style={styles.input}>
            <Input
              style={{ backgroundColor: theme.colors.surface }}
              underlineColor="transparent"
              theme={{ colors: { primary: theme.colors.primary } }}
              mode="flat"
              label="Title"
              returnKeyType="next"
              value={title.value}
              onChangeText={(text) => setTitle({ value: text, error: "" })}
              error={!!title.error}
            />
          </View>
          <View style={styles.input}>
            <Input
              style={{ backgroundColor: theme.colors.surface }}
              // underlineColor="transparent"
              theme={{ colors: { primary: theme.colors.primary } }}
              mode="flat"
              label="Amount"
              returnKeyType="next"
              value={amount.value}
              onChangeText={(text) => setamount({ value: text, error: "" })}
              error={!!amount.error}
            />
          </View>
          <Picker
            style={{ width: "30%", height: 60, top: -70 }}
            selectedValue={selectedValue}
            onValueChange={(itemValue: any, itemIndex) =>
              setSelectedValue(itemValue)
            }
          >
            {label.map((labels, index) => (
              <Picker.Item key={index} label={labels} value={labels} />
            ))}
          </Picker>
        </View>
      </Portal>
    </View>
  );
};

export default RecipeIngredients;

const styles = StyleSheet.create({
  inputfields: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    width: "30%",
  },
});
