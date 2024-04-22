// import { useCurrentUser } from "contexts/currentUserContext";
// import { useCoupons as useCouponsShared } from "@ribon.io/shared/hooks";
// import { PLATFORM } from "utils/constants/Application";
// import { useCouponContext } from "contexts/couponContext";
// import { logError } from "services/crashReport";

// type HandleCollectProps = {
//   onSuccess?: () => void;
//   onError?: (error: any) => void;
// };

// export function useCoupons() {
//   const { currentUser } = useCurrentUser();
//   const { canCollectByCoupon, collectByCoupon } = useCouponsShared();
//   const { couponId } = useCouponContext();

//   async function handleCanCollect() {
//     if (!couponId) {
//       return false;
//     }

//     return await canCollectByCoupon(
//       currentUser?.email ?? "",
//       PLATFORM,
//       couponId,
//     );
//   }

//   async function handleCollect({ onError, onSuccess }: HandleCollectProps) {
//     try {
//       if (couponId) {
//         await collectByCoupon(currentUser?.email ?? "", PLATFORM, couponId);
//         if (onSuccess) onSuccess();
//       }
//     } catch (e: any) {
//       logError(e);
//       if (onError) onError(e);
//     }
//   }

//   return {
//     handleCanCollect,
//     handleCollect,
//   };
// }
