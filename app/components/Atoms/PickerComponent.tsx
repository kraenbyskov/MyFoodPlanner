import React from "react";
import { Picker } from "@react-native-picker/picker";
import firebase from "firebase";

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
      style={{ width: "100%", height: 60, top: -70 }}
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