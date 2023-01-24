import { Currencies } from "@ribon.io/shared/types";

export function removeInsignificantZeros(price: string) {
  const lastThree = price.slice(price.length - 3);
  if (lastThree === ".00" || lastThree === ",00")
    return price.split(lastThree)[0];
  return price;
}

export function formatPrice(price: number, currency: string) {
  if (currency === Currencies.BRL)
    return `R$ ${price
      .toFixed(2)
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}`.replace(".", ",");

  return `$ ${price.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}`;
}
