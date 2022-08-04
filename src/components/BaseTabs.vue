<script setup>
const emit = defineEmits(["change_tab"]);
defineProps({
  activeTab: {
    type: String,
    default: "",
  },
  tabs: {
    type: Array,
    default: () => [],
  },
});
</script>
<template>
  <div class="tabs">
    <div class="tabs__btn">
      <button
        v-for="(tab, index) in tabs"
        :key="`tab-${index}`"
        :class="{
          active: activeTab === tab,
        }"
        @click="emit('change_tab', tab)"
      >
        {{ tab }}
      </button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.tabs {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}
.tabs__btn {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  & button {
    width: 50%;
    border: 1px solid $border-color;
    border-radius: $border-radius-default;
    padding: 10px;
    &:hover {
      background-color: $primary;
      cursor: pointer;
    }
  }
}
.active {
  background-color: $primary;
}
</style>
