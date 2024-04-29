import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";

function TicketBox(props: any) {
  return (
    <Svg
      width={87}
      height={120}
      viewBox="0 0 87 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Circle cx={113} cy={7} r={113} fill="#FFD6E5" />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.566 40.72l.002-.001-.002.002zm.133-.109l.039-.028a9.379 9.379 0 011.033-.614c.946-.502 2.283-1.11 3.912-1.788 3.25-1.352 7.529-2.933 11.867-4.444 4.335-1.51 8.705-2.94 12.126-3.992 1.712-.526 3.176-.954 4.275-1.25.55-.147.995-.258 1.327-.33a6.94 6.94 0 01.425-.083l.01.002c.051.008.18.028.417.08.332.071.777.18 1.327.326 1.098.292 2.56.715 4.27 1.235a351.8 351.8 0 0112.116 3.955c4.335 1.501 8.611 3.077 11.86 4.435 1.628.682 2.964 1.294 3.91 1.804.476.257.815.467 1.031.627l.061.046c.012.078.028.19.043.344.038.377.068.886.089 1.522.04 1.268.039 2.96.003 4.943-.072 3.962-.281 9.02-.56 14.04-.279 5.018-.626 9.979-.973 13.745-.174 1.886-.346 3.453-.507 4.572-.073.512-.141.906-.2 1.183-.257.131-.614.302-1.07.51-.938.43-2.233.99-3.776 1.64a545.976 545.976 0 01-11.189 4.53c-4.07 1.602-8.161 3.167-11.359 4.33-1.6.581-2.965 1.058-3.985 1.388-.511.165-.92.288-1.221.367-.15.04-.246.061-.3.073a6.336 6.336 0 01-.304-.072c-.303-.08-.715-.2-1.229-.363a123.237 123.237 0 01-4.004-1.37c-3.212-1.147-7.322-2.694-11.401-4.282-4.08-1.589-8.118-3.214-11.188-4.518a99.643 99.643 0 01-3.731-1.656 19.56 19.56 0 01-.98-.495c-.058-.303-.125-.739-.198-1.305a122.897 122.897 0 01-.479-4.63c-.335-3.79-.685-8.763-.974-13.78-.288-5.018-.514-10.065-.603-14.006-.045-1.972-.054-3.651-.021-4.904.016-.629.043-1.13.078-1.498.012-.124.024-.219.034-.289zm1.867 40.233zm.37.496zm65.582-.08zm.402-.494zM46.588 25.111c.346-.076.773-.16 1.114-.16.34 0 .764.082 1.11.157.402.087.901.21 1.474.363 1.15.305 2.653.74 4.382 1.266a355.012 355.012 0 0112.231 3.993c4.362 1.51 8.71 3.11 12.049 4.507 1.664.696 3.112 1.356 4.195 1.94.538.29 1.025.582 1.414.87.315.233.836.651 1.083 1.25.163.4.232.914.274 1.329.048.477.081 1.065.102 1.735.043 1.342.04 3.092.004 5.096-.072 4.013-.283 9.112-.563 14.154-.28 5.041-.63 10.042-.982 13.857-.175 1.904-.353 3.532-.525 4.728-.085.594-.173 1.11-.265 1.512a5.28 5.28 0 01-.165.588l-.003.008c-.04.114-.177.497-.5.805a2.668 2.668 0 01-.473.347c-.132.079-.283.16-.443.243-.322.166-.74.365-1.23.589-.981.449-2.31 1.024-3.866 1.679a549.103 549.103 0 01-11.258 4.559c-4.084 1.607-8.204 3.182-11.437 4.358-1.615.587-3.021 1.08-4.096 1.426a28.38 28.38 0 01-1.386.416c-.31.083-.753.193-1.126.193-.368 0-.808-.108-1.12-.188-.38-.1-.852-.24-1.39-.41-1.08-.342-2.493-.827-4.116-1.407-3.249-1.16-7.388-2.719-11.486-4.314-4.097-1.595-8.167-3.233-11.277-4.554a102.583 102.583 0 01-3.86-1.715 21.24 21.24 0 01-1.235-.63 6 6 0 01-.467-.287c-.1-.07-.35-.246-.545-.51-.208-.283-.3-.599-.331-.71l-.002-.004a6.607 6.607 0 01-.131-.564 25.338 25.338 0 01-.233-1.513c-.156-1.205-.323-2.84-.492-4.754-.34-3.831-.691-8.837-.981-13.875-.29-5.037-.518-10.123-.608-14.112-.045-1.993-.055-3.729-.02-5.055.017-.661.046-1.241.09-1.71.039-.4.103-.92.272-1.321.144-.342.365-.595.525-.756a4.55 4.55 0 01.563-.47c.385-.277.868-.561 1.403-.845 1.076-.57 2.52-1.222 4.182-1.914 3.334-1.388 7.681-2.993 12.045-4.513a366.956 366.956 0 0112.239-4.028c1.73-.532 3.235-.973 4.385-1.282.574-.154 1.073-.28 1.476-.367z"
        fill="#FF8FA9"
      />
      <Path
        d="M35.076 71.215l-3.429-1.236c-.52-.2-.564-1.037-.043-1.276l3.341-1.476c.217-.08.348-.398.26-.678l-.303-.997c-.087-.279-.347-.398-.564-.319l-3.342 1.476c-.477.2-.954-.479-.65-.997l1.952-3.59c.13-.239.087-.557-.13-.717l-.694-.598c-.217-.16-.478-.12-.608.12l-1.953 3.589c-.304.518-.954.279-.998-.36l-.217-4.267c0-.279-.217-.518-.434-.518l-.868.04c-.217 0-.434.24-.39.558l.824 19.222c0 .28.217.519.434.519l.868-.04c.217 0 .434-.24.39-.558l-.173-4.347c-.043-.638.651-.918.955-.439l2.256 3.43c.13.239.434.279.608.08l.651-.639c.174-.16.217-.518.043-.757l-2.256-3.43c-.348-.518.043-1.236.564-1.037l3.428 1.236c.217.08.478-.08.521-.359l.217-.996c.13-.24 0-.559-.26-.639z"
        fill="#E65C6C"
      />
      <Path
        d="M46.935 25.998L11.25 39.032c0-.234-6.89-11.205-6.544-13.423.308-2.217 28.217-11.204 31.374-9.92 3.118 1.284 10.162 10.31 10.855 10.31zM83.187 39.032L46.935 25.94c.822 0 7.392-9.887 10.325-10.356 2.933-.47 33.201 7.503 33.475 9.34.274 1.837-7.548 13.6-7.548 14.108zM95.435 48.068c.117 1.91-32.372 15.482-35.177 14.367-2.804-1.114-12.894-11.223-13.323-11.223l36.112-12.18c-.039.518 12.271 7.125 12.388 9.036zM46.935 51.241c-.573 0-10.48 11.61-12.01 11.251-1.53-.359-33.126-14.163-33.355-15.72-.268-1.555 9.907-7.5 9.907-7.74l35.458 12.21z"
        fill="#FFF5CC"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.369 26.16c.117-.078.266-.17.452-.275.72-.408 1.787-.907 3.127-1.465 2.668-1.11 6.259-2.385 9.959-3.558 3.699-1.172 7.47-2.23 10.496-2.914 1.516-.342 2.815-.584 3.809-.701.498-.06.89-.084 1.176-.08.215.002.312.02.33.021.446.194 1.176.71 2.141 1.566.948.843 1.992 1.892 3.021 2.977.848.893 1.669 1.79 2.407 2.598a622.159 622.159 0 00.994 1.084L12.04 37.119l-.207-.352c-.194-.33-.41-.697-.637-1.087a154.045 154.045 0 01-2.247-3.965c-.774-1.422-1.495-2.828-1.999-3.989a12.888 12.888 0 01-.546-1.445 4.868 4.868 0 01-.034-.122zM35.423 14c.435.005.972.047 1.451.24l.004.002c.989.402 2.08 1.253 3.086 2.146 1.048.93 2.163 2.056 3.215 3.164.87.917 1.715 1.84 2.454 2.649l.451.492c.87.949 1.487 1.61 1.816 1.9l.122.108.098.131a1.9 1.9 0 01.33 1.565 1.803 1.803 0 01-1.24 1.32L12.022 40.495l-.018.006c-.35.117-.803.151-1.26-.032a1.763 1.763 0 01-.937-.884 83.053 83.053 0 00-.662-1.137c-.199-.338-.43-.731-.687-1.172a157.39 157.39 0 01-2.294-4.047c-.79-1.45-1.562-2.953-2.122-4.241a15.932 15.932 0 01-.681-1.82c-.144-.493-.296-1.152-.204-1.772a2.08 2.08 0 01.414-.956c.158-.208.34-.381.506-.52a8.04 8.04 0 011.18-.788c.886-.502 2.089-1.058 3.473-1.634 2.782-1.157 6.466-2.463 10.219-3.653 3.754-1.19 7.615-2.275 10.755-2.984 1.567-.354 2.985-.621 4.134-.757A12.605 12.605 0 0135.423 14z"
        fill="#FF8FA9"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M57.322 17.184a.823.823 0 00-.128.047c-.095.042-.22.11-.374.21-.314.203-.69.503-1.121.896-.862.786-1.826 1.84-2.795 2.971a143.44 143.44 0 00-2.181 2.628l-.537.656c-.202.247-.404.491-.6.726l32.755 11.786c.285-.485.636-1.062 1.01-1.677l.38-.624c.68-1.117 1.454-2.389 2.207-3.663.899-1.522 1.748-3.017 2.354-4.224.264-.526.47-.974.61-1.33a11.347 11.347 0 00-.283-.133c-.79-.36-1.952-.8-3.403-1.294-2.89-.983-6.771-2.127-10.757-3.205-3.982-1.078-8.04-2.08-11.276-2.784a77.308 77.308 0 00-4.089-.796 19.216 19.216 0 00-1.304-.17c-.284-.024-.422-.021-.459-.02h-.009zm31.773 7.804zm2.656-1.314c.152.16.453.515.532 1.048l.002.01.001.01c.052.38-.006.734-.06.976-.058.267-.147.543-.246.81a18.625 18.625 0 01-.81 1.805c-.656 1.307-1.55 2.877-2.457 4.414a321.109 321.109 0 01-2.608 4.322c-.786 1.292-1.31 2.167-1.462 2.486l-.049.103-.064.095a1.911 1.911 0 01-.986.747c-.271.09-.75.175-1.258-.029L46.494 27.592l-.084-.042c-1.018-.506-1.476-1.96-.497-2.935l.029-.029.03-.026c.3-.271.877-.948 1.718-1.974l.52-.636c.682-.836 1.453-1.78 2.242-2.701.995-1.16 2.06-2.333 3.068-3.253.505-.46 1.024-.885 1.54-1.219.494-.32 1.096-.631 1.751-.736l.003-.001c.395-.063.856-.041 1.255-.007.437.038.957.107 1.534.198 1.157.184 2.62.471 4.269.83 3.301.717 7.413 1.734 11.435 2.822 4.018 1.087 7.973 2.252 10.953 3.266 1.484.505 2.765.985 3.702 1.412.461.21.895.431 1.24.662.17.113.37.263.549.45z"
        fill="#FF8FA9"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M82.614 40.857c.12.081.241.161.359.237.426.277.967.612 1.568.982l.892.545c1.016.621 2.15 1.315 3.272 2.026 1.467.931 2.86 1.86 3.883 2.654.253.196.472.376.658.538l-.052.032c-.82.51-2.04 1.164-3.566 1.917-3.041 1.5-7.159 3.322-11.383 5.056-4.224 1.735-8.523 3.37-11.927 4.497-1.706.566-3.157.993-4.248 1.245-.548.126-.97.2-1.267.229a2.58 2.58 0 01-.232.014c-.411-.195-1.2-.73-2.316-1.62-1.151-.918-2.49-2.08-3.829-3.278-1.117-1-2.256-2.044-3.272-2.976l-1.257-1.15 32.717-10.948zM60.678 60.875l-.005-.002a.13.13 0 01.005.002zm33.215-12.374zm-10.17-10.806h.002l.204.104.164.154-.002-.001s.04.033.147.109c.114.081.268.185.463.311.39.253.9.57 1.501.939l.872.533a238.27 238.27 0 013.331 2.063c1.484.942 2.984 1.937 4.132 2.828.57.443 1.098.894 1.504 1.328.202.218.407.465.572.735.154.252.352.647.383 1.137v.004c.039.624-.252 1.078-.383 1.26-.16.225-.351.41-.513.552-.33.288-.761.584-1.23.876-.952.592-2.282 1.3-3.84 2.068-3.127 1.542-7.316 3.395-11.58 5.146-4.265 1.752-8.638 3.415-12.136 4.574-1.744.578-3.302 1.04-4.532 1.325a13.56 13.56 0 01-1.67.294c-.408.04-1.036.075-1.594-.144-.896-.35-2.087-1.218-3.245-2.141-1.222-.975-2.613-2.185-3.967-3.395-1.243-1.112-2.434-2.206-3.455-3.143-1.247-1.144-2.24-2.056-2.764-2.484-1.26-.99-.7-2.732.471-3.208l.047-.02 35.61-11.915c.411-.16.797-.13 1.064-.062.234.06.431.166.445.173z"
        fill="#FF8FA9"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.82 40.854l32.326 11.051a245.552 245.552 0 00-1.483 1.553c-.937.985-1.97 2.07-2.992 3.114-1.25 1.276-2.452 2.455-3.412 3.289-.47.408-.842.698-1.11.873l-.098-.037a60.72 60.72 0 01-1.213-.482 269.26 269.26 0 01-3.962-1.66 645.478 645.478 0 01-11.379-5C14.42 51.717 10.4 49.848 7.39 48.346c-1.51-.753-2.738-1.401-3.585-1.9a17.156 17.156 0 00-.039-.023l.133-.115c.774-.663 1.869-1.459 3.048-2.265a144.075 144.075 0 013.671-2.41c.45-.29.87-.559 1.202-.78zm.429-3.27a1.694 1.694 0 00-1.05-.062c-.23.06-.423.166-.437.174l-.133.068-.117.092c-.157.124-.769.517-1.758 1.153l-.103.066c-.99.637-2.235 1.44-3.446 2.267-1.201.822-2.412 1.696-3.321 2.475-.448.384-.877.79-1.2 1.192-.16.2-.334.447-.465.732-.123.266-.28.721-.195 1.266.09.573.436.943.53 1.044l.003.002c.155.166.33.311.487.43.318.24.734.505 1.199.778.94.554 2.245 1.24 3.773 2.002 3.063 1.529 7.128 3.418 11.218 5.262a648.751 648.751 0 0011.436 5.024c1.604.685 2.981 1.262 4.01 1.68.513.21.945.381 1.278.508.288.11.608.228.827.28h.005c.533.123.997-.025 1.23-.114.276-.106.537-.254.766-.4.46-.295.977-.707 1.503-1.164 1.063-.922 2.339-2.179 3.6-3.466a305.81 305.81 0 003.029-3.152l.592-.621c1.084-1.137 1.904-1.987 2.33-2.37.51-.432.75-1.11.63-1.77a1.811 1.811 0 00-1.271-1.427l-34.95-11.949z"
        fill="#FF8FA9"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M49.116 51.866c-.98 15.195.41 35.002 1.232 43.007l-3.694.38c-.829-8.084-2.243-28.128-1.243-43.626l3.705.24z"
        fill="#FF8FA9"
      />
    </Svg>
  );
}

export default TicketBox;
