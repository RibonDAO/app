import RibonLogo from "components/vectors/RibonLogo";
import { TouchableOpacity, View } from "react-native";
import { useNavigation } from "hooks/useNavigation";
import { withPlaceholder } from "config/navigation/withPlaceholder";
import HeaderPlaceholder from "components/moleculars/Header/placeholder";
import { theme } from "@ribon.io/shared/styles";
import Icon from "components/atomics/Icon";
import S from "./styles";

export type Props = {
  sideLogo?: JSX.Element;
  rightComponent?: JSX.Element;
  hasBackButton?: boolean;
  backButtonColor?: string;
  onBackButtonClick?: () => void;
  onSideLogoClick?: () => void;
};

function Header({
  sideLogo,
  rightComponent,
  hasBackButton = false,
  onBackButtonClick,
  onSideLogoClick,
  backButtonColor = theme.colors.brand.primary[900],
}: Props): JSX.Element {
  const { navigateTo, popNavigation } = useNavigation();

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
    <View style={S.container}>
      <View style={S.insideContainer}>
        {hasBackButton ? (
          <TouchableOpacity
            accessibilityRole="button"
            onPress={handleBackButtonClick}
            testID="arrow-back-button"
          >
            <Icon
              type="outlined"
              name="arrow_back"
              size={24}
              color={backButtonColor}
            />
          </TouchableOpacity>
        ) : (
          <View style={S.logoContainer}>
            <TouchableOpacity
              accessibilityRole="button"
              onPress={() => navigateToTicketsPage()}
            >
              <RibonLogo />
            </TouchableOpacity>

            {sideLogo && (
              <TouchableOpacity
                accessibilityRole="button"
                onPress={() => onSideLogoClick && onSideLogoClick()}
                style={S.logo}
                disabled={!onSideLogoClick}
              >
                {sideLogo}
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
      {rightComponent && (
        <View style={S.insideContainer}>{rightComponent}</View>
      )}
    </View>
  );
}
export default withPlaceholder(Header, HeaderPlaceholder);
