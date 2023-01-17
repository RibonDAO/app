import { theme } from "@ribon.io/shared/styles";
import { Cause } from "@ribon.io/shared/types";
import { Text, View } from "components/Themed";

const { orange30, orange40 } = theme.colors;

type Props = {
  cause: Cause | undefined;
  onValueChange: (value: number) => void;
};

function SelectCryptoOfferSection({
  cause,
  onValueChange,
}: Props): JSX.Element {
  const values = [5, 10, 15, 20, 25, 50, 70, 100];

  return (
    <View>
      <Text>{cause?.name}</Text>
    </View>
  );
}

export default SelectCryptoOfferSection;
