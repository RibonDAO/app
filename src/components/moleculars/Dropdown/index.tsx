import React, { ReactElement, useRef, useState } from "react";
import {
  FlatList,
  Text,
  TouchableOpacity,
  Modal,
  View,
  ViewStyle,
  TextStyle,
} from "react-native";
import ArrowDown from "components/vectors/ArrowDown";
import { theme } from "@ribon.io/shared/styles";
import S from "./styles";

type ItemType = {
  label: string;
  value: string;
};
interface Props {
  label: string;
  items: ItemType[];
  onSelect: (item: { label: string; value: string }) => void;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
}

function Dropdown({
  label,
  items,
  onSelect,
  containerStyle,
  textStyle,
}: Props): JSX.Element {
  const DropdownButton = useRef<any>();
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState<any>(undefined);
  const [dropdownTop, setDropdownTop] = useState(0);

  const openDropdown = (): void => {
    DropdownButton?.current?.measure(
      (_fx: any, _fy: any, _w: any, h: any, _px: any, py: any) => {
        setDropdownTop(py + h);
      },
    );
    setVisible(true);
  };
  const toggleDropdown = (): void => {
    // eslint-disable-next-line no-unused-expressions
    visible ? setVisible(false) : openDropdown();
  };

  const onItemPress = (item: { label: string; value: string }): void => {
    setSelected(item);
    onSelect(item);
    setVisible(false);
  };

  const renderItem = ({ item }: { item: ItemType }): ReactElement<any, any> => (
    <TouchableOpacity style={S.item} onPress={() => onItemPress(item)}>
      <Text>{item.label}</Text>
    </TouchableOpacity>
  );

  const renderDropdown = (): ReactElement<any, any> => (
    <Modal visible={visible} transparent animationType="none">
      <TouchableOpacity style={S.overlay} onPress={() => setVisible(false)}>
        <View style={[S.dropdown]}>
          <FlatList
            data={items}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </TouchableOpacity>
    </Modal>
  );

  return (
    <TouchableOpacity
      ref={DropdownButton}
      style={[S.button, containerStyle]}
      onPress={toggleDropdown}
    >
      {renderDropdown()}
      <Text style={[S.buttonText, textStyle]}>
        {(selected && selected.label) || label}
      </Text>
      <ArrowDown
        height={16}
        width={16}
        color={theme.colors.brand.secondary[700]}
      />
    </TouchableOpacity>
  );
}

export default Dropdown;
