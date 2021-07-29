import React, { FC } from "react";
import { StyleSheet } from "react-native";
import { Dialog, Portal } from "react-native-paper";

interface CustomPortalInterface {
  visible: boolean;
  onDismiss: () => void;
  Actions?: any;
  title: string;
}

const CustomPortal: FC<CustomPortalInterface> = ({
  children,
  visible,
  onDismiss,
  Actions,
  title,
}) => {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>{children}</Dialog.Content>
        {Actions && <Dialog.Actions>{Actions()}</Dialog.Actions>}
      </Dialog>
    </Portal>
  );
};

export default CustomPortal;
