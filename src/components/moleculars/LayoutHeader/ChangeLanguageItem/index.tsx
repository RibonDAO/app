import ButtonSwitch from "components/atomics/buttons/ButtonSwitch";
import { View } from "components/Themed";
import { useLanguage } from "hooks/useLanguage";

function ChangeLanguageItem(): JSX.Element {
  const { currentLang, handleSwitchLanguage } = useLanguage();

  function handleSwitch() {
    handleSwitchLanguage();
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
