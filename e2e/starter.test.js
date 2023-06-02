describe("Example", () => {
  beforeAll(async () => {
    await device.launchApp({ newInstance: true });

    await device.openURL({
      url: `exp+app://expo-development-client/?url=${encodeURIComponent(
        "http://localhost:19000"
      )}`,
    });
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it("should have welcome screen", async () => {
    await expect(element(by.text("Donate to a Project"))).toBeVisible();
  });

  it("goes to donate screen if donate is clicked", async () => {
    await element(by.text("Donate")).atIndex(0).tap();
    await expect(element(by.id("privacy-policy"))).toBeVisible();
  });

  it("shows the ticket tooltip", async () => {
    await element(by.text("What is a ticket?")).tap();
    await expect(element(by.text("Tickets are used to make donations. You get one everyday when you sign in."))).toBeVisible();
  });

  it("goes to impact page", async () => {
    await element(by.text("Impact")).tap();
    await expect(element(by.text("Horas da Vida"))).toBeVisible();
    await expect(element(by.text("Amor em Patas"))).toBeVisible();
  });

  it("goes donates", async () => {
    await element(by.text("Donate")).atIndex(0).tap();
    await element(by.text("Donate")).atIndex(0).tap();

    await waitFor(element(by.text("If you want, you can do more"))).toBeVisible().withTimeout(5000)
  });
});
