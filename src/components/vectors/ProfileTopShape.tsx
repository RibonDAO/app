import { SvgXml } from "react-native-svg";

type Props = {
  userType: string;
};

function ProfileTopShape({ userType }: Props) {
  const free = `
  <svg width="577" height="433" viewBox="0 0 577 433" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M359.9 432.5C358.3 432.5 356.9 432.5 355.5 432.5C354.9 432.5 354.2 432.5 353.6 432.5H71C31.8 432.5 0 400.6 0 361.5V79C0 48 25.2 22.8 56.3 22.8C71.2 22.8 85.3 28.7 95.9 39.3L169.8 113.2C182.5 89.8 199.5 68.8 219.8 51.5C258.8 18.3 308.6 0 359.9 0C479.1 0 576.2 97 576.2 216.3C576.1 335.5 479.1 432.5 359.9 432.5Z" fill="#6DDFA6"/>
  <path d="M359.9 412.5C358.2 412.5 356.6 412.5 355.2 412.4C354.7 412.4 354.2 412.5 353.6 412.5H71C42.9 412.5 20 389.6 20 361.5V79C20 59 36.3 42.8 56.3 42.8C65.9 42.8 74.9 46.6 81.8 53.4L176 147.6C187.6 116.5 207.1 88.5 232.8 66.7C268.2 36.6 313.3 20 359.9 20C468.1 20 556.2 108 556.2 216.3C556.1 324.5 468.1 412.5 359.9 412.5Z" fill="#1D8158"/>
  <path d="M186.2 186.2L67.6 67.6004C57.4 57.4004 40 64.6004 40 79.0004V361.5C40 378.6 53.9 392.5 71 392.5H353.5C353.9 392.5 354.2 392.4 354.6 392.4C356.3 392.5 358.1 392.5 359.8 392.5C457.2 392.5 536.1 313.6 536.1 216.2C536.1 118.8 457.2 39.9004 359.8 39.9004C272.8 40.0004 200.5 103.2 186.2 186.2Z" fill="#025F39"/>
  </svg>
  `;

  const club = `
  <svg width="577" height="433" viewBox="0 0 577 433" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M359.9 432.5C358.3 432.5 356.9 432.5 355.5 432.5C354.9 432.5 354.2 432.5 353.6 432.5H71C31.8 432.5 0 400.6 0 361.5V79C0 48 25.2 22.8 56.3 22.8C71.2 22.8 85.3 28.7 95.9 39.3L169.8 113.2C182.5 89.8 199.5 68.8 219.8 51.5C258.8 18.3 308.6 0 359.9 0C479.1 0 576.2 97 576.2 216.3C576.1 335.5 479.1 432.5 359.9 432.5Z" fill="#FF8FA9"/>
  <path d="M359.9 412.5C358.2 412.5 356.6 412.5 355.2 412.4C354.7 412.4 354.2 412.5 353.6 412.5H71C42.9 412.5 20 389.6 20 361.5V79C20 59 36.3 42.8 56.3 42.8C65.9 42.8 74.9 46.6 81.8 53.4L176 147.6C187.6 116.5 207.1 88.5 232.8 66.7C268.2 36.6 313.3 20 359.9 20C468.1 20 556.2 108 556.2 216.3C556.1 324.5 468.1 412.5 359.9 412.5Z" fill="#E65C6C"/>
  <path d="M186.2 186.2L67.6 67.6004C57.4 57.4004 40 64.6004 40 79.0004V361.5C40 378.6 53.9 392.5 71 392.5H353.5C353.9 392.5 354.2 392.4 354.6 392.4C356.3 392.5 358.1 392.5 359.8 392.5C457.2 392.5 536.1 313.6 536.1 216.2C536.1 118.8 457.2 39.9004 359.8 39.9004C272.8 40.0004 200.5 103.2 186.2 186.2Z" fill="#9A233B"/>
  </svg>
  `;

  const business = `
   <svg width="577" height="433" viewBox="0 0 577 433" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M359.9 432.5C358.3 432.5 356.9 432.5 355.5 432.5C354.9 432.5 354.2 432.5 353.6 432.5H71C31.8 432.5 0 400.6 0 361.5V79C0 48 25.2 22.8 56.3 22.8C71.2 22.8 85.3 28.7 95.9 39.3L169.8 113.2C182.5 89.8 199.5 68.8 219.8 51.5C258.8 18.3 308.6 0 359.9 0C479.1 0 576.2 97 576.2 216.3C576.1 335.5 479.1 432.5 359.9 432.5Z" fill="#9AD0F9"/>
  <path d="M359.9 412.5C358.2 412.5 356.6 412.5 355.2 412.4C354.7 412.4 354.2 412.5 353.6 412.5H71C42.9 412.5 20 389.6 20 361.5V79C20 59 36.3 42.8 56.3 42.8C65.9 42.8 74.9 46.6 81.8 53.4L176 147.6C187.6 116.5 207.1 88.5 232.8 66.7C268.2 36.6 313.3 20 359.9 20C468.1 20 556.2 108 556.2 216.3C556.1 324.5 468.1 412.5 359.9 412.5Z" fill="#FFD6E5"/>
  <path d="M186.2 186.2L67.6 67.6004C57.4 57.4004 40 64.6004 40 79.0004V361.5C40 378.6 53.9 392.5 71 392.5H353.5C353.9 392.5 354.2 392.4 354.6 392.4C356.3 392.5 358.1 392.5 359.8 392.5C457.2 392.5 536.1 313.6 536.1 216.2C536.1 118.8 457.2 39.9004 359.8 39.9004C272.8 40.0004 200.5 103.2 186.2 186.2Z" fill="#235174"/>
  </svg>
`;

  if (userType === "club") {
    return <SvgXml xml={club} />;
  }
  if (userType === "business") {
    return <SvgXml xml={business} />;
  }
  return <SvgXml xml={free} />;
}

export default ProfileTopShape;
