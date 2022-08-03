import { createStore } from "vuex";
import actions from "./currency/actions";
import mutations from "./currency/mutations";
import getters from "./currency/getters";

const store = createStore({
  state() {
    return {
      baseCurrency: {
        charCode: "RUB",
        nominal: 1,
        name: "Российский рубль",
        value: 1,
      },
      currenciesRate: [],
      searchQuery: "",
      searchedCurrenciesRate: [],
    };
  },
  actions,
  getters,
  mutations,
});

export default store;
