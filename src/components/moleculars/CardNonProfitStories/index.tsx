import Markdown from "react-native-markdown-display";
import DefaultBackground from "./assets/DefaultBackground";
import * as S from "./styles";

export type Props = {
  children?: JSX.Element | JSX.Element[];
  markdownText?: string;
  backgroundImage?: string;
};

function CardNonProfitStories({
  markdownText,
  backgroundImage,
  children,
}: Props) {
  return (
    <S.Container>
      {backgroundImage ? (
        <S.ImageBackground
          source={{ uri: backgroundImage }}
          resizeMode="cover"
          imageStyle={{ borderRadius: 16 }}
        >
          <S.MarkdownContainer>
            <Markdown>{markdownText}</Markdown>
          </S.MarkdownContainer>
          {children}
        </S.ImageBackground>
      ) : (
        <>
          <DefaultBackground height={432} width={432} />
          <S.MarkdownContainer>
            <Markdown>{markdownText}</Markdown>
          </S.MarkdownContainer>
          {children}
        </>
      )}
    </S.Container>
  );
}

export default CardNonProfitStories;
