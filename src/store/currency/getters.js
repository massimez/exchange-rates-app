const getBaseCurrency = (state) => state.baseCurrency;
const getCurrenciesRate = (state) => state.currenciesRate;
const getCurrenciesList = (state) => {
  return state.currenciesRate.map((currency) => {
    return { charCode: currency.charCode, name: currency.name };
  });
};
const getSearchQuery = (state) => state.searchQuery;
const getSearchedCurrenciesRate = (state) => state.searchedCurrenciesRate;

export default {
  getCurrenciesRate,
  getCurrenciesList,
  getBaseCurrency,
  getSearchQuery,
  getSearchedCurrenciesRate,
};
