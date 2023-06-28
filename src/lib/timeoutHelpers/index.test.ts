import { perform } from "."; // Replace with the actual file name

describe("perform", () => {
  let setTimeoutSpy: jest.SpyInstance;

  beforeEach(() => {
    // Create a spy on setTimeout
    setTimeoutSpy = jest.spyOn(global, "setTimeout");
  });

  afterEach(() => {
    // Restore the original setTimeout implementation
    setTimeoutSpy.mockRestore();
  });

  it("should call setTimeout with the provided function and delay", () => {
    const myFunction = jest.fn();
    perform(myFunction).in(1000);

    expect(setTimeoutSpy).toHaveBeenCalledWith(myFunction, 1000);
  });

  it("should execute the function after the specified delay", () => {
    jest.useFakeTimers();

    const myFunction = jest.fn();
    perform(myFunction).in(1000);

    expect(myFunction).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1000);

    expect(myFunction).toHaveBeenCalled();
  });
});
