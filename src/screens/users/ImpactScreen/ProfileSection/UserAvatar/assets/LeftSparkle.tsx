import Svg, { Path } from "react-native-svg";

function LeftSparkle(props: any) {
  return (
    <Svg
      width="22"
      height="26"
      viewBox="0 0 19 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M9.73098 4.04812C10.0077 5.97401 10.2481 8.38602 8.5853 9.78286C7.08001 11.0474 4.79842 11.4868 2.87268 11.5579C1.34981 11.6141 3.82854 11.4274 4.21589 11.4214C5.70295 11.3983 7.12151 11.8269 8.52209 12.2406C9.67596 12.5815 9.86297 14.4279 10.047 15.3507C10.3046 16.6421 10.616 17.8284 10.7344 19.1359C10.7875 19.722 11.011 21.4689 11.011 20.8806C11.011 18.528 10.6302 15.8464 11.2954 13.5757C11.893 11.5357 13.8569 10.2005 16.131 10.8069C16.3396 10.8625 17.9472 10.9666 17.174 10.8676C15.5826 10.6639 13.5908 10.2665 12.5438 8.96361C11.1286 7.20234 10.5843 4.14313 10.5843 2"
        stroke="#FFCE00"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </Svg>
  );
}
export default LeftSparkle;