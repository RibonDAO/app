import * as React from "react";
import Svg, { G, Path, Defs, ClipPath, Rect } from "react-native-svg";

function ApplePayIcon() {
  return <Svg width={50} height={32} viewBox="0 0 50 32" fill="none">
    <G clipPath="url(#clip0_588_17149)">
      <Path
        d="M45.5223 0H4.47773C4.30679 0 4.13554 0 3.9649 0.000996555C3.82065 0.00202331 3.67675 0.00362383 3.53284 0.00754966C3.21898 0.0160355 2.90243 0.0345472 2.5925 0.0902335C2.27762 0.146886 1.9846 0.239294 1.69875 0.384791C1.41773 0.52766 1.16045 0.71453 0.93749 0.937516C0.714433 1.1605 0.527509 1.41728 0.384627 1.69852C0.239056 1.98429 0.14656 2.27731 0.0902834 2.59234C0.0342814 2.90227 0.0156403 3.21866 0.00718217 3.53209C0.00331559 3.67596 0.00165719 3.81982 0.000717733 3.96366C-0.000279119 4.13461 5.31654e-05 4.30545 5.31654e-05 4.4767V27.5236C5.31654e-05 27.6949 -0.000279119 27.8654 0.000717733 28.0367C0.00165719 28.1805 0.00331559 28.3244 0.00718217 28.4683C0.0156403 28.7814 0.0342814 29.0978 0.0902834 29.4077C0.14656 29.7228 0.239056 30.0157 0.384627 30.3015C0.527509 30.5827 0.714433 30.8399 0.93749 31.0625C1.16045 31.2859 1.41773 31.4727 1.69875 31.6152C1.9846 31.7611 2.27762 31.8535 2.5925 31.9102C2.90243 31.9655 3.21898 31.9843 3.53284 31.9928C3.67675 31.9961 3.82065 31.998 3.9649 31.9987C4.13554 32 4.30679 32 4.47773 32H45.5223C45.693 32 45.8642 32 46.0348 31.9987C46.1787 31.998 46.3226 31.9961 46.4672 31.9928C46.7804 31.9843 47.0969 31.9655 47.4076 31.9102C47.722 31.8535 48.0151 31.7611 48.301 31.6152C48.5823 31.4727 48.8388 31.2859 49.0623 31.0625C49.285 30.8399 49.4719 30.5827 49.6151 30.3015C49.761 30.0157 49.8534 29.7228 49.9094 29.4077C49.9655 29.0978 49.9837 28.7814 49.9921 28.4683C49.9961 28.3244 49.998 28.1805 49.9987 28.0367C50 27.8654 50 27.6949 50 27.5236V4.4767C50 4.30545 50 4.13461 49.9987 3.96366C49.998 3.81982 49.9961 3.67596 49.9921 3.53209C49.9837 3.21866 49.9655 2.90227 49.9094 2.59234C49.8534 2.27731 49.761 1.98429 49.6151 1.69852C49.4719 1.41728 49.285 1.1605 49.0623 0.937516C48.8388 0.71453 48.5823 0.52766 48.301 0.384791C48.0151 0.239294 47.722 0.146886 47.4076 0.0902335C47.0969 0.0345472 46.7804 0.0160355 46.4672 0.00754966C46.3226 0.00362383 46.1787 0.00202331 46.0348 0.000996555C45.8642 0 45.693 0 45.5223 0Z"
        fill="black"
      />
      <Path
        d="M45.5223 1.06641L46.0272 1.06737C46.164 1.06834 46.3008 1.06982 46.4383 1.07356C46.6776 1.08003 46.9575 1.09298 47.2183 1.13973C47.4451 1.18056 47.6353 1.24265 47.8178 1.33554C47.998 1.42707 48.1631 1.54702 48.3072 1.69091C48.4519 1.83578 48.572 2.00108 48.6648 2.18321C48.7572 2.36425 48.8189 2.55348 48.8595 2.78184C48.9062 3.0398 48.9191 3.32034 48.9256 3.56099C48.9293 3.69683 48.9311 3.83266 48.9318 3.97173C48.9331 4.1399 48.9331 4.30799 48.9331 4.4765V27.5234C48.9331 27.6919 48.9331 27.8597 48.9318 28.0315C48.9311 28.1673 48.9293 28.3031 48.9256 28.4392C48.9191 28.6795 48.9062 28.9599 48.859 29.2209C48.8189 29.4461 48.7573 29.6354 48.6643 29.8173C48.5718 29.999 48.4519 30.1641 48.3078 30.3081C48.1629 30.453 47.9983 30.5726 47.816 30.665C47.6348 30.7574 47.445 30.8195 47.2204 30.8599C46.9543 30.9073 46.6627 30.9203 46.4431 30.9263C46.3049 30.9294 46.1674 30.9312 46.0265 30.9319C45.8587 30.9332 45.6902 30.9332 45.5223 30.9332H4.47773C4.47549 30.9332 4.47332 30.9332 4.47105 30.9332C4.30509 30.9332 4.1388 30.9332 3.96982 30.9319C3.83204 30.9312 3.69457 30.9294 3.56165 30.9264C3.33703 30.9203 3.04525 30.9073 2.78127 30.8602C2.55481 30.8194 2.36495 30.7574 2.18141 30.6638C2.0008 30.5722 1.83637 30.4527 1.69135 30.3075C1.54744 30.1639 1.42785 29.9993 1.33538 29.8173C1.24282 29.6356 1.1809 29.4457 1.14018 29.2178C1.09312 28.9573 1.08019 28.6781 1.07373 28.4394C1.07004 28.3028 1.0685 28.1661 1.06762 28.0303L1.06696 27.6293L1.06699 27.5234V4.4765L1.06696 4.37062L1.06759 3.97046C1.0685 3.83381 1.07004 3.69719 1.07373 3.56066C1.08019 3.32176 1.09312 3.04236 1.14057 2.7797C1.18093 2.55384 1.24282 2.36401 1.33586 2.18134C1.4276 2.00078 1.54741 1.83596 1.69208 1.69137C1.83617 1.54726 2.00113 1.42746 2.18289 1.33505C2.36446 1.24262 2.55468 1.18056 2.78115 1.13982C3.04208 1.09295 3.32214 1.08003 3.56199 1.07353C3.6987 1.06982 3.83542 1.06834 3.97112 1.0674L4.47773 1.06641H45.5223Z"
        fill="white"
      />
      <Path
        d="M13.6491 10.763C14.0771 10.2277 14.3676 9.50892 14.291 8.77441C13.6645 8.80557 12.8999 9.18775 12.4573 9.72348C12.0598 10.1823 11.7081 10.9311 11.7998 11.6348C12.5031 11.6959 13.2057 11.2833 13.6491 10.763Z"
        fill="black"
      />
      <Path
        d="M14.2837 11.7721C13.2621 11.7113 12.3934 12.3518 11.9055 12.3518C11.4173 12.3518 10.6702 11.8028 9.86215 11.8176C8.81039 11.833 7.83447 12.4275 7.30075 13.3731C6.20297 15.2646 7.01105 18.0704 8.07858 19.6109C8.597 20.3731 9.22178 21.2122 10.045 21.1821C10.8229 21.1516 11.1277 20.6786 12.0732 20.6786C13.018 20.6786 13.2926 21.1821 14.116 21.1669C14.9699 21.1516 15.5037 20.4043 16.0221 19.6414C16.6168 18.7726 16.8603 17.9337 16.8756 17.8876C16.8603 17.8724 15.2291 17.2468 15.214 15.371C15.1986 13.8004 16.4946 13.0533 16.5556 13.007C15.8237 11.9248 14.6802 11.8028 14.2837 11.7721Z"
        fill="black"
      />
      <Path
        d="M23.1795 9.64649C25.4 9.64649 26.9463 11.1767 26.9463 13.4045C26.9463 15.6403 25.3682 17.1784 23.1238 17.1784H20.6652V21.0871H18.8889V9.64648L23.1795 9.64649ZM20.6652 15.6879H22.7034C24.25 15.6879 25.1302 14.8555 25.1302 13.4125C25.1302 11.9696 24.25 11.145 22.7114 11.145H20.6652V15.6879Z"
        fill="black"
      />
      <Path
        d="M27.4104 18.7165C27.4104 17.2575 28.5286 16.3617 30.5115 16.2507L32.7953 16.1159V15.4738C32.7953 14.5461 32.1688 13.9912 31.1221 13.9912C30.1306 13.9912 29.5119 14.4668 29.3614 15.2121H27.7436C27.8387 13.7056 29.1234 12.5957 31.1855 12.5957C33.2078 12.5957 34.5004 13.666 34.5004 15.3389V21.087H32.8587V19.7154H32.8192C32.3355 20.643 31.2806 21.2297 30.1862 21.2297C28.5525 21.2297 27.4104 20.2148 27.4104 18.7165ZM32.7953 17.9633V17.3052L30.7412 17.432C29.7181 17.5034 29.1393 17.9553 29.1393 18.6689C29.1393 19.3982 29.742 19.874 30.662 19.874C31.8595 19.874 32.7953 19.0494 32.7953 17.9633Z"
        fill="black"
      />
      <Path
        d="M36.0503 24.1556V22.768C36.177 22.7997 36.4624 22.7997 36.6053 22.7997C37.3983 22.7997 37.8266 22.4668 38.0882 21.6105C38.0882 21.5946 38.239 21.1031 38.239 21.0952L35.2255 12.7466H37.081L39.1908 19.5333H39.2223L41.3321 12.7466H43.1403L40.0153 21.5232C39.3019 23.5451 38.477 24.1952 36.7482 24.1952C36.6053 24.1952 36.177 24.1793 36.0503 24.1556Z"
        fill="black"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_588_17149">
        <Rect width={50} height={32} fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
}
export default ApplePayIcon;
