import URLS from "../../utils/constants";

const fetCurrenciesRateChange = async ({ commit }) => {
  try {
    const response = await fetch(URLS.CBR);
    const { Valute: currenciesRate } = await response.json();

    const rateChangesRuble = Object.keys(currenciesRate).map((key) => {
      return {
        charCode: currenciesRate[key].CharCode,
        nominal: currenciesRate[key].Nominal,
        name: currenciesRate[key].Name,
        value: currenciesRate[key].Value.toFixed(3),
        previous: currenciesRate[key].Previous,
        percentageChange: (
          ((currenciesRate[key].Value - currenciesRate[key].Previous) * 100) /
          currenciesRate[key].Value
        ).toFixed(2),
      };
    });
    commit("SET_CURRENCIES_RATES", rateChangesRuble);
  } catch (error) {
    console.error(error, "Actions fetCurrenciesRateChange");
  }
};
const searchCurrency = async ({ commit, getters }, query) => {
  commit("SET_SEARCH_QUERY", query);
  const resultSearch = JSON.parse(
    JSON.stringify(getters.getCurrenciesRate)
  ).filter((currency) => {
    return (
      currency.name.toLowerCase().includes(query.toLowerCase()) ||
      currency.charCode.toLowerCase().includes(query.toLowerCase())
    );
  });
  commit("SET_SEARCHED_CURRENCIES_RATE", resultSearch);
};

const calculateRateChange = ({ getters }, { from, to, amount }) => {
  const charCodeBase = getters.getBaseCurrency.charCode;
  const { value: basePrice, nominal: nominalBase } =
    getters.getCurrenciesRate.find((currency) => {
      return to === charCodeBase
        ? currency.charCode.toLowerCase() === from.toLowerCase()
        : currency.charCode.toLowerCase() === to.toLowerCase();
    });
  // Conversion from base currency to another currency
  if (from === charCodeBase) {
    return {
      result: (amount / basePrice) * nominalBase,
      conversionRate: basePrice,
    };
    // Conversion from another currency to base currency
  } else if (to === charCodeBase) {
    return {
      result: (amount * basePrice) / nominalBase,
      conversionRate: basePrice,
    };
  }
  //conversion from another currency to another currency
  const { value: priceSource, nominal: nominalSource } =
    getters.getCurrenciesRate.find((currency) => {
      return currency.charCode.toLowerCase() === from.toLowerCase();
    });
  const result =
    (amount * priceSource) / nominalSource / (basePrice / nominalBase);
  return {
    result: result,
    conversionRate: priceSource / nominalSource / basePrice,
  };
};

export default { fetCurrenciesRateChange, searchCurrency, calculateRateChange };
