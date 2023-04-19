import Icon from "components/atomics/Icon";
import { Dispatch, useState } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import S from "./styles";

export type Props = {
  title: string;
  description: string;
  firstLink?: string;
  onFirstLinkClick?: (setVisible: Dispatch<boolean>) => void;
  secondLink?: string;
  onSecondLinkClick?: (setVisible: Dispatch<boolean>) => void;
  type: "success" | "warning" | "error" | "informational";
  onCloseClick?: () => void;
};
function InlineNotification({
  title,
  description,
  firstLink,
  onFirstLinkClick,
  secondLink,
  onSecondLinkClick,
  type,
  onCloseClick,
}: Props): JSX.Element {
  const [visible, setVisible] = useState(true);

  const handleCloseIconClick = () => {
    setVisible(false);
    if (onCloseClick) onCloseClick();
  };

  const handleFirstLinkClick = () => {
    if (onFirstLinkClick) onFirstLinkClick(setVisible);
  };

  const handleSecondLinkClick = () => {
    if (onSecondLinkClick) onSecondLinkClick(setVisible);
  };

  const iconByType = () => {
    switch (type) {
      case "success":
        return "check_circle";
      case "warning":
        return "warning";
      case "error":
        return "dangerous";
      case "informational":
        return "info";
      default:
        return "info";
    }
  };

  if (!visible) return <View />;

  return (
    <View
      style={[
        S.container,
        type === "success" && S.success,
        type === "warning" && S.warning,
        type === "error" && S.error,
        type === "informational" && S.informational,
      ]}
    >
      <View style={S.leftContainer}>
        <Icon type="sharp" name={iconByType()} size={24} />
        <View style={S.textContainer}>
          <Text style={S.title}>{title}</Text>
          <Text style={S.description}>{description}</Text>
          <View style={S.links}>
            {firstLink && (
              <TouchableOpacity onPress={handleFirstLinkClick}>
                <Text style={S.link}>{firstLink}</Text>
              </TouchableOpacity>
            )}
            {secondLink && (
              <TouchableOpacity onPress={handleSecondLinkClick}>
                <Text style={S.link}>{secondLink}</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
      <View style={S.rightContainer}>
        <TouchableOpacity onPress={handleCloseIconClick}>
          <Icon type="sharp" name="close" size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default InlineNotification;
