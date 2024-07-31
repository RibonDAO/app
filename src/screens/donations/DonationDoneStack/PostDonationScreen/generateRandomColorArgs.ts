import { theme } from "@ribon.io/shared";

function generateFaceColorFilter(
  eyebrownsColor: string,
  faceColor: string,
  eyesAndMouthColor: string,
) {
  return [
    {
      keypath: "olhos",
      color: eyesAndMouthColor,
    },
    {
      keypath: "boca",
      color: eyesAndMouthColor,
    },
    {
      keypath: "sobran1",
      color: eyebrownsColor,
    },
    {
      keypath: "sobran2",
      color: eyebrownsColor,
    },
    {
      keypath: "rosto1",
      color: faceColor,
    },
    {
      keypath: "rosto2",
      color: faceColor,
    },
    {
      keypath: "rosto3",
      color: faceColor,
    },
    {
      keypath: "rosto4",
      color: faceColor,
    },
    {
      keypath: "rosto5",
      color: faceColor,
    },
    {
      keypath: "rosto6",
      color: faceColor,
    },
  ];
}

function generateSunColorFilter(sunColor: string) {
  return [
    {
      keypath: "sparkVector Outlines",
      color: sunColor,
    },
  ];
}

export function generateRandomColorArgs() {
  const options = [
    {
      eyesAndMouth: theme.colors.brand.primary[500],
      face: theme.colors.brand.primary[50],
      eyeBrowns: theme.colors.brand.primary[300],
      sun: theme.colors.brand.primary[25],
      button: theme.colors.brand.primary[600],
    }, // green
    {
      eyesAndMouth: theme.colors.brand.quaternary[500],
      face: theme.colors.brand.quaternary[300],
      eyeBrowns: theme.colors.brand.quaternary[300],
      sun: theme.colors.brand.quaternary[25],
      button: theme.colors.brand.quaternary[600],
    }, // yellow
    {
      eyesAndMouth: theme.colors.brand.tertiary[500],
      face: theme.colors.brand.tertiary[300],
      eyeBrowns: theme.colors.brand.tertiary[300],
      sun: theme.colors.brand.tertiary[25],
      button: theme.colors.brand.tertiary[600],
    }, // pink
    {
      eyesAndMouth: theme.colors.brand.secondary[500],
      face: theme.colors.brand.secondary[100],
      eyeBrowns: theme.colors.brand.secondary[300],
      sun: theme.colors.brand.secondary[25],
      button: theme.colors.brand.secondary[600],
    }, // orange
    {
      eyesAndMouth: "#5396C9",
      face: "#7BC6FF",
      eyeBrowns: "#7BC6FF",
      sun: "#F6FBFE",
      button: "#3E7AA8",
    }, // blue
  ];

  const randomIndex = Math.floor(Math.random() * options.length);
  const args = options[randomIndex];

  return {
    button: args.button,
    sun: generateSunColorFilter(args.sun),
    face: generateFaceColorFilter(args.eyeBrowns, args.face, args.eyesAndMouth),
  };
}
