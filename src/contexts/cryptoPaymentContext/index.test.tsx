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
        accessibilityLabel="Enter donation amount"
        accessibilityHint="Type the amount you want to donate in the input field."
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
    const RIBON_CONTRACT_ADDRESS = "0x4Ef236DA69ac23a9246cd1d8866264f1A95601C0";
    const DEFAULT_POOL_ADDRESS = "0x1E7aF4A35E33E8CfA97e12237509623a8037632C";
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
        { gasLimit: 50000 },
      );
      addPoolBalanceSpy.mockRestore();
    });
  });
});
