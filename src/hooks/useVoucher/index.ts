import { useEffect, useState } from "react";
import {
  setLocalStorageItem,
  getLocalStorageItem,
  removeLocalStorageItem,
} from "lib/localStorage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { HAS_AN_AVAILABLE_VOUCHER } from "lib/localStorage/constants";

function useVoucher() {
  const [voucher, setVoucher] = useState<boolean>(true);

  useEffect(() => {
    if (voucher) {
      AsyncStorage.setItem(HAS_AN_AVAILABLE_VOUCHER, "true");
    } else {
      AsyncStorage.removeItem(HAS_AN_AVAILABLE_VOUCHER);
    }
  }, [voucher]);

  const destroyVoucher = () => setVoucher(false);

  const createVoucher = () => setVoucher(true);

  const isVoucherAvailable = () =>
    getLocalStorageItem(HAS_AN_AVAILABLE_VOUCHER);

  return {
    destroyVoucher,
    createVoucher,
    isVoucherAvailable,
  };
}

export default useVoucher;
