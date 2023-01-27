import RibonLogo from "components/vectors/RibonLogo";
import { View } from "components/Themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "hooks/useNavigation";
import ArrowLeft from "components/vectors/ArrowLeft";
import S from "./styles";
import useNavigationReady from "hooks/useNavigationReady";

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
  const { navigateTo, popNavigation } = useNavigation();
  const navigationReady = useNavigationReady();

  const navigateToTicketsPage = () => {
    navigateTo("CausesScreen");
  };

  const handleBackButtonClick = () => {
    if (onBackButtonClick) {
      onBackButtonClick();
    }

    popNavigation();
  };

  return (
    <SafeAreaView style={S.container}>
      <View style={S.insideContainer}>
        {hasBackButton ? (
          <TouchableOpacity
            onPress={handleBackButtonClick}
            testID="arrow-back-button"
          >
            <ArrowLeft />
          </TouchableOpacity>
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
      {rightComponent && navigationReady && (
        <View style={S.insideContainer}>{rightComponent}</View>
      )}
    </SafeAreaView>
  );
}

export default Header;
