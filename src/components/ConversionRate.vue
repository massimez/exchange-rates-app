<script setup>
import { computed, ref, watch } from "vue";
import { useStore } from "vuex";
import BaseInput from "./UI/BaseInput.vue";

const store = useStore();
const baseCurrency = computed(() => store.getters.getBaseCurrency);
const fromCurrency = ref(baseCurrency.value.charCode);
const toCurrency = ref("USD");
const amountToConvert = ref("");
const amountResultConversion = ref("");
const conversionRate = ref("");
const currenciesList = computed(() => {
  return store.getters.getCurrenciesList;
});

const handleConversion = async () => {
  if (!amountToConvert.value) {
    amountResultConversion.value = "";
    return;
  }
  const from = fromCurrency.value;
  const to = toCurrency.value;
  const amount = amountToConvert.value;
  const { result, conversionRate: cRate } = await store.dispatch(
    "calculateRateChange",
    {
      from,
      to,
      amount,
    }
  );
  amountResultConversion.value = result;
  conversionRate.value = cRate;
};

const handleReverse = () => {
  amountToConvert.value = amountResultConversion.value;
  const temp = fromCurrency.value;
  fromCurrency.value = toCurrency.value;
  toCurrency.value = temp;
  handleConversion();
};
watch([amountToConvert, fromCurrency, toCurrency], () => {
  handleConversion();
});
</script>
<template>
  <div class="wrapper">
    <div class="conversion">
      <div class="conversion__source">
        <select
          v-model="fromCurrency"
          name="fromCurrency"
          class="conversion__select"
        >
          <option :value="baseCurrency.charCode">
            {{ baseCurrency.charCode }}
          </option>
          <option
            v-for="(currency, index) in currenciesList"
            :key="index"
            :value="currency.charCode"
          >
            {{ currency.charCode }}
          </option>
        </select>

        <BaseInput
          v-model="amountToConvert"
          type="number"
          class="conversion__input"
          placeholder="Amount"
          :min="0"
        >
        </BaseInput>
      </div>
      <div class="conversion__reverse">
        <IconiFy
          icon="akar-icons:arrow-right-left"
          class="conversion__switch-icon"
          width="25"
          @click="handleReverse"
        >
        </IconiFy>
      </div>
      <div class="conversion__result">
        <select
          v-model="toCurrency"
          name="baseCurrency"
          class="conversion__select"
        >
          <option
            v-for="(currency, index) in currenciesList"
            :key="index"
            :value="currency.charCode"
          >
            {{ currency.charCode }}
          </option>
          <option :value="baseCurrency.charCode">
            {{ baseCurrency.charCode }}
          </option>
        </select>
        <BaseInput
          v-model="amountResultConversion"
          class="conversion__input"
          :disabled="true"
        ></BaseInput>
      </div>
    </div>
    <h3 v-if="conversionRate && amountToConvert">
      Currency Rate exchange : {{ conversionRate }}
      {{ toCurrency }}
    </h3>
  </div>
</template>
<style lang="scss" scoped>
.conversion {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  gap: 10px;
  &__source {
    display: flex;
    flex-direction: row;
    gap: 10px;
  }
  &__result {
    display: flex;
    flex-direction: row;
    gap: 10px;
  }
  &__select {
    width: 80px;
    height: 50px;
    border: 1px solid $black;
    border-radius: $border-radius-default;
    padding: 3px;
    background-color: $white;
  }
  &__input {
    height: 50px;
  }
  &__reverse {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    border: 1px solid $black;
    border-radius: $border-radius-default;
    padding: 3px;
    cursor: pointer;
    &:hover {
      color: rgb(18, 58, 58);
    }
  }
}
@include _sm {
  .conversion {
    flex-direction: column;
    &__reverse {
      transform: rotate(90deg);
    }
  }
}
</style>
