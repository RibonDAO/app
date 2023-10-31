import { waitForPromises } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import { renderComponent } from "config/testUtils/renders";
import { Text, View } from "react-native";
import { useNetworkContext } from ".";

jest.mock("hooks/useProvider", () => ({
  useProvider: () => ({
    getNetwork: () => ({
      name: "Mumbai Testnet",
      chainId: 0x13881,
      ensAddress: "https://rpc-mumbai.maticvigil.com",
    }),
    getSigner: jest.fn(() => ({
      call: jest.fn(),
    })),
    on: jest.fn(),
  }),
}));

function NetworkTestPage() {
  useNetworkContext();
  return (
    <View>
      <Text>Network</Text>
    </View>
  );
}

describe("useNetwork", () => {
  it("renders without error", async () => {
    renderComponent(<NetworkTestPage />);
    await waitForPromises();
    expectTextToBeInTheDocument("Network");
  });
});
