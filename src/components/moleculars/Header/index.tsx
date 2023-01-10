import RibonLogo from "components/vectors/RibonLogo";
import { View } from "components/Themed";
import S from "./styles";
import Button from "components/atomics/Button";
import { SafeAreaView } from "react-native-safe-area-context";

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
  return (
    <SafeAreaView style={S.container}>
      <View style={S.insideContainer}>
        {hasBackButton ? (
          <Button
            onPress={() => {}}
            text="Opa"
          />
        ) : (
          <>
            <RibonLogo />
            {sideLogo && (
              <>
                <View style={S.divider}>|</View>
                <RibonLogo />{" "}
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
