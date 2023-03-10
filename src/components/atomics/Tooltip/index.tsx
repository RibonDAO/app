import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity, Modal, Dimensions } from "react-native";
import S from "./styles";

type Props = {
  tooltipText: string;
  children: JSX.Element;
};

const { height: fullHeight } = Dimensions.get("window");
function Tooltip({ tooltipText, children }: Props) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const textRef = useRef<any>();

  const handlePress = () => {
    textRef.current?.measure(
      (
        x: number,
        y: number,
        width: number,
        height: number,
        pageX: number,
        pageY: number,
      ) => {
        setTooltipPosition({
          top: pageY - height - 40,
          left: pageX + 10,
        });
        setShowTooltip(true);
      },
    );
  };

  return (
    <View style={S.container}>
      <TouchableOpacity ref={textRef} onPress={handlePress}>
        {children}
      </TouchableOpacity>
      <Modal visible={showTooltip} transparent>
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => setShowTooltip(false)}
        >
          <View style={[S.tooltip, tooltipPosition]}>
            <Text style={S.tooltipText}>{tooltipText}</Text>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

export default Tooltip;
