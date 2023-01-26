import { Languages } from "types/enums/Languages";
import { countryByLanguage } from ".";

describe("#countryByLanguage", () => {
  describe("when the language is PT", () => {
    it("returns the BRL currency", () => {
      expect(countryByLanguage(Languages.PT)).toEqual("BR");
    });
  });

  describe("when the language is EN", () => {
    it("returns the USD currency", () => {
      expect(countryByLanguage(Languages.EN)).toEqual("US");
    });
  });
});
