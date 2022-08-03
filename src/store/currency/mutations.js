const SET_CURRENCIES_RATES = (state, payload) => {
  state.currenciesRate = payload;
};
const SET_SEARCHED_CURRENCIES_RATE = (state, payload) => {
  state.searchedCurrenciesRate = payload;
};
const SET_SEARCH_QUERY = (state, payload) => {
  state.searchQuery = payload;
};
export default {
  SET_CURRENCIES_RATES,
  SET_SEARCHED_CURRENCIES_RATE,
  SET_SEARCH_QUERY,
};
