import Svg, { Path } from "react-native-svg";

type Props = {
  height?: number;
};

export default function LogoRibon({ height = 32 }: Props) {
  return (
    <Svg width="86" height={height} viewBox="0 0 86 32" fill="none">
      <Path
        d="M84.6303 19.1162L78.1052 16.9979C77.137 16.6831 77.137 15.3141 78.1052 14.9992L84.6303 12.8809C85.0667 12.7399 85.3062 12.2712 85.1637 11.8353L84.656 10.274C84.5148 9.83805 84.0457 9.59872 83.6094 9.74117L77.0842 11.8595C76.116 12.1743 75.3103 11.066 75.9078 10.2426L79.9404 4.69679C80.2099 4.3264 80.1272 3.80644 79.7564 3.53719L78.426 2.57134C78.0553 2.3021 77.5348 2.38472 77.2653 2.75511L73.2327 8.30094C72.6338 9.12434 71.3305 8.70124 71.3305 7.6841V0.830521C71.3305 0.371811 70.9583 0 70.4991 0H68.855C68.3959 0 68.0237 0.371811 68.0237 0.830521V31.1695C68.0237 31.6282 68.3959 32 68.855 32H70.4991C70.9583 32 71.3305 31.6282 71.3305 31.1695V24.3159C71.3305 23.2988 72.6338 22.8757 73.2327 23.6991L77.2653 29.2449C77.5348 29.6153 78.0538 29.6979 78.426 29.4287L79.7564 28.4628C80.1272 28.1936 80.2099 27.6736 79.9404 27.3032L75.9078 21.7574C75.3089 20.934 76.1145 19.8257 77.0842 20.1405L83.6094 22.2588C84.0457 22.3999 84.5148 22.162 84.656 21.726L85.1637 20.1633C85.3048 19.7274 85.0667 19.2587 84.6303 19.1177V19.1162Z"
        fill="#00DA93"
      />
      <Path
        d="M13.2599 7.43917C12.0764 7.43917 11.0497 6.57161 11.0497 5.25816C11.0497 3.94471 12.0764 3.07715 13.2599 3.07715C14.4435 3.07715 15.4701 3.94471 15.4701 5.25816C15.4701 6.57161 14.4435 7.43917 13.2599 7.43917ZM14.0185 22.5253H12.527C12.2888 22.5253 12.0607 22.4313 11.8924 22.2632C11.7242 22.0951 11.63 21.8672 11.63 21.6293V10.2826C11.63 10.0447 11.7242 9.81676 11.8924 9.64867C12.0607 9.48057 12.2888 9.38512 12.527 9.38512H14.0185C14.2567 9.38512 14.4848 9.47914 14.6531 9.64724C14.8213 9.81534 14.9154 10.0433 14.9154 10.2812V21.6278C14.9154 21.8657 14.8213 22.0937 14.6531 22.2618C14.4848 22.4299 14.2567 22.5253 14.0185 22.5253Z"
        fill="#00472B"
      />
      <Path
        d="M8.74253 9.64733C8.57426 9.47923 8.34611 9.38379 8.10798 9.38379H0.896925C0.658791 9.38379 0.430638 9.47781 0.262376 9.64591C0.094113 9.81401 0 10.0434 0 10.2813V21.6279C0 21.8658 0.094113 22.0938 0.262376 22.2619C0.430638 22.43 0.658791 22.5254 0.896925 22.5254H2.38847C2.62661 22.5254 2.85476 22.4314 3.02302 22.2633C3.19129 22.0952 3.2854 21.8673 3.2854 21.6294V12.6703H8.10655C8.34469 12.6703 8.57284 12.5762 8.7411 12.4081C8.90936 12.24 9.00348 12.0107 9.00348 11.7728V10.2827C9.00348 10.0448 8.90936 9.81686 8.7411 9.64876L8.74253 9.64733Z"
        fill="#00472B"
      />
      <Path
        d="M21.7629 22.5253H19.4514C19.2133 22.5253 18.9851 22.4313 18.8168 22.2632C18.6486 22.0951 18.5545 21.8671 18.5545 21.6292V19.689C17.9499 18.6376 17.6333 17.3498 17.6333 15.9566C17.6333 14.5634 17.9484 13.2756 18.5545 12.2242V4.50026C18.5545 4.26236 18.6486 4.03443 18.8168 3.86633C18.9851 3.69823 19.2133 3.60278 19.4514 3.60278H20.9429C21.1811 3.60278 21.4092 3.6968 21.5775 3.8649C21.7458 4.033 21.8399 4.26093 21.8399 4.49883V9.35803C22.6555 9.0432 23.6023 8.858 24.6019 8.858C28.7843 8.858 31.5734 11.8539 31.5734 15.9538C31.5734 20.0537 28.7843 23.0495 24.6019 23.0495C23.5753 23.0495 22.6028 22.8657 21.76 22.5239L21.7629 22.5253ZM28.2866 15.9552C28.2866 13.6944 26.7608 12.0134 24.6034 12.0134C22.4459 12.0134 20.9201 13.6958 20.9201 15.9552C20.9201 18.2145 22.4459 19.897 24.6034 19.897C26.7608 19.897 28.2866 18.2145 28.2866 15.9552Z"
        fill="#00472B"
      />
      <Path
        d="M47.3146 15.9551C47.3146 20.055 44.5254 23.0509 40.3431 23.0509C36.1607 23.0509 33.3716 20.055 33.3716 15.9551C33.3716 11.8552 36.1607 8.85938 40.3431 8.85938C44.5254 8.85938 47.3146 11.8552 47.3146 15.9551ZM36.6598 15.9551C36.6598 18.2145 38.1856 19.8969 40.3431 19.8969C42.5005 19.8969 44.0263 18.2145 44.0263 15.9551C44.0263 13.6958 42.5005 12.0134 40.3431 12.0134C38.1856 12.0134 36.6598 13.6958 36.6598 15.9551Z"
        fill="#00472B"
      />
      <Path
        d="M50.6186 9.385H52.0887C52.257 9.385 52.4181 9.45195 52.5379 9.57019C52.7461 9.77818 53.0655 9.81094 53.3179 9.65994C54.1749 9.1471 55.2244 8.85791 56.3509 8.85791C59.5607 8.85791 61.9278 11.1714 61.9278 14.2456V21.6277C61.9278 21.8656 61.8337 22.0935 61.6655 22.2616C61.4972 22.4297 61.269 22.5252 61.0309 22.5252H59.5394C59.3012 22.5252 59.0731 22.4312 58.9048 22.2616C58.7365 22.0935 58.6424 21.8656 58.6424 21.6277V14.6402C58.6424 13.0376 57.379 11.8808 55.8276 11.8808C54.2762 11.8808 53.0128 12.9322 53.0128 14.3767V21.6263C53.0128 21.8642 52.9186 22.0921 52.7504 22.2602C52.5821 22.4283 52.354 22.5238 52.1158 22.5238H50.6243C50.3861 22.5238 50.158 22.4297 49.9897 22.2602C49.8215 22.0921 49.7274 21.8642 49.7274 21.6263V10.281C49.7274 10.0431 49.8215 9.81522 49.9897 9.64712C50.158 9.47902 50.3861 9.38357 50.6243 9.38357L50.6186 9.385Z"
        fill="#00472B"
      />
    </Svg>
  );
}