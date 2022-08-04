<script setup>
import { computed } from "vue";
import { ref } from "vue";

const props = defineProps({
  baseCurrency: {
    type: Object,
    default: () => ({}),
  },
  rateChangeCurrency: {
    type: Object,
    required: true,
  },
});
const reverseMode = ref(false);
const rateChangeCurrencyToRender = computed(() => {
  return reverseMode.value
    ? {
        charCode: props.baseCurrency.charCode,
        nominal: props.baseCurrency.nominal,
        name: props.baseCurrency.name,
        value: (
          (props.baseCurrency.value / props.rateChangeCurrency.value) *
          props.rateChangeCurrency.nominal
        ).toFixed(3),
        percentageChange: props.rateChangeCurrency?.percentageChange * -1,
      }
    : props.rateChangeCurrency;
});
const mainCurrencyToRender = computed(() => {
  return reverseMode.value ? props.rateChangeCurrency : props.baseCurrency;
});
const isPositiveChange = computed(() => {
  return rateChangeCurrencyToRender.value.percentageChange > 0;
});
</script>

<template>
  <div class="row">
    <IconiFy
      icon="akar-icons:arrow-right-left"
      class="row__switch-icon"
      width="18"
      @click="reverseMode = !reverseMode"
    >
    </IconiFy>
    <div class="row__currency">
      <Transition mode="out-in" name="fade-in">
        <div class="currency__value">
          {{ rateChangeCurrencyToRender.nominal }}
          {{ rateChangeCurrencyToRender.charCode }}
        </div>
      </Transition>
    </div>
    <div class="row__currency">
      <div class="currency__value">
        {{ rateChangeCurrencyToRender.value }}
        {{ mainCurrencyToRender.charCode }}
      </div>
    </div>
    <div class="row__changeIndex">
      <IconiFy
        v-if="rateChangeCurrencyToRender.value.percentageChange !== 0"
        :icon="isPositiveChange ? 'bi-arrow-up-right' : 'bi-arrow-down-right'"
        :color="isPositiveChange ? 'green' : 'red'"
        :inline="true"
      ></IconiFy>
      {{ rateChangeCurrencyToRender.percentageChange }} %
    </div>
  </div>
</template>

<style lang="scss" scoped>
.row {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-items: start;
  align-items: center;
  padding: 10px;
  &:hover {
    background-color: $gray-400;
  }
  &__switch-icon {
    &:hover {
      cursor: pointer;
      color: $gray-800;
    }
  }
  &__changeIndex {
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 5px;
  }
}
.currency {
  display: flex;
  align-items: center;
  &__value {
    font-weight: 800;
    display: flex;
  }
}
</style>
