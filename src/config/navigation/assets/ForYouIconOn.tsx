import { useTasksContext } from "contexts/tasksContext";
import * as React from "react";
import { View } from "react-native";
import Svg, { Mask, Path, G } from "react-native-svg";
import S from "./styles";

function ForYouIconOn() {
  const { hasCompletedATask } = useTasksContext();

  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Mask
        id="a"
        maskUnits="userSpaceOnUse"
        x={0}
        y={0}
        width={24}
        height={24}
      >
        <Path fill="#D9D9D9" d="M0 0H24V24H0z" />
      </Mask>
      <G mask="url(#a)">
        <Path
          d="M4.058 20.75a1.74 1.74 0 01-1.277-.531 1.74 1.74 0 01-.531-1.277V4.49c0-.247.06-.396.18-.446.121-.051.269.01.443.185l.802.802 1.017-1.027a.926.926 0 01.298-.206.867.867 0 01.336-.065 1 1 0 01.341.058.81.81 0 01.3.197L7 5.031l1.033-1.043a.801.801 0 01.297-.197.997.997 0 01.343-.058c.122 0 .235.021.338.065a.93.93 0 01.297.206l1.017 1.027 1.042-1.043a.826.826 0 01.298-.198.969.969 0 01.336-.057.829.829 0 01.631.256l1.043 1.042 1.017-1.027a.926.926 0 01.298-.206.867.867 0 01.336-.065 1 1 0 01.341.058.81.81 0 01.3.197L17 5.031l1.033-1.043a.8.8 0 01.297-.197.997.997 0 01.343-.058c.122 0 .235.021.339.065a.93.93 0 01.296.206l1.017 1.027.802-.802c.174-.175.322-.236.442-.185.12.05.181.2.181.446v14.452c0 .497-.177.923-.531 1.277a1.74 1.74 0 01-1.277.53H4.058zm0-1.5h7.192v-6.5h-7.5v6.192a.3.3 0 00.087.221.3.3 0 00.22.087zm8.692 0h7.192a.3.3 0 00.221-.087.3.3 0 00.087-.22V16.75h-7.5v2.5zm0-4h7.5v-2.5h-7.5v2.5zm-9-4h16.5V7.654H3.75v3.596z"
          fill="#00DA93"
        />
      </G>
      {hasCompletedATask && <View style={S.redBall} />}
    </Svg>
  );
}

export default ForYouIconOn;
