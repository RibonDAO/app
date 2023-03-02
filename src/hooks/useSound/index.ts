import { useCallback, useEffect, useState } from "react";
import { Audio } from 'expo-av';

function useSound() {
  const [sound, setSound] = useState<any>();

  const playSound = useCallback(async () => {
    const { sound } = await Audio.Sound.createAsync(require('./assets/donation-done.mp3')
    );
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
    playSound
  };
}

export default useSound;
