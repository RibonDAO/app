import React from "react";
import MaskedView from "@react-native-masked-view/masked-view";
import { ImageStyle } from "react-native";
import Image from "components/atomics/Image";
import WaveCut from "components/vectors/WaveCut";

type Props = {
  image?: string;
  imageStyles?: ImageStyle;
};
function MaskedWaveCut({ image, imageStyles }: Props) {
  return (
    <MaskedView
      maskElement={
        <WaveCut width={imageStyles?.width} height={imageStyles?.height} />
      }
    >
      <Image source={{ uri: image }} style={imageStyles} />
    </MaskedView>
  );
}

export default MaskedWaveCut;
