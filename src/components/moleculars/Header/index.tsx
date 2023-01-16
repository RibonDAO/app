import RibonLogo from "components/vectors/RibonLogo";
import { View } from "components/Themed";
import S from "./styles";
import Button from "components/atomics/buttons/Button";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "hooks/useNavigation";

export type Props = {
  sideLogo?: string;
  rightComponent?: JSX.Element;
  hasBackButton?: boolean;
  onBackButtonClick?: () => void;
};

function Header({
  sideLogo,
  rightComponent,
  hasBackButton = false,
  onBackButtonClick,
}: Props): JSX.Element {
  const { navigateTo } = useNavigation();

  function navigateToTicketsPage() {
    navigateTo("CausesScreen");
  }

  return (
    <SafeAreaView style={S.container}>
      <View style={S.insideContainer}>
        {hasBackButton ? (
          <Button
            onPress={() => onBackButtonClick}
            text="Voltar"
          />
        ) : (
          <>
            <TouchableOpacity onPress={() => navigateToTicketsPage()}>
              <RibonLogo />
            </TouchableOpacity>

            {sideLogo && (
              <>
                <View style={S.divider}>|</View>
                <TouchableOpacity onPress={() => navigateToTicketsPage()}>
                  <RibonLogo />
                </TouchableOpacity>
              </>
            )}
          </>
        )}
      </View>
      {rightComponent && (
        <View style={S.insideContainer}>{rightComponent}</View>
      )}
    </SafeAreaView>
  );
}

export default Header;
