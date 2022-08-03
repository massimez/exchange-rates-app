<script setup>
import CurrenciesList from "../components/CurrenciesList.vue";
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import BaseTabs from "../components/BaseTabs.vue";
import ConversionRate from "../components/ConversionRate.vue";

const store = useStore();
onMounted(async () => {
  await store.dispatch("fetCurrenciesRateChange");
});
const tabs = ref(["Exchange Rate", "Conversion"]);
const activeTab = ref("Exchange Rate");
</script>

<template>
  <div class="container-content">
    <BaseTabs
      :tabs="tabs"
      :active-tab="activeTab"
      @change_tab="activeTab = $event"
    ></BaseTabs>
    <Transition mode="out-in" name="fade-in">
      <CurrenciesList v-if="activeTab === 'Exchange Rate'" />
      <ConversionRate v-else-if="activeTab === 'Conversion'" />
    </Transition>
  </div>
</template>
<style lang="scss" scoped>
.container-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
}
</style>
