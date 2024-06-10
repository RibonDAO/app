import Markdown, { MarkdownIt } from "react-native-markdown-display";

import DefaultBackground from "./assets/DefaultBackground";
import * as S from "./styles";

export type Props = {
  markdownText?: string;
  backgroundImage?: string;
};

function DefaultBackgroundComponent({
  markdownText,
}: {
  markdownText: string | undefined;
}) {
  return (
    <S.Container>
      <S.BackgroundContainer>
        <DefaultBackground />
      </S.BackgroundContainer>

      <S.MarkdownContainer>
        <Markdown
          style={S.MarkdownStyle}
          markdownit={MarkdownIt({
            breaks: true,
            linkify: true,
            typographer: true,
            html: true,
          })}
        >
          {markdownText}
        </Markdown>
      </S.MarkdownContainer>
    </S.Container>
  );
}

function ImageBackgroundComponent({ markdownText, backgroundImage }: Props) {
  return (
    <S.Container>
      <S.ImageBackground
        source={{ uri: backgroundImage }}
        resizeMode="cover"
        imageStyle={{ borderRadius: 16 }}
        testID="image-background"
      >
        <S.MarkdownContainer>
          {markdownText && (
            <Markdown
              style={S.MarkdownStyle}
              markdownit={MarkdownIt({
                breaks: true,
                linkify: true,
                typographer: true,
                html: true,
              })}
            >
              {markdownText}
            </Markdown>
          )}
        </S.MarkdownContainer>
      </S.ImageBackground>
    </S.Container>
  );
}

function CardNonProfitStories({ markdownText, backgroundImage }: Props) {
  return (
    <S.Container>
      {backgroundImage ? (
        <ImageBackgroundComponent
          markdownText={markdownText}
          backgroundImage={backgroundImage}
        />
      ) : (
        markdownText && (
          <DefaultBackgroundComponent markdownText={markdownText} />
        )
      )}
    </S.Container>
  );
}

export default CardNonProfitStories;
