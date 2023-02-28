import MaskedWaveCut from "components/moleculars/MaskedWaveCut";
import { Text, View } from "react-native";
import Button from "components/atomics/buttons/Button";
import { theme } from "@ribon.io/shared/styles";
import S from "./styles";

type Props = {
  image: string;
  title?: string;
  subtitle?: string | JSX.Element;
  buttonText: string;
  onButtonClick: () => void;
  children?: JSX.Element | JSX.Element[];
};

const { tertiary } = theme.colors.brand;

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
          borderColor={tertiary[200]}
          backgroundColor={tertiary[200]}
          textColor={tertiary[800]}
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
