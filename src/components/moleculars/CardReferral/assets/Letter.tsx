import * as React from "react";
import Svg, { Mask, Path } from "react-native-svg";

function Letter(props: any) {
  return (
    <Svg
      width={180}
      height={136}
      viewBox="0 0 180 136"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Mask
        id="a"
        maskUnits="userSpaceOnUse"
        x={0}
        y={0.665527}
        width={180}
        height={135}
        fill="#000"
      >
        <Path fill="#fff" d="M0 0.665527H180V135.665527H0z" />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.819 36.409c-.368-.695-.428-1.3-.141-1.796C12.16 26.863 153.299 1.517 157.653 7.6c.345.482.268 1.303-.171 2.408.943.131 1.549.34 1.779.633 4.489 5.708 17.896 84.92 14.056 91.452-3.84 6.53-137.608 33.798-146.211 25.781C18.502 119.855 4.132 43.931 6.2 37.629c.115-.348.67-.758 1.618-1.22z"
        />
      </Mask>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.819 36.409c-.368-.695-.428-1.3-.141-1.796C12.16 26.863 153.299 1.517 157.653 7.6c.345.482.268 1.303-.171 2.408.943.131 1.549.34 1.779.633 4.489 5.708 17.896 84.92 14.056 91.452-3.84 6.53-137.608 33.798-146.211 25.781C18.502 119.855 4.132 43.931 6.2 37.629c.115-.348.67-.758 1.618-1.22z"
        fill="#fff"
      />
      <Path
        d="M7.678 34.613L2.484 31.61l5.194 3.004zm.14 1.796l2.63 5.393a6 6 0 002.676-8.194L7.82 36.409zm149.835-28.81l4.878-3.493-4.878 3.493zm-.171 2.408l-5.576-2.215a6.002 6.002 0 004.751 8.158l.825-5.943zm1.779.633l-4.716 3.709 4.716-3.709zm14.056 91.452l-5.172-3.042 5.172 3.042zM27.106 127.873l-4.09 4.389 4.09-4.389zM6.2 37.629l5.7 1.872-5.7-1.872zm-3.717-6.02c-1.748 3.021-.822 5.99.029 7.602l10.611-5.603c.07.13.296.595.358 1.326a4.626 4.626 0 01-.61 2.684l-10.388-6.01zM162.531 4.106c-1.276-1.783-3.073-2.446-3.8-2.685-.94-.31-1.91-.471-2.745-.567-1.698-.195-3.773-.222-6.02-.156-4.548.134-10.641.68-17.656 1.507-14.076 1.661-32.394 4.524-50.658 7.809-18.265 3.285-36.589 7.013-50.673 10.422-7.024 1.7-13.107 3.346-17.634 4.846-2.248.744-4.264 1.501-5.87 2.266-.8.38-1.634.827-2.392 1.35-.643.444-1.79 1.314-2.599 2.71l10.387 6.01c-.527.912-1.128 1.263-.973 1.157a6.29 6.29 0 01.734-.392c.955-.455 2.436-1.03 4.485-1.71 4.066-1.346 9.78-2.903 16.685-4.574 13.776-3.334 31.85-7.015 49.974-10.275 18.125-3.26 36.188-6.078 49.94-7.701 6.899-.814 12.582-1.312 16.603-1.43 2.038-.06 3.446-.015 4.296.082.438.05.509.092.359.042a3.551 3.551 0 01-.7-.329 5.025 5.025 0 01-1.5-1.397l9.757-6.985zm.527 8.116c.338-.851.691-1.959.786-3.193.094-1.23-.034-3.138-1.313-4.923l-9.757 6.985c-.933-1.303-.927-2.559-.895-2.981.033-.427.127-.571.027-.318l11.152 4.43zm-6.401 3.728c.262.037.213.051-.014-.029a3.965 3.965 0 01-.728-.35 5.125 5.125 0 01-1.37-1.222l9.433-7.417c-1.167-1.484-2.667-2.089-3.344-2.328-.823-.29-1.647-.445-2.327-.54l-1.65 11.886zm-2.112-1.601c-.324-.412-.272-.514.055.338.259.675.578 1.643.948 2.922.737 2.545 1.581 5.99 2.483 10.096 1.797 8.193 3.754 18.719 5.458 29.305 1.704 10.594 3.139 21.144 3.909 29.397.387 4.142.595 7.59.602 10.13.003 1.28-.045 2.201-.117 2.806-.099.836-.174.448.262-.293l10.344 6.083c.916-1.558 1.186-3.329 1.311-4.375.151-1.275.204-2.73.2-4.254-.009-3.064-.253-6.92-.654-11.212-.804-8.614-2.282-19.448-4.01-30.188-1.729-10.747-3.726-21.503-5.584-29.971-.927-4.225-1.836-7.956-2.677-10.86-.419-1.447-.844-2.772-1.273-3.888-.36-.939-.94-2.329-1.824-3.454l-9.433 7.418zm13.6 84.701c.341-.58.701-.93.85-1.066.089-.081.159-.138.201-.17.043-.032.068-.049.07-.05a2.492 2.492 0 01-.171.098 9.67 9.67 0 01-.495.246c-.895.417-2.289.958-4.222 1.606-3.834 1.285-9.241 2.812-15.791 4.472-13.069 3.313-30.295 7.057-47.706 10.356-17.423 3.301-34.904 6.132-48.501 7.639-6.821.757-12.51 1.162-16.667 1.153-2.094-.004-3.614-.114-4.616-.278-1.341-.221-.772-.385.1.427l-8.182 8.779c1.947 1.814 4.57 2.377 6.134 2.634 1.905.314 4.145.434 6.54.438 4.82.01 11.023-.451 18.013-1.226 14.024-1.554 31.837-4.445 49.413-7.775 17.585-3.332 35.059-7.128 48.42-10.515 6.665-1.689 12.406-3.301 16.657-4.726 2.109-.707 3.99-1.414 5.481-2.109.74-.345 1.519-.75 2.229-1.221.556-.369 1.753-1.211 2.587-2.629l-10.344-6.083zM31.196 123.483c.09.083-.123-.103-.572-.88-.414-.717-.902-1.707-1.449-2.996-1.094-2.577-2.282-5.998-3.513-10.069-2.458-8.121-4.956-18.38-7.142-28.676-2.183-10.285-4.03-20.49-5.199-28.47-.586-4.001-.99-7.368-1.187-9.875-.099-1.26-.138-2.215-.134-2.882.007-.877.091-.71-.098-.134L.5 35.757C.053 37.12.007 38.619 0 39.55c-.008 1.141.057 2.47.17 3.906C.397 46.34.843 50 1.448 54.13c1.212 8.278 3.108 18.737 5.334 29.223 2.223 10.475 4.802 21.094 7.394 29.661 1.293 4.273 2.623 8.148 3.954 11.282 1.208 2.846 2.782 6.006 4.885 7.966l8.181-8.779zM11.902 39.501a5.21 5.21 0 01-1.022 1.811c-.27.308-.498.486-.583.55-.156.117-.157.09.15-.06L5.19 31.016c-.64.312-1.391.72-2.091 1.245-.5.375-1.94 1.497-2.597 3.496L11.9 39.5z"
        fill="#fff"
        mask="url(#a)"
      />
      <Path
        d="M27.106 127.873C18.502 119.855 4.132 43.931 6.2 37.629c2.07-6.302 148.572-32.696 153.06-26.989 4.489 5.708 17.896 84.92 14.056 91.452-3.84 6.53-137.608 33.798-146.211 25.781z"
        fill="#FFF6CC"
      />
      <Path
        d="M7.678 34.613c-4.484 7.75 75.841 41.75 83.668 40.431 7.826-1.32 70.661-61.364 66.307-67.445C153.299 1.517 12.161 26.863 7.678 34.613z"
        fill="#FFD6E5"
      />
      <Path
        d="M49.058 102.669l-7.013-.39c-1.04-.059-1.405-1.425-.532-1.995l5.882-3.837a.858.858 0 00.248-1.184l-.918-1.424a.847.847 0 00-1.176-.255l-5.883 3.837c-.872.57-1.964-.324-1.593-1.303l2.505-6.6a.863.863 0 00-.49-1.108l-1.573-.612a.846.846 0 00-1.098.49l-2.505 6.599c-.372.98-1.773.901-2.044-.114l-1.828-6.839a.854.854 0 00-1.043-.61l-1.623.435a.854.854 0 00-.6 1.048l8.091 30.275c.123.458.59.73 1.043.609l1.625-.434a.854.854 0 00.6-1.048l-1.828-6.839c-.272-1.015.903-1.782 1.715-1.118l5.463 4.469c.365.298.9.244 1.196-.123l1.057-1.315a.864.864 0 00-.128-1.206l-5.463-4.469c-.811-.664-.31-1.982.731-1.924l7.012.391a.849.849 0 00.892-.808l.085-1.694a.86.86 0 00-.806-.903l-.001-.001z"
        fill="#00DA93"
      />
    </Svg>
  );
}

export default Letter;