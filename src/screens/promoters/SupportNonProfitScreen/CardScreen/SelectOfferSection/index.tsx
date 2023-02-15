import { useEffect, useState } from "react";
import InputRange from "components/atomics/inputs/InputRange";
import { useOffers } from "@ribon.io/shared/hooks";
import { useCardPaymentInformation } from "contexts/cardPaymentInformationContext";
import { Currencies, Offer } from "@ribon.io/shared/types";
import { theme } from "@ribon.io/shared/styles";
import { formatPrice } from "lib/formatters/currencyFormatter";
import { getLocalStorageItem, setLocalStorageItem } from "lib/localStorage";
import { Text, View } from "react-native";
import Dropdown from "components/moleculars/Dropdown";
import S from "./styles";

const { gray20 } = theme.colors;
const { tertiary } = theme.colors.brand;

type Props = {
  onOfferChange: (offer: Offer) => void;
  currentOffer?: Offer;
  setCurrentOffer: (offer: Offer) => void;
  currentOfferIndex: number;
  setCurrentOfferIndex: (index: number) => void;
};

const CURRENT_OFFER_INDEX_KEY = "CURRENT_OFFER_INDEX_KEY";

function SelectOfferSection({
  onOfferChange,
  setCurrentOffer,
  currentOffer,
  currentOfferIndex,
  setCurrentOfferIndex,
}: Props): JSX.Element {
  const [maxRange, setMaxRange] = useState(0);

  const defaultCurrentOfferIndex = async () => {
    const localstorageIndex = await getLocalStorageItem(
      CURRENT_OFFER_INDEX_KEY,
    );
    if (localstorageIndex) return Number(localstorageIndex);

    return 0;
  };

  useEffect(() => {
    defaultCurrentOfferIndex().then((index) => setCurrentOfferIndex(index));
  }, []);

  const { currentCoin, setCurrentCoin, loading } = useCardPaymentInformation();
  const { offers } = useOffers(currentCoin || Currencies.USD, false);

  useEffect(() => {
    if (offers.length > 0) setMaxRange(offers.length - 1);
    setCurrentOffer(offers[currentOfferIndex]);
  }, [offers]);

  useEffect(() => {
    if (currentOffer) onOfferChange(currentOffer);
  }, [currentOffer]);

  useEffect(() => {
    setCurrentOffer(offers[currentOfferIndex]);
    setLocalStorageItem(CURRENT_OFFER_INDEX_KEY, currentOfferIndex.toString());
  }, [currentOfferIndex]);

  const onCurrencyChanged = (currency: Currencies) => {
    setCurrentCoin(currency);
    setCurrentOfferIndex(0);
  };

  if (loading) return <View />;

  return (
    <View
      style={{
        width: "100%",
      }}
    >
      <View style={S.inputsContainer}>
        <Text style={S.valueText}>
          {currentOffer &&
            formatPrice(currentOffer.priceValue, currentOffer.currency)}
        </Text>
        <Dropdown
          items={[
            { label: Currencies.BRL, value: Currencies.BRL },
            { label: Currencies.USD, value: Currencies.USD },
          ]}
          onSelect={({ value }) => {
            onCurrencyChanged(value as Currencies);
          }}
          label={currentCoin || Currencies.USD}
          containerStyle={S.dropdownContainerStyles}
          textStyle={S.dropdownTextStyles}
        />
      </View>
      <InputRange
        value={currentOfferIndex}
        min={0}
        max={maxRange}
        onChange={(value) => {
          const changeValue = Array.isArray(value) ? value[0] : value;
          setCurrentOfferIndex(changeValue);
        }}
        color={tertiary[400]}
        minimumTrackTintColor={tertiary[400]}
        maximumTrackTintColor={gray20}
        sliderStyle={S.sliderStyle}
      />
    </View>
  );
}

export default SelectOfferSection;
