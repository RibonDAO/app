import * as React from "react";
import Svg, { Path } from "react-native-svg";

function VendorIcon() {
  return (
    <Svg width={9} height={16} viewBox="0 0 9 16" fill="none">
      <Path
        d="M8.452 9.558L5.234 8.5c-.477-.157-.477-.842 0-1L8.452 6.44a.416.416 0 00.262-.522l-.25-.781a.408.408 0 00-.516-.266L4.731 5.93c-.477.157-.875-.397-.58-.809l1.988-2.773a.419.419 0 00-.09-.58l-.656-.482a.407.407 0 00-.573.092L2.832 4.15c-.295.412-.938.2-.938-.308V.415A.413.413 0 001.484 0h-.81a.413.413 0 00-.41.415v15.17c0 .23.184.415.41.415h.811c.226 0 .41-.186.41-.415v-3.427c0-.509.643-.72.938-.308l1.988 2.772a.406.406 0 00.572.092l.656-.483a.419.419 0 00.09-.58L4.153 10.88c-.296-.412.102-.966.58-.809l3.217 1.06a.409.409 0 00.516-.267l.25-.781a.416.416 0 00-.263-.523z"
        fill="#00DA93"
      />
    </Svg>
  );
}

export default VendorIcon;
