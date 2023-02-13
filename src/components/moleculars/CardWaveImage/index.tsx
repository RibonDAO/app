import MaskedWaveCut from "components/moleculars/MaskedWaveCut";
import { Text, View } from "react-native";
import Button from "components/atomics/buttons/Button";
import { theme } from "@ribon.io/shared/styles";
import S from "./styles";

type Props = {
  image: string;
  title?: string;
  subtitle?: string;
  buttonText: string;
  onButtonClick: () => void;
  children?: JSX.Element | JSX.Element[];
};
function CardWaveImage({
  image,
  subtitle,
  title,
  onButtonClick,
  buttonText,
  children,
}: Props) {
  return (
    <View style={S.contentContainer}>
      <MaskedWaveCut imageStyles={S.supportImage} image={image} />

      <View style={S.donateContainer}>
        {title && <Text style={S.title}>{title}</Text>}
        {subtitle && <Text style={S.subtitle}>{subtitle}</Text>}
        <View style={S.givingContainer}>
          <View style={S.contributionContainer}>{children}</View>
        </View>
        <Button
          text={buttonText}
          onPress={onButtonClick}
          borderColor={theme.colors.red20}
          backgroundColor={theme.colors.red20}
          textColor={theme.colors.red40}
          customTextStyles={{
            fontWeight: "600",
          }}
          customStyles={{
            height: 50,
          }}
        />
      </View>
    </View>
  );
}

export default CardWaveImage;
