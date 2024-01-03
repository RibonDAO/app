import { waitForPromises } from "config/testUtils";
import { signIn } from ".";

jest.mock("@react-native-google-signin/google-signin", () => ({
  __esModule: true,
  GoogleSignin: {
    signIn: jest.fn().mockResolvedValue(true),
    configure: jest.fn(),
    statusCode: jest.fn(),
    hasPlayServices: jest.fn().mockResolvedValue(true),
  },
  statusCodes: {
    SIGN_IN_CANCELLED: "0",
    IN_PROGRESS: "1",
    PLAY_SERVICES_NOT_AVAILABLE: "2",
  },
}));

describe("signIn", () => {
  it("calls the mockFn when clicked", async () => {
    const result = await signIn();
    const userInfo = true;
    waitForPromises();
    expect(result).toStrictEqual({ userInfo });
  });
});
