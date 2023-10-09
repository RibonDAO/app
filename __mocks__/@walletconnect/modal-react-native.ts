export const useWalletConnectModal = () => ({
  provider: () => jest.fn(),
  isConnected: false,
  address: "0x123",
  open: jest.fn(),
  close: jest.fn(),
  isOpen: false,
});
