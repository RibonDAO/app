import { renderComponent } from "config/testUtils/renders";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import CardReferral from ".";

jest.mock("@ribon.io/shared/hooks", () => ({
  __esModule: true,
  ...jest.requireActual("@ribon.io/shared/hooks"),
  useUserProfile: () => ({
    userProfile: () => ({
      profile: {
        photo: "photo",
        name: "name",
        user: {
          email: "email",
        },
      },
    }),
  }),
}));

describe("CardLargeImage", () => {
  it("renders without error", () => {
    renderComponent(<CardReferral />);

    expectTextToBeInTheDocument("Gift someone 1 ticket");
  });
});
