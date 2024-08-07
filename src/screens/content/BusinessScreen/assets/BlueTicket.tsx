import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

function BlueTicket(props: any) {
  return (
    <Svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G>
        <Path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M39.4902 9.79333C39.5748 10.3089 39.2241 10.7953 38.7068 10.8796C37.1507 11.1334 35.5271 11.3254 33.929 11.5144C32.7678 11.6516 31.6199 11.7874 30.521 11.9441C26.0723 12.5785 21.6423 13.3824 17.2078 14.2179C16.0469 14.4367 14.871 14.6783 13.6848 14.922C10.9899 15.4757 8.24238 16.0402 5.49899 16.3717C5.4257 16.3805 5.35335 16.3808 5.28296 16.3733C5.52512 16.5512 5.67862 16.8407 5.66911 17.1631C5.62973 18.4974 4.92816 19.7571 3.58641 20.3302C3.52035 20.3585 3.44943 20.399 3.31745 20.4775C3.31212 20.4807 3.30664 20.4839 3.30103 20.4873C3.23191 20.5284 3.14218 20.5819 3.03987 20.6357C3.02645 20.6658 3.01334 20.6983 3.00156 20.7306C2.98438 20.7776 2.97539 20.8093 2.97334 20.8175C2.96644 20.845 2.95986 20.8745 2.95453 20.9039C2.95441 20.9045 2.95429 20.9052 2.95418 20.9058C2.97011 20.9228 2.99007 20.9439 3.01594 20.9712C3.02109 20.9766 3.0268 20.9826 3.03302 20.9891C3.14237 21.1033 3.40866 21.3814 3.52013 21.7782C3.68873 22.3784 3.46813 22.8648 3.30979 23.1419C3.2518 23.2433 3.18053 23.3521 3.1321 23.426C3.11959 23.4451 3.1086 23.4618 3.09976 23.4755C3.04231 23.5646 3.02246 23.6028 3.01483 23.6209C2.97945 23.705 2.95051 23.7941 2.92874 23.8855C2.93725 23.8922 2.94625 23.8994 2.95583 23.9069C2.95582 23.9069 2.95584 23.9069 2.95583 23.9069L2.95891 23.9094L2.95896 23.9094C3.175 24.0803 3.54748 24.3785 3.71277 24.8361C3.90726 25.3745 3.74266 25.8686 3.54937 26.2411C3.46276 26.408 3.4535 26.4423 3.45066 26.4533L3.45056 26.4537C3.44882 26.4603 3.43928 26.4966 3.43928 26.6684C3.43928 26.7781 3.43088 26.8932 3.42503 26.9733L3.42428 26.9835C3.41743 27.0775 3.41266 27.1451 3.41147 27.2076C3.41112 27.2262 3.41116 27.2421 3.41147 27.2556C3.7463 27.7763 4.11408 28.3726 4.18499 29.2632C4.25294 30.1167 4.35666 30.9561 4.55049 31.7391C4.58504 31.8786 4.64117 32.0027 4.67036 32.0448C4.8919 32.3637 4.96456 32.6951 4.99736 32.9303C5.0081 33.0073 5.01554 33.0825 5.02118 33.1482C5.16656 33.1758 5.3968 33.225 5.62719 33.3336C6.06718 33.5411 6.77299 33.9006 7.22532 34.4803C7.54711 34.8927 7.47258 35.487 7.05885 35.8078C6.64512 36.1285 6.04886 36.0542 5.72707 35.6418C5.5802 35.4536 5.2598 35.2533 4.81553 35.0438C4.80246 35.0376 4.77154 35.0264 4.60943 34.9961C4.60102 34.9945 4.59197 34.9929 4.58233 34.9911C4.44917 34.9666 4.20247 34.9213 3.95932 34.8122C3.63584 34.6671 3.45329 34.4097 3.36673 34.2617C3.27014 34.0965 3.1933 33.8959 3.16553 33.6883C3.1515 33.5834 3.14339 33.4789 3.13745 33.4023L3.13631 33.3876C3.1295 33.3002 3.12458 33.2424 3.11737 33.1908C3.11085 33.144 3.10441 33.1194 3.10134 33.1094C2.89835 32.8123 2.77233 32.4534 2.70769 32.1923C2.47833 31.2658 2.36437 30.3108 2.29287 29.4129C2.25971 28.9964 2.11428 28.7439 1.75999 28.1934C1.51213 27.8083 1.50991 27.3737 1.51374 27.1718C1.51595 27.0552 1.52428 26.9411 1.53034 26.8582L1.5312 26.8464C1.53829 26.7491 1.54121 26.7011 1.54121 26.6684C1.54121 26.4474 1.55042 26.2218 1.61264 25.9812C1.66643 25.7731 1.74998 25.5939 1.8317 25.4336C1.81563 25.4205 1.79813 25.4064 1.77905 25.3913C1.77904 25.3913 1.77902 25.3913 1.77901 25.3913L1.77597 25.3889C1.76783 25.3825 1.75881 25.3754 1.74907 25.3678C1.63196 25.2761 1.40606 25.0992 1.24684 24.8622C1.02329 24.5294 0.965958 24.1612 1.01772 23.7897C1.06027 23.4844 1.14264 23.1788 1.26444 22.8893C1.3399 22.7099 1.43657 22.5557 1.50298 22.4527C1.52861 22.413 1.54986 22.3805 1.56818 22.3525C1.59164 22.3167 1.61031 22.2882 1.62726 22.261C1.62536 22.259 1.6234 22.2569 1.62138 22.2548C1.57005 22.2009 1.4857 22.1123 1.40915 22.0159C1.31966 21.9031 1.21187 21.7453 1.13632 21.542C1.03194 21.261 1.03922 20.9849 1.05249 20.8236C1.06742 20.6421 1.10259 20.4756 1.13194 20.3586C1.17159 20.2005 1.24929 19.9779 1.34977 19.7722C1.40055 19.6683 1.47042 19.541 1.56137 19.4199C1.63647 19.3198 1.8037 19.1164 2.0795 18.9986C2.14243 18.9717 2.21107 18.9324 2.34462 18.853C2.34915 18.8503 2.35378 18.8475 2.3585 18.8447C2.47386 18.776 2.64534 18.6739 2.83873 18.5913C3.40375 18.3499 3.75091 17.8173 3.77186 17.1075C3.78726 16.5853 4.22447 16.1744 4.74838 16.1898C4.77343 16.1905 4.79823 16.1922 4.82274 16.1948C4.61916 16.0456 4.47546 15.8162 4.44265 15.5464C4.37958 15.0278 4.75026 14.5564 5.27059 14.4935C7.93415 14.1717 10.5531 13.6334 13.2097 13.0873C14.4146 12.8396 15.6273 12.5903 16.8553 12.359C21.2947 11.5225 25.7593 10.712 30.2522 10.0712C31.4673 9.89795 32.6393 9.76029 33.7979 9.62421C35.3326 9.44394 36.8438 9.26644 38.4003 9.01256C38.9176 8.92819 39.4055 9.27776 39.4902 9.79333ZM40.5619 9.37907C41.0857 9.36137 41.5247 9.77029 41.5425 10.2924C41.5594 10.79 41.7101 11.3024 41.9638 11.6842C42.2084 12.0522 42.5176 12.2618 42.8905 12.3073C42.8915 12.3073 42.8983 12.3079 42.9135 12.308C42.9361 12.3083 42.9612 12.3077 43.0076 12.3066L43.0196 12.3063C43.098 12.3044 43.2483 12.3006 43.4084 12.3219C43.5898 12.346 43.8043 12.399 44.0097 12.4835C44.1927 12.5588 44.4921 12.7085 44.7101 12.9937C44.9737 13.3386 44.9768 13.7451 44.9774 13.8751C44.9779 13.9719 44.9724 14.0616 44.9679 14.1256C44.9655 14.1594 44.9637 14.1827 44.9623 14.2005C44.9604 14.2252 44.9594 14.2391 44.9586 14.2554C44.9433 14.6002 44.8002 14.8786 44.7353 15.0034C44.718 15.0368 44.7003 15.0696 44.6864 15.0955L44.6829 15.102C44.6671 15.1313 44.6557 15.1527 44.6457 15.1722C44.6314 15.2001 44.626 15.2128 44.625 15.215C44.6109 15.2575 44.5989 15.3008 44.5901 15.3423C44.5851 15.3659 44.5816 15.3869 44.5792 15.4053C44.5971 15.4194 44.6184 15.4356 44.6456 15.4561L44.6617 15.4683C44.6985 15.496 44.747 15.5326 44.794 15.57C45.0062 15.7388 45.4339 16.1094 45.4793 16.7654C45.5076 17.1743 45.3969 17.4945 45.2746 17.7374C45.2472 17.7919 45.218 17.8445 45.191 17.8913C45.3303 18.0432 45.4139 18.2075 45.4641 18.3326C45.5373 18.5146 45.575 18.7005 45.5921 18.8648C45.622 19.1507 45.6092 19.5763 45.4173 19.9348C45.3858 19.9938 45.3465 20.147 45.382 20.434C45.4156 20.7055 45.5043 20.9986 45.6035 21.2457C45.6434 21.3452 45.6844 21.4335 45.736 21.5444C45.7556 21.5867 45.7768 21.6323 45.8 21.683C45.8769 21.8509 45.9675 22.0581 46.038 22.2944C46.1048 22.5184 46.1561 22.7759 46.1947 22.9698C46.2078 23.0356 46.2195 23.094 46.2298 23.1414C46.2733 23.3413 46.3245 23.5321 46.3823 23.7471C46.4005 23.8148 46.4194 23.8849 46.4388 23.9585C46.516 24.2505 46.5979 24.5803 46.6479 24.933C46.6717 25.1007 46.7051 25.295 46.7411 25.5047C46.8166 25.9437 46.9036 26.4502 46.9388 26.9221C46.9784 27.0262 47 27.1391 47 27.257C47 27.3006 46.9992 27.3496 46.996 27.3979C46.9944 27.4216 46.9915 27.4569 46.9854 27.4976L46.9852 27.4985C46.9814 27.5244 46.967 27.62 46.9212 27.7306C46.9002 27.7811 46.8407 27.9161 46.7087 28.0458C46.5513 28.2006 46.2554 28.3715 45.8752 28.3045C45.8599 28.3018 45.8448 28.2988 45.8301 28.2954C45.8055 28.2971 45.7806 28.2977 45.7556 28.2975C45.2923 28.2923 44.7327 28.7055 44.3161 29.4354C44.274 29.509 44.2404 29.5949 44.2242 29.6706C44.2138 29.7193 44.2143 29.7454 44.2145 29.7519C44.3508 30.2507 44.0596 30.7674 43.5595 30.9098C43.0555 31.0533 42.5302 30.7624 42.3862 30.2601C42.1922 29.5832 42.4379 28.9 42.6663 28.4998C43.0913 27.7553 43.8779 26.819 44.9836 26.5098C44.9581 26.3392 44.9279 26.166 44.896 25.9828C44.8544 25.7438 44.8097 25.4878 44.7686 25.1981C44.7347 24.9597 44.6767 24.7177 44.6034 24.4406C44.5885 24.3844 44.5727 24.3255 44.5563 24.2646C44.4963 24.0416 44.429 23.7913 44.3748 23.5422C44.3489 23.4231 44.3296 23.3258 44.3127 23.2401C44.2822 23.0859 44.2592 22.9697 44.2186 22.8336C44.1867 22.7267 44.1407 22.6157 44.0733 22.4685C44.0601 22.4397 44.0453 22.4079 44.0294 22.3737C43.9726 22.2517 43.9017 22.0992 43.8412 21.9484C43.703 21.6042 43.5578 21.1477 43.4982 20.6654C43.4444 20.2308 43.4479 19.6764 43.6859 19.1587C43.4989 19.043 43.1496 18.7669 43.1115 18.2445C43.0807 17.823 43.2655 17.4561 43.3255 17.3369C43.3273 17.3334 43.3289 17.3302 43.3304 17.3271C43.388 17.2123 43.4484 17.1115 43.4902 17.0417L43.4914 17.0396C43.5043 17.0181 43.5154 16.9996 43.5249 16.9834C43.5231 16.982 43.5212 16.9806 43.5193 16.9792L43.4998 16.9644C43.4558 16.9312 43.3975 16.887 43.3381 16.8378C43.2216 16.7414 43.0576 16.5915 42.9248 16.3782C42.7007 16.0184 42.6664 15.6351 42.6795 15.3566C42.693 15.0716 42.7598 14.8097 42.8255 14.6132C42.8668 14.4897 42.9184 14.3836 42.956 14.3104C42.9754 14.2727 42.9948 14.2366 43.01 14.2082L43.012 14.2046C43.013 14.2027 43.014 14.2008 43.015 14.1989C42.9348 14.2008 42.8016 14.2023 42.6622 14.1854C41.6241 14.0596 40.8642 13.4553 40.3815 12.729C39.9076 12.0161 39.6726 11.1531 39.6455 10.3565C39.6278 9.83439 40.038 9.39677 40.5619 9.37907ZM43.9529 19.2952C43.953 19.2953 43.9513 19.2945 43.9483 19.2929C43.9513 19.2943 43.9528 19.2951 43.9529 19.2952ZM44.9938 18.2486C44.9939 18.2486 44.9939 18.2485 44.9939 18.2484C44.9938 18.2487 44.9938 18.2488 44.9938 18.2486ZM42.4863 31.6931C42.5442 32.2123 42.1688 32.68 41.6478 32.7377C37.2146 33.2287 32.7884 33.721 28.377 34.2963C23.4153 34.9434 18.4994 35.8055 13.6043 36.8581C13.0238 36.9829 12.4211 37.1268 11.8053 37.2737C10.5457 37.5742 9.23187 37.8877 7.94391 38.0779C7.42543 38.1545 6.94285 37.7976 6.86604 37.2808C6.78923 36.764 7.14727 36.283 7.66575 36.2064C8.87539 36.0278 10.0409 35.7491 11.2479 35.4604C11.8842 35.3082 12.5321 35.1533 13.204 35.0088C18.1465 33.946 23.1138 33.0747 28.1308 32.4204C32.5632 31.8424 37.0071 31.3481 41.4382 30.8574C41.9592 30.7997 42.4284 31.1738 42.4863 31.6931Z"
          fill="#9AD0F9"
        />
      </G>
      <G>
        <Path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M14.0086 13.0369C14.528 12.9866 14.9898 13.3669 15.0401 13.8863C15.1256 14.7691 15.3278 15.5836 15.5529 16.4907C15.6172 16.7496 15.6833 17.016 15.7491 17.2937C15.8694 17.8014 15.5554 18.3106 15.0476 18.431C14.5398 18.5513 14.0306 18.2372 13.9103 17.7295C13.8552 17.4971 13.7963 17.2602 13.7363 17.0192C13.5055 16.0922 13.2594 15.1035 13.1592 14.0685C13.1089 13.5491 13.4891 13.0872 14.0086 13.0369Z"
          fill="#F2A9C3"
        />
      </G>
      <G>
        <Path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M15.4145 20.412C15.936 20.392 16.375 20.7984 16.3951 21.3199C16.4164 21.8745 16.5179 22.3852 16.6358 22.9789C16.6788 23.1952 16.7239 23.4225 16.7682 23.667C16.8612 24.1804 16.5203 24.6721 16.0069 24.7651C15.4934 24.8581 15.0017 24.5172 14.9087 24.0037C14.8776 23.8315 14.8412 23.6492 14.8033 23.4591C14.6774 22.8278 14.5344 22.1105 14.5067 21.3926C14.4867 20.8711 14.8931 20.4321 15.4145 20.412Z"
          fill="#F2A9C3"
        />
      </G>
      <G>
        <Path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M16.4443 26.121C16.9658 26.101 17.4048 26.5074 17.4248 27.0288C17.4462 27.5835 17.5477 28.0942 17.6656 28.6879C17.7086 28.9042 17.7537 29.1315 17.798 29.3759C17.891 29.8894 17.5501 30.3811 17.0366 30.474C16.5232 30.567 16.0315 30.2262 15.9385 29.7127C15.9073 29.5405 15.871 29.3582 15.8331 29.1681C15.7072 28.5368 15.5642 27.8195 15.5365 27.1016C15.5164 26.5801 15.9229 26.1411 16.4443 26.121Z"
          fill="#F2A9C3"
        />
      </G>
      <G>
        <Path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M17.3249 31.1615C17.8466 31.1505 18.2785 31.5644 18.2896 32.0862C18.3021 32.6752 18.4108 33.197 18.5433 33.8328C18.5807 34.0126 18.6201 34.2014 18.6597 34.4035C18.7601 34.9156 18.4264 35.4121 17.9143 35.5125C17.4022 35.6129 16.9057 35.2792 16.8053 34.7671C16.7759 34.6174 16.7434 34.4626 16.71 34.3032C16.5717 33.6447 16.4169 32.9076 16.4003 32.1262C16.3892 31.6045 16.8032 31.1726 17.3249 31.1615Z"
          fill="#F2A9C3"
        />
      </G>
      <Path
        d="M32.8599 22.3264C31.7516 22.1544 31.202 22.0879 30.0991 21.9898C29.698 21.9561 29.5903 21.4089 29.9488 21.1906C30.9205 20.6113 31.4045 20.339 32.3816 19.8336C32.5459 19.7486 32.6085 19.5518 32.5191 19.3789C32.3852 19.1412 32.327 19.0288 32.2018 18.7867C32.1168 18.6224 31.9069 18.5556 31.7426 18.6406C30.7613 19.1591 30.2818 19.44 29.3145 20.028C28.9561 20.2463 28.5506 19.8861 28.7325 19.4961C29.2015 18.4534 29.4383 17.9363 29.9162 16.9109C29.9923 16.74 29.9198 16.5363 29.7534 16.4689C29.5125 16.3634 29.3941 16.304 29.1532 16.1985C28.9823 16.1225 28.7832 16.2036 28.7116 16.3831C28.2426 17.4258 28.0058 17.9429 27.5371 19.0074C27.3683 19.4016 26.8193 19.3786 26.7397 18.9704C26.5376 17.8803 26.4299 17.3331 26.2233 16.2343C26.1946 16.0518 26.019 15.9453 25.8368 15.9957C25.581 16.0733 25.4465 16.1099 25.1951 16.1961C25.0174 16.2552 24.8982 16.4484 24.9354 16.6264C25.6961 20.6611 26.4523 24.6871 27.213 28.7218C27.2416 28.9043 27.4259 29.0063 27.5949 28.9517C27.8508 28.8742 27.9808 28.8289 28.2411 28.76C28.4233 28.7096 28.5426 28.5164 28.5053 28.3383C28.3031 27.2482 28.1955 26.701 27.9888 25.6022C27.9092 25.194 28.3926 24.8783 28.6922 25.1398C29.4857 25.8474 29.8912 26.2076 30.6981 26.9411C30.8305 27.0699 31.0392 27.0496 31.1722 26.9041C31.3523 26.7013 31.4424 26.6 31.6269 26.4058C31.7513 26.2648 31.7528 26.0558 31.6117 25.9314C30.809 25.1848 30.399 24.8159 29.5966 24.0911C29.3011 23.8164 29.5379 23.2994 29.9389 23.3331C31.0374 23.4225 31.5825 23.4804 32.695 23.6393C32.8826 23.6629 33.0508 23.543 33.0743 23.3554C33.1143 23.0936 33.1256 22.9672 33.1611 22.6967C33.1718 22.5268 33.0475 22.35 32.8599 22.3264Z"
        fill="#235174"
      />
    </Svg>
  );
}

export default BlueTicket;
