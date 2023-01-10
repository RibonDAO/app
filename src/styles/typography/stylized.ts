/* Gambarino */

const gambarino = {
  fontFamily: "Gambarino-Regular",
};

const stylizedDisplay = {
  ...gambarino,
  fontWeight: "400" as any,
};

export const stylizedDisplayLarge = {
  ...stylizedDisplay,
  fontSize: 56,
  lineHeight: 96,
};

export const stylizedDisplayMedium = {
  ...stylizedDisplay,
  fontSize: 48,
  lineHeight: 80,
};

export const stylizedDisplaySmall = {
  ...stylizedDisplay,
  fontSize: 40,
  lineHeight: 68,
};

const stylizedHeading = {
  ...gambarino,
  fontWeight: "400" as any,
};
export const stylizedHeadingLarge = {
  ...stylizedHeading,
  fontSize: 36,
  lineHeight: 70,
};

export const stylizedHeadingMedium = {
  ...stylizedHeading,
  fontSize: 32,
  lineHeight: 56,
};

export const stylizedHeadingSmall = {
  ...stylizedHeading,
  fontSize: 28,
  lineHeight: 48,
};

const stylizedTitle = {
  ...gambarino,
  fontWeight: "400",
};
export const stylizedTitleLarge = {
  ...stylizedTitle,
  fontSize: 24,
  lineHeight: 40,
};

export const stylizedTitleMedium = {
  ...stylizedTitle,
  fontSize: 20,
  lineHeight: 36,
};
