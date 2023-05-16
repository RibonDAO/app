import React from "react";
import Modal from "react-native-modal";
import { View, Text } from "react-native";
import LoaderAnimated from "components/atomics/LoaderAnimated";
import styles from "./styles";

export type Props = {
  text?: string;
  visible?: boolean;
};
function LoadingOverlay({ text, visible = false }: Props): JSX.Element {
  return (
    <View style={styles.container}>
      <Modal isVisible={visible} animationIn="slideInUp" backdropOpacity={0.75}>
        <View style={styles.centerDiv}>
          <LoaderAnimated width={160} height={160} />
          {text && <Text style={styles.message}>{text}</Text>}
        </View>
      </Modal>
    </View>
  );
}

export default LoadingOverlay;
