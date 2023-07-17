import ModalDialog from "components/moleculars/modals/ModalDialog";
import { View } from "react-native";
import Button from "components/atomics/buttons/Button";
import { theme } from "@ribon.io/shared/styles";
import S from "./styles";

export type Props = {
  title: string;
  current?: number;
  items: any[];
  setCurrentIndex: (index: number) => void;
  visible: boolean;
  setVisible: (visible: boolean) => void;
};

export default function ModalButtonSelector({
  title,
  current,
  items,
  setCurrentIndex,
  visible,
  setVisible,
}: Props) {
  const { neutral10, brand } = theme.colors;

  const borderColor = (index: number) =>
    current === index ? "transparent" : brand.primary[600];

  const textColor = (index: number) =>
    current === index ? neutral10 : brand.primary[600];

  const backgroundColor = (index: number) =>
    current === index ? brand.primary[600] : "transparent";

  const handleClick = (index: number) => {
    setCurrentIndex(index);
    setTimeout(() => {
      setVisible(false);
    }, 100);
  };

  return (
    <ModalDialog visible={visible} setVisible={setVisible} title={title}>
      <View style={S.container}>
        {items.map((item, index) => (
          <Button
            onPress={() => {
              handleClick(index);
            }}
            key={item.label}
            text={item.label}
            customStyles={S.button}
            backgroundColor={backgroundColor(index)}
            textColor={textColor(index)}
            borderColor={borderColor(index)}
          />
        ))}
      </View>
    </ModalDialog>
  );
}
