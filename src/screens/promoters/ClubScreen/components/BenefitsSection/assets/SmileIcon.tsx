import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

function SmileIcon() {
  return (
    <Svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <G>
        <Path
          d="M37.4374 13.7368C36.3733 9.25032 31.9155 5.27427 27.2708 5.01543C22.4823 4.74221 17.3414 8.12868 15.8315 12.7087C14.7387 16.0233 14.9616 19.6686 16.8885 22.6236C23.6327 32.9412 40.2702 25.6722 37.4374 13.7368ZM26.9904 10.8177C27.0982 10.5301 27.2995 10.3144 27.5656 10.1634C27.8388 10.0124 28.1695 10.0196 28.4571 10.1131C28.8238 10.2281 29.0754 10.5589 29.1905 10.9112C29.3055 11.2707 29.399 11.7093 29.284 12.076C29.2121 12.3132 29.0323 12.5146 28.831 12.644C28.6081 12.795 28.3636 12.8525 28.0976 12.8453C27.7885 12.8309 27.5296 12.6584 27.3139 12.4498C27.2924 12.4283 27.2708 12.4067 27.2564 12.3851C27.1845 12.2989 27.1054 12.1838 27.0551 12.0832C26.9904 11.9537 26.94 11.8099 26.9185 11.6733C26.8681 11.4001 26.8897 11.0837 26.9904 10.8177ZM20.9796 12.7878C20.9867 12.7734 20.9939 12.7662 21.0011 12.7518C21.0227 12.6655 21.0586 12.5864 21.1018 12.5074C21.1593 12.3708 21.2456 12.2485 21.3606 12.1551L21.6123 11.9897C21.7129 11.9537 21.8064 11.925 21.9071 11.889C22.0652 11.8531 22.2162 11.8603 22.3672 11.9034C22.4679 11.9106 22.5613 11.9465 22.6476 12.0041C22.7842 12.0616 22.9065 12.1479 22.9999 12.2701C23.0071 12.2773 23.0143 12.2845 23.0143 12.2989C23.0862 12.3636 23.1437 12.4427 23.1941 12.5289C23.3019 12.6584 23.3666 12.8093 23.3882 12.9819C23.4026 13.1545 23.4098 13.327 23.4169 13.5068C23.4026 13.7225 23.3307 13.9166 23.2084 14.0963C23.1365 14.1754 23.0718 14.2545 22.9999 14.3336C22.7627 14.5637 22.4176 14.6428 22.1012 14.6356C21.9358 14.6284 21.7848 14.5853 21.6554 14.499C21.5116 14.4415 21.3822 14.348 21.2815 14.2258C21.2024 14.1467 21.1521 14.0604 21.109 13.9597C21.109 13.9525 21.1018 13.9454 21.1018 13.9382C21.0946 13.9166 21.0874 13.9022 21.0802 13.8806C21.0299 13.744 20.9796 13.6074 20.9364 13.4636C20.8933 13.2192 20.9077 12.9963 20.9796 12.7878ZM33.8568 16.7422C33.7274 17.5044 33.4469 18.245 32.9796 19.0646C32.4116 20.0712 31.5632 21.0706 30.5206 21.9622C29.5428 22.8034 28.5362 23.3282 27.5296 23.5224C27.1342 23.6015 26.7243 23.623 26.3217 23.6015C25.0778 23.5296 23.7117 22.9975 22.3744 22.07C21.0658 21.1641 20.0449 20.0496 19.4193 18.8489C19.1893 18.4031 19.3546 17.8064 19.7932 17.5116C19.9083 17.4325 20.0449 17.3822 20.1815 17.3534C20.5482 17.2815 20.9292 17.4109 21.1809 17.6913C21.2744 17.792 21.3606 17.8926 21.4541 17.9933C21.6195 18.1802 21.792 18.3744 21.9646 18.5613C22.1012 18.7123 22.245 18.8561 22.3888 18.9927C22.4032 19.0071 22.4679 19.0646 22.5326 19.1293C22.6117 19.2012 22.6908 19.2803 22.777 19.3522C22.8705 19.4313 22.964 19.5176 23.0575 19.5967L23.0646 19.5895C23.079 19.5967 23.1078 19.6254 23.1078 19.6254L23.115 19.6326C23.1653 19.6686 23.2084 19.7117 23.2588 19.7476C23.3235 19.8052 23.3954 19.8555 23.4673 19.913C23.798 20.1647 24.1288 20.3876 24.4595 20.5817C24.4739 20.5889 24.5386 20.6248 24.6033 20.6608C24.7183 20.7255 24.8334 20.7902 24.9556 20.8477C25.0707 20.898 25.1857 20.9484 25.3079 20.9915C25.4517 21.049 25.5955 21.0922 25.7321 21.1353C25.8184 21.1641 25.9119 21.1856 26.0125 21.2144H26.0197L26.0844 21.2216H26.0916C26.2786 21.2503 26.4655 21.2719 26.6668 21.2791C26.7243 21.2791 26.7891 21.2791 26.8466 21.2791C26.9976 21.2719 27.2348 21.236 27.5512 21.1497C27.6806 21.1137 27.81 21.049 27.9322 20.9915C28.0976 20.9124 28.263 20.8189 28.4212 20.7183L28.4355 20.7111L28.5074 20.6608C28.6009 20.5961 28.68 20.5313 28.7663 20.4666C29.097 20.2078 29.3774 19.9633 29.6219 19.7117C29.6363 19.6973 29.6866 19.647 29.7369 19.5895C29.7657 19.5535 29.8016 19.5176 29.8304 19.4888L29.8376 19.496C29.9167 19.4025 30.0102 19.2947 30.0964 19.1796C30.3049 18.9136 30.4991 18.626 30.7076 18.2593L30.7435 18.1874L30.7507 18.1802C30.7795 18.1155 30.8082 18.0508 30.837 17.9861C30.9089 17.8207 30.9808 17.6482 31.0383 17.4828C31.0814 17.3534 31.1246 17.224 31.1605 17.0946C31.1749 17.0442 31.1893 16.9939 31.1965 16.9436L31.2037 16.9076C31.2181 16.8141 31.2324 16.7207 31.2396 16.6272C31.2684 16.354 31.2972 16.088 31.3187 15.8147V15.7285L31.3115 15.6781C31.3043 15.6422 31.3043 15.599 31.2971 15.5631L31.29 15.4768C31.2612 15.2467 31.2396 15.031 31.2612 14.8225C31.3259 14.1395 31.8148 13.8087 32.2534 13.7225C32.6848 13.6362 33.3103 13.7584 33.6483 14.3696C34.0725 15.1389 33.9359 16.2821 33.8568 16.7422Z"
          fill="#FFCF00"
        />
        <Path
          d="M19.9441 40.9503C20.3539 40.4398 22.7769 39.6273 24.6031 39.0737C27.6948 38.139 29.1328 37.7076 31.4049 37.0318C32.3683 36.7442 33.3533 36.4997 34.288 36.1187C34.8992 35.867 35.46 35.5147 35.9705 35.0977C36.5025 34.6591 36.7757 34.1414 37.1496 33.559C37.9549 32.2936 38.6451 30.9635 39.321 29.6261C40.1766 27.9365 41.1688 26.2181 41.6865 24.435C42.3048 22.2708 40.1263 21.2498 38.8752 22.7597C37.5882 24.3056 35.4025 26.6998 33.605 28.0659C32.5696 28.8568 31.7356 28.9287 29.8878 29.2307C26.8895 29.7268 25.6529 29.8562 22.5612 30.1726C24.3803 28.8784 30.693 25.9233 30.125 23.0401C29.7727 21.257 26.451 21.976 25.3293 22.2924C23.877 22.695 22.3886 23.1264 20.9507 23.4931C18.1897 24.1905 15.5941 24.9958 13.092 26.405C11.1004 27.5267 9.72713 29.3889 8.59831 31.3301C7.77146 32.7538 6.58511 34.4362 6.0962 35.9892C5.58571 37.5998 7.21783 38.5417 8.38261 39.2319C10.3814 40.4254 12.4377 41.4967 14.5228 42.568C15.4503 43.0498 16.9243 44.1139 17.9884 43.9629C18.8296 43.8335 19.5055 41.4896 19.9441 40.9503Z"
          fill="#FFADC7"
        />
        <Path
          d="M24.481 37.0687C24.0424 36.436 23.1868 36.1987 22.511 36.6301C21.6482 37.1837 20.7782 37.7374 19.9154 38.291C19.3258 38.672 19.0885 39.5492 19.5056 40.146C19.937 40.7643 20.7063 40.9297 21.3606 40.5558C22.2521 40.0453 23.1509 39.542 24.0424 39.0315C24.6967 38.672 24.9124 37.6798 24.481 37.0687Z"
          fill="#FF975E"
        />
        <Path
          d="M41.3914 23.3215C40.8234 23.0483 40.0541 23.2064 39.7665 23.8176C39.6155 24.1339 39.4645 24.4503 39.3136 24.7595C39.2417 24.9105 39.1698 25.0543 39.0979 25.2053C38.9253 25.6007 38.9181 25.9099 38.9972 26.3269C39.141 27.1034 40.1835 27.3335 40.7659 26.9668C41.413 26.5642 41.6143 25.6295 41.8804 24.9464C42.1176 24.364 42.0242 23.6235 41.3914 23.3215Z"
          fill="#FF6B70"
        />
      </G>
    </Svg>
  );
}
export default SmileIcon;
