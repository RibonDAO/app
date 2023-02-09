import React from "react";
import CryptoPage from "screens/promoters/SupportCauseScreen/CryptoScreen";
import CardScreen from "screens/promoters/SupportCauseScreen/CardScreen";
import { useCryptoPayment } from "contexts/cryptoPaymentContext";
import { Text, TouchableOpacity, View } from "react-native";
import Button from "components/atomics/buttons/Button";
import { theme } from "@ribon.io/shared/styles";

export default function SupportCauseScreen() {
  const { isInCryptoPage } = useCryptoPayment();
  const [submenuVisible, setSubmenuVisible] = React.useState(false);

  return (
    <View>
      {isInCryptoPage ? <CryptoPage /> : <CardScreen />}
      <View
        style={{
          position: "absolute",
          bottom: 0,
          backgroundColor: theme.colors.gray20,
          width: "100%",
        }}
      >
        <View style={{ width: "100%", display: "flex", alignItems: "center" }}>
          <TouchableOpacity
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: 24,
            }}
            onPress={() => {
              setSubmenuVisible(!submenuVisible);
            }}
          >
            {submenuVisible ? <Text>\/</Text> : <Text>^</Text>}
          </TouchableOpacity>
        </View>
        {submenuVisible && (
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              padding: 8,
            }}
          >
            <Button
              text="Comunidade"
              onPress={() => {}}
              customStyles={{
                flex: 1,
                backgroundColor: theme.colors.gray40,
                borderColor: theme.colors.gray40,
                height: 30,
                marginRight: 4,
              }}
            />
            <Button
              text="Doação Direta"
              onPress={() => {}}
              customStyles={{
                flex: 1,
                backgroundColor: theme.colors.gray10,
                borderColor: theme.colors.gray40,
                height: 30,
                marginLeft: 4,
              }}
              textColor={theme.colors.gray40}
            />
          </View>
        )}
      </View>
    </View>
  );
}
