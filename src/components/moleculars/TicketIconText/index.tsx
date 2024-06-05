import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native";
import TicketIcon from "components/vectors/TicketIcon";
import { theme } from "@ribon.io/shared/styles";
import Icon from "components/atomics/Icon";
import S from "./styles";

type TicketIconTextProps = {
  quantity: number;
  hasDividerBorder?: boolean;
  buttonDisabled?: boolean;
  onClick?: () => void;
  outline?: boolean;
  color?: string;
};

function TicketIconText({
  quantity,
  hasDividerBorder = false,
  buttonDisabled = false,
  onClick,
  outline = false,
  color,
}: TicketIconTextProps): JSX.Element {
  const hasTickets = quantity > 0;
  const ticketColor =
    color ||
    (hasTickets ? theme.colors.brand.primary[600] : theme.colors.neutral[500]);
  const ticketIcon =
    <TicketIcon color={color} /> ||
    (hasTickets ? (
      <TicketIcon />
    ) : (
      <TicketIcon color={theme.colors.neutral[400]} />
    ));

  const borderStyle = () => {
    if (hasDividerBorder) {
      return {
        borderColor: theme.colors.neutral[100],
        borderRightWidth: 1,
        paddingVertical: 5,
        paddingHorizontal: 7,
      };
    }
    return {};
  };

  const outlineIcon = () => (
    <Icon
      type="outlined"
      name="confirmation_number"
      size={24}
      color={theme.colors.neutral10}
    />
  );

  return (
    <TouchableOpacity
      accessibilityRole="button"
      style={S.container}
      onPress={onClick}
      disabled={buttonDisabled}
    >
      <View
        style={{
          ...S.ticketSection,
          ...borderStyle(),
        }}
      >
        {outline ? outlineIcon() : ticketIcon}
        <Text
          style={{
            ...S.ticketCounter,
            color: outline ? theme.colors.neutral10 : ticketColor,
          }}
        >
          {String(quantity)}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default TicketIconText;
