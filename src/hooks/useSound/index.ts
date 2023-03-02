import { useCallback, useEffect, useState } from "react";
import { Audio, AVPlaybackSource } from "expo-av";

function useSound() {
  const [sound, setSound] = useState<any>();

  const playSound = useCallback(async (soundFile: AVPlaybackSource) => {
    const { sound } = await Audio.Sound.createAsync(soundFile);
    setSound(sound);

    await sound.playAsync();
  }, []);

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return {
    playSound,
  };
}

export default useSound;
