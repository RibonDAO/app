import RibonLogo from "components/vectors/RibonLogo";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "hooks/useNavigation";
import { withPlaceholder } from "config/navigation/withPlaceholder";
import { theme } from "@ribon.io/shared/styles";
import HeaderPlaceholder from "components/moleculars/Header/placeholder";
import Icon from "components/atomics/Icon";
import * as S from "./styles";

export type Props = {
  sideLogo?: JSX.Element;
  rightComponent?: JSX.Element;
  hasBackButton?: boolean;
  backButtonColor?: string;
  outline?: boolean;
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
  outline = false,
}: Props): JSX.Element {
  const { navigateTo, popNavigation } = useNavigation();

  const navigateToTicketsPage = () => {
    navigateTo("Cause");
  };

  const handleBackButtonClick = () => {
    if (onBackButtonClick) {
      onBackButtonClick();
    }

    popNavigation();
  };

  return (
    <S.Container outline={outline}>
      <S.InsideContainer>
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
          <S.LogoContainer>
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
          </S.LogoContainer>
        )}
      </S.InsideContainer>
      {rightComponent && (
        <S.InsideContainer>{rightComponent}</S.InsideContainer>
      )}
    </S.Container>
  );
}
export default withPlaceholder(Header, HeaderPlaceholder);
