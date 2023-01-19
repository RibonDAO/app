import { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { HAS_AN_AVAILABLE_VOUCHER } from "@ribon.io/shared";

function useVoucher() {
  const [ticket, setTicket] = useState<boolean>(true);

  const getTicket = useCallback(async () => {
    try {
      const myTicket = await AsyncStorage.getItem(HAS_AN_AVAILABLE_VOUCHER);
      // setTicket(myTicket);

      return myTicket;
    } catch (error) {
      console.log(error);
    }
  }, [HAS_AN_AVAILABLE_VOUCHER]);

  const storeTicket = async () => {
    try {
      await AsyncStorage.setItem(HAS_AN_AVAILABLE_VOUCHER, "true");
      setTicket(true);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTicket = async () => {
    try {
      await AsyncStorage.removeItem(HAS_AN_AVAILABLE_VOUCHER);
      setTicket(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTicket();
  }, []);

  useEffect(() => {
    if (ticket) {
      storeTicket();
    } else {
      deleteTicket();
    }
  }, [ticket]);

  const isVoucherAvailable = () => {
    const ticket = getTicket();

    return ticket;
  }

  return {
    storeTicket,
    deleteTicket,
    getTicket,
    isVoucherAvailable,
  };
}

export default useVoucher;
