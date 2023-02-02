import { clickOn, waitForPromises } from "config/testUtils";
import { renderComponent } from "config/testUtils/renders";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import { View, Text } from "react-native";
import Button from "components/atomics/buttons/Button";
import { TextInput } from "react-native";
import { useCryptoPayment } from ".";

const mockApprove = () => ({ wait: () => {} });
const mockTransactionHash = "0x000";
const mockAddPoolBalance = () => ({ hash: mockTransactionHash });
const mockOnSuccess = jest.fn();
const mockContract = {
  functions: {
    addPoolBalance: mockAddPoolBalance,
    approve: mockApprove,
    symbol: () => "USDC",
  },
  addPoolBalance: jest.fn(),
  approve: jest.fn(),
  balanceOf: () => 100 * 10 ** 18,
  decimals: () => 18,
};
const mockProvider = {
  getSigner: jest.fn(),
  on: jest.fn(),
  getNetwork: jest.fn(),
};

jest.mock("hooks/useContract", () => ({
  __esModule: true,
  useContract: () => mockContract,
}));

jest.mock("hooks/useTokenDecimals", () => ({
  __esModule: true,
  default: () => ({
    tokenDecimals: 18,
  }),
}));

jest.mock("hooks/useProvider", () => ({
  __esModule: true,
  useProvider: () => mockProvider,
}));

function CryptoPaymentTestPage() {
  const {
    userBalance,
    handleDonationToContract,
    tokenSymbol,
    amount,
    setAmount,
  } = useCryptoPayment();
  return (
    <View>
      <Text>CryptoPayment</Text>
      <Button
        onPress={() => handleDonationToContract(mockOnSuccess)}
        text="donate"
      />
      <TextInput
        placeholder="amount"
        value={amount}
        onChange={(event) => {
          setAmount(event.nativeEvent.text);
        }}
      />
      <Text>{userBalance}</Text>
      <Text>{tokenSymbol}</Text>
    </View>
  );
}

describe("useCryptoPayment", () => {
  const wallet = "0x123";

  beforeEach(async () => {
    renderComponent(<CryptoPaymentTestPage />, {
      walletProviderValue: {
        wallet,
      },
      loadingOverlayValue: {
        showLoadingOverlay: jest.fn(),
        hideLoadingOverlay: jest.fn(),
      },
    });
    await waitForPromises();
  });

  it("renders without error", () => {
    expectTextToBeInTheDocument("CryptoPayment");
  });

  it("returns the user balance", () => {
    expectTextToBeInTheDocument("100");
  });

  it("returns the token symbol", () => {
    expectTextToBeInTheDocument("USDC");
  });

  describe("#handleDonateToContract", () => {
    const RIBON_CONTRACT_ADDRESS = "0x348eA4886c5F0926d7A6Ad6C5CF6dFA4F88CA9Bf";
    const DEFAULT_POOL_ADDRESS = "0xDE5dD6864A8aE4e5D93E24e24Fee9D42320753B6";
    const amount = 5000000000000000000;

    it("calls the approve function with correct params", async () => {
      const approveSpy = jest.spyOn(mockContract.functions, "approve");
      clickOn("donate");
      await waitForPromises();

      expect(approveSpy).toHaveBeenCalledWith(
        RIBON_CONTRACT_ADDRESS,
        amount.toString(),
        {
          from: wallet,
        },
      );
      approveSpy.mockRestore();
    });

    it("calls the donateToContract function with correct params", async () => {
      const addPoolBalanceSpy = jest.spyOn(
        mockContract.functions,
        "addPoolBalance",
      );
      clickOn("donate");
      await waitForPromises();

      expect(addPoolBalanceSpy).toHaveBeenCalledWith(
        DEFAULT_POOL_ADDRESS,
        amount.toString(),
      );
      addPoolBalanceSpy.mockRestore();
    });
  });
});
