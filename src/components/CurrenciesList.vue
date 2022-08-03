<script setup>
import { computed, onUnmounted } from "vue";
import { useStore } from "vuex";
import CurrencyRow from "./CurrencyRow.vue";
import BaseInput from "../components/UI/BaseInput.vue";

const store = useStore();

const baseCurrency = computed(() => {
  return store.getters.getBaseCurrency;
});
const currenciesRate = computed(() => {
  if (store.getters.getSearchQuery)
    return store.getters.getSearchedCurrenciesRate;
  return store.getters.getCurrenciesRate;
});
const handleSearch = async (query) => {
  await store.dispatch("searchCurrency", query);
};
onUnmounted(async () => {
  await store.dispatch("searchCurrency", "");
});
</script>
<template>
  <div class="container-list">
    <h2>
      <IconiFy icon="emojione:flag-for-russia"></IconiFy>
      {{ baseCurrency.charCode }}
    </h2>
    <BaseInput
      type="search"
      placeholder="Search by name"
      class="container-list__search"
      @update:modelValue="handleSearch"
    />
    <CurrencyRow
      v-for="(currencyRate, index) in currenciesRate"
      :key="`change-${index}`"
      :base-currency="baseCurrency"
      :rate-change-currency="currencyRate"
    ></CurrencyRow>
  </div>
</template>
<style lang="scss" scoped>
.container-list {
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar {
    width: 6px;
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #000000;
  }
  &__search {
    width: 60%;
    height: 50px;
    font-size: 18px;
  }
}
</style>
