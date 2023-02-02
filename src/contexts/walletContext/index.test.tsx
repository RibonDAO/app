import React from "react";
import { render } from "@testing-library/react-native";
import { Text, View } from "react-native";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import { useWalletContext } from ".";

function WalletTestPage() {
  useWalletContext();
  return (
    <View>
      <Text>Wallet</Text>
    </View>
  );
}

describe("useWallet", () => {
  it("should render without error", () => {
    render(<WalletTestPage />);
    expectTextToBeInTheDocument("Wallet");
  });
});
