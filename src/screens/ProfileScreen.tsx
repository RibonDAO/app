import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import { Text, View } from "components/Themed";

import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { theme } from "@ribon.io/shared";

const shortenAddress = (address: string) =>
  `${address.slice(0, 6)}...${address.slice(
    address.length - 4,
    address.length,
  )}`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  buttonStyle: {
    backgroundColor: "#3399FF",
    borderWidth: 0,
    color: "#FFFFFF",
    borderColor: "#3399FF",
    height: 40,
    alignItems: "center",
    borderRadius: 30,
    marginLeft: theme.spacingNative(32),
    marginRight: theme.spacingNative(32),
    marginTop: theme.spacingNative(20),
    marginBottom: theme.spacingNative(20),
  },
  buttonTextStyle: {
    color: "#FFFFFF",
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    fontWeight: "600",
  },
});
export default function ProfileScreen() {
  const connector = useWalletConnect();

  const connectWallet = React.useCallback(
    () => connector.connect(),
    [connector],
  );

  const killSession = React.useCallback(
    () => connector.killSession(),
    [connector],
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      {!connector.connected && (
        <TouchableOpacity onPress={connectWallet} style={styles.buttonStyle}>
          <Text style={styles.buttonTextStyle}>Connect a Wallet</Text>
        </TouchableOpacity>
      )}
      {!!connector.connected && (
        <>
          <Text>{shortenAddress(connector.accounts[0])}</Text>
          <TouchableOpacity onPress={killSession} style={styles.buttonStyle}>
            <Text style={styles.buttonTextStyle}>Log out</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}
