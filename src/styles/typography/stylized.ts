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
  fontsize: 56,
  lineHeight: 96,
};

export const stylizedDisplayMedium = {
  ...stylizedDisplay,
  fontsize: 48,
  lineHeight: 80,
};

export const stylizedDisplaySmall = {
  ...stylizedDisplay,
  fontsize: 40,
  lineHeight: 68,
};

const stylizedHeading = {
  ...gambarino,
  fontWeight: "400" as any,
};
export const stylizedHeadingLarge = {
  ...stylizedHeading,
  fontsize: 36,
  lineHeight: 70,
};

export const stylizedHeadingMedium = {
  ...stylizedHeading,
  fontsize: 32,
  lineHeight: 56,
};

export const stylizedHeadingSmall = {
  ...stylizedHeading,
  fontsize: 28,
  lineHeight: 48,
};

const stylizedTitle = {
  ...gambarino,
  fontWeight: "400",
};
export const stylizedTitleLarge = {
  ...stylizedTitle,
  fontsize: 24,
  lineHeight: 40,
};

export const stylizedTitleMedium = {
  ...stylizedTitle,
  fontsize: 20,
  lineHeight: 36,
};
