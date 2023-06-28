import { useCallback, useEffect, useMemo, useState } from "react";
import { Asset } from "expo-asset";
import { Animated, Image, StyleSheet, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import Constants from "expo-constants";
import { logError } from "services/crashReport";

SplashScreen.preventAutoHideAsync();

type Props = { children: JSX.Element; image: any };
function AnimatedSplashScreen({ children, image }: Props) {
  const animation = useMemo(() => new Animated.Value(1), []);
  const [isAppReady, setAppReady] = useState(false);
  const [isSplashAnimationComplete, setAnimationComplete] = useState(false);

  const DURATION = 1000;

  useEffect(() => {
    if (isAppReady) {
      setTimeout(() => {
        Animated.timing(animation, {
          toValue: 0,
          duration: DURATION,
          useNativeDriver: true,
        }).start(() => setAnimationComplete(true));
      }, 1800);
    }
  }, [isAppReady]);

  const onImageLoaded = useCallback(async () => {
    try {
      await SplashScreen.hideAsync();
      // Load stuff
    } catch (e) {
      logError(e);
    } finally {
      setAppReady(true);
    }
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {isAppReady && children}
      {!isSplashAnimationComplete && (
        <Animated.View
          pointerEvents="none"
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor:
                Constants.manifest?.splash?.backgroundColor || "#fff",
              opacity: animation,
            },
          ]}
        >
          <Animated.Image
            style={{
              width: "100%",
              height: "100%",
              resizeMode: Constants.manifest?.splash?.resizeMode || "contain",
            }}
            source={image}
            onLoadEnd={onImageLoaded}
            fadeDuration={0}
          />
        </Animated.View>
      )}
    </View>
  );
}

export function AnimatedAppLoader({ children, image }: Props) {
  const [isSplashReady, setSplashReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      await Asset.fromURI(Image.resolveAssetSource(image).uri).downloadAsync();
      setSplashReady(true);
    }

    prepare();
  }, [image]);

  if (!isSplashReady) {
    return null;
  }

  return <AnimatedSplashScreen image={image}>{children}</AnimatedSplashScreen>;
}
