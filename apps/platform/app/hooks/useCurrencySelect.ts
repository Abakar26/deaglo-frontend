import { useEffect, useState } from "react";
import { type Selectable } from "ui/components";
import { MarketInteractor } from "../interactors";
import { useCurrencyStore, type Currency } from "../store/CurrencyStates";

export function useCurrencySelect() {
  const [search, setSearch] = useState("");

  const currencies = useCurrencyStore((state) => state.currencies);
  const setCurrencies = useCurrencyStore((state) => state.setCurrencies);

  const currencyToSelectable = (currency: Currency): Selectable => ({
    flag: currency.countryName,
    key: currency.code,
    value: currency.code,
  });

  const selectableToCurrency = (selectable: Selectable) =>
    currencies?.find((currency) => currency.code === selectable.value);

  const options: Selectable[] = currencies
    .filter((currency) => currency.code.toUpperCase().includes(search.toUpperCase()))
    .map(currencyToSelectable);

  useEffect(() => {
    if (currencies.length === 0) {
      MarketInteractor.currency
        .getAll()
        .then(([data]) => data && setCurrencies(data))
        .catch(console.error);
    }
  }, [currencies.length, setCurrencies]);

  return {
    options,
    search,
    currencyToSelectable,
    selectableToCurrency,
    onSearch: setSearch,
  };
}
