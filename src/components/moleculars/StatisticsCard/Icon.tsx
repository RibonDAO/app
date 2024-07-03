import TicketColorsIcon from "components/vectors/TicketColorsIcon";
import CalendarIcon from "components/vectors/CalendarIcon";
import { IconType } from ".";

type IconProps = { icon: IconType };
export function Icon({ icon }: IconProps) {
  switch (icon) {
    case "TicketColorsIcon":
      return <TicketColorsIcon />;
    case "CalendarIcon":
      return <CalendarIcon />;
    default:
      return null;
  }
}
