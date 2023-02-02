import ButtonSwitch from "components/atomics/buttons/ButtonSwitch";
import { View } from "react-native";
import { useLanguage } from "contexts/languageContext";

function ChangeLanguageItem(): JSX.Element {
  const { currentLang, handleSwitchLanguage } = useLanguage();

  function handleSwitch() {
    if (handleSwitchLanguage) handleSwitchLanguage();
  }

  return (
    <View>
      <ButtonSwitch
        leftText="PT"
        rightText="EN"
        onSwitch={() => handleSwitch()}
        initialCheckState={currentLang === "en-US"}
      />
    </View>
  );
}

export default ChangeLanguageItem;
