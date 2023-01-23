import React from "react";
import { ActivityIndicator } from "react-native";
import Modal from "react-native-modal";
import { View, Text } from "components/Themed";
import styles from "./styles";

export type Props = {
  text?: string;
  visible?: boolean;
};
function LoadingOverlay({ text, visible = false }: Props): JSX.Element {
  return (
    <View style={styles.container}>
      <Modal
        isVisible={visible}
        animationIn="slideInRight"
        backdropOpacity={0.5}
      >
        <View style={styles.centerDiv}>
          <ActivityIndicator />
          {text && <Text style={styles.message}>{text}</Text>}
        </View>
      </Modal>
    </View>
  );
}

export default LoadingOverlay;
