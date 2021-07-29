import React from "react";
import { Platform, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

const label = [
  "Mandag",
  "Tirsdag",
  "Onsdag",
  "Torsdag",
  "Fredag",
  "Lørdag",
  "Søndag",
  "Ekstra",
];

function PickerComponent({ state, setState }) {
  return (
    <Picker
      style={styles.picker}
      selectedValue={state}
      onValueChange={(itemValue: any, itemIndex) => setState(itemValue)}
    >
      {label.map((labels, index) => (
        <Picker.Item key={index} label={labels} value={labels} />
      ))}
    </Picker>
  );
}

export default PickerComponent;

const styles = StyleSheet.create({
  picker: {
    width: "100%",
    height: Platform.OS === "ios" ? 60 : 20,
    top: Platform.OS === "ios" ? -70 : 0,
  },
});
