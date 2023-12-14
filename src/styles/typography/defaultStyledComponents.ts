import { css } from "styled-components/native";

/* Inter */

const inter400 = {
  fontFamily: "Inter400",
};

const inter500 = {
  fontFamily: "Inter500",
};

const inter600 = {
  fontFamily: "Inter600",
};

const inter700 = {
  fontFamily: "Inter700",
};

/* Heading */
const defaultHeading = css`
  font-weight: 700;
  ${inter700}
`;

export const defaultHeadingXl = css`
  ${defaultHeading}
  font-size: 40px;
  line-height: 52px;
`;

export const defaultHeadingLg = css`
  ${defaultHeading}
  font-size: 36px;
  line-height: 48px;
`;

export const defaultHeadingMd = css`
  ${defaultHeading}
  font-size: 32px;
  line-height: 44px;
`;

export const defaultHeadingSm = css`
  ${defaultHeading}
  font-size: 28px;
  line-height: 40px;
`;

export const defaultHeadingXs = css`
  ${defaultHeading}
  font-size: 24px;
  line-height: 36px;
`;

export const defaultHeadingXxs = css`
  ${defaultHeading}
  font-size: 20px;
  line-height: 28px;
`;

/* Body */
const defaultBodyRegular = css`
  font-weight: 400;
  ${inter400}
`;

const defaultBodyMedium = css`
  font-weight: 500;
  ${inter500}
`;

const defaultBodySemibold = css`
  font-weight: 600;
  ${inter600}
`;

const defaultBodyBold = css`
  font-weight: 700;
  ${inter700}
`;

const defaultBodyLg = css`
  font-size: 18px;
  line-height: 28px;
`;

const defaultBodyMd = css`
  font-size: 16px;
  line-height: 24px;
`;

const defaultBodySm = css`
  font-size: 14px;
  line-height: 24px;
`;

const defaultBodyXs = css`
  font-size: 12px;
  line-height: 20px;
`;

export const defaultBodyLgRegular = css`
  ${defaultBodyRegular}
  ${defaultBodyLg}
`;

export const defaultBodyMdRegular = css`
  ${defaultBodyRegular}
  ${defaultBodyMd}
`;

export const defaultBodySmRegular = css`
  ${defaultBodyRegular}
  ${defaultBodySm}
`;

export const defaultBodyXsRegular = css`
  ${defaultBodyRegular}
  ${defaultBodyXs}
`;

export const defaultBodyLgMedium = css`
  ${defaultBodyMedium}
  ${defaultBodyLg}
`;

export const defaultBodyMdMedium = css`
  ${defaultBodyMedium}
  ${defaultBodyMd}
`;

export const defaultBodySmMedium = css`
  ${defaultBodyMedium}
  ${defaultBodySm}
`;

export const defaultBodyXsMedium = css`
  ${defaultBodyMedium}
  ${defaultBodyXs}
`;

export const defaultBodyLgSemibold = css`
  ${defaultBodySemibold}
  ${defaultBodyLg}
`;

export const defaultBodyMdSemibold = css`
  ${defaultBodySemibold}
  ${defaultBodyMd}
`;

export const defaultBodySmSemibold = css`
  ${defaultBodySemibold}
  ${defaultBodySm}
`;

export const defaultBodyXsSemibold = css`
  ${defaultBodySemibold}
  ${defaultBodyXs}
`;

export const defaultBodyLgBold = css`
  ${defaultBodyBold}
  ${defaultBodyLg}
`;

export const defaultBodyMdBold = css`
  ${defaultBodyBold}
  ${defaultBodyMd}
`;

export const defaultBodySmBold = css`
  ${defaultBodyBold}
  ${defaultBodySm}
`;

export const defaultBodyXsBold = css`
  ${defaultBodyBold}
  ${defaultBodyXs}
`;
