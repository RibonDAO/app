import { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { HAS_AN_AVAILABLE_VOUCHER } from "@ribon.io/shared";

function useVoucher() {
  const [voucher, setVoucher] = useState<boolean>(true);
  const [ticket, setTicket] = useState<boolean>();

  const getTicket = useCallback(async () => {
    try {
      const myTicket = await AsyncStorage.getItem(HAS_AN_AVAILABLE_VOUCHER);
      return myTicket;
    } catch (error) {
      console.log(error);
    }
  }, [HAS_AN_AVAILABLE_VOUCHER]);

  const storeTicket = async () => {
    try {
      await AsyncStorage.setItem(HAS_AN_AVAILABLE_VOUCHER, "true");
      setVoucher(true);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTicket = async () => {
    try {
      await AsyncStorage.removeItem(HAS_AN_AVAILABLE_VOUCHER);
      destroyVoucher();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (voucher) {
      storeTicket();
    } else {
      deleteTicket();
    }
  }, [voucher]);

  const destroyVoucher = () => setVoucher(false);

  const createVoucher = () => setVoucher(true);

  const isVoucherAvailable = async () => {
    const ticket = getTicket();

    return ticket;
  }

  return {
    destroyVoucher,
    createVoucher,
    storeTicket,
    deleteTicket,
    getTicket,
    isVoucherAvailable,
  };
}

export default useVoucher;
