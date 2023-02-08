import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Image as ReactNativeImageComponent,
  View,
  ActivityIndicator,
  ImageStyle,
  ImageRequireSource,
} from "react-native";
import * as FileSystem from "expo-file-system";
import {
  cacheImage,
  findImageInCache,
  hashFromString,
} from "components/atomics/Image/helpers";

type Props = {
  source: { uri: string } | ImageRequireSource;
  style?: ImageStyle;
};
function Image({ source, style }: Props) {
  if(typeof source === "number") {
    return <ReactNativeImageComponent source={source} style={style} />
  }

  const { uri } = source;
  const isMounted = useRef(true);
  const [imgUri, setUri] = useState("");

  const cacheKey = useCallback(async () => {
    if (!uri) return undefined;

    return hashFromString(uri);
  }, [uri]);

  useEffect(() => {
    async function loadImg() {
      const key = await cacheKey();
      if (!key) return;

      const cacheFileUri = `${FileSystem.cacheDirectory}${key}`;
      const imgXistsInCache = await findImageInCache(cacheFileUri);
      if (imgXistsInCache.exists) {
        setUri(cacheFileUri);
      } else {
        const cached = await cacheImage(uri, cacheFileUri, () => {});
        if (cached.cached && cached.path) {
          setUri(cached.path);
        }
      }
    }
    loadImg();

    return () => {
      isMounted.current = false;
    };
  }, [cacheKey]);
  return imgUri ? (
    <ReactNativeImageComponent source={{ uri: imgUri }} style={style} />
  ) : (
    <View style={{ ...style, alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator size={33} />
    </View>
  );
}
export default Image;
