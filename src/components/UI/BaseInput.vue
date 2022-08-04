<script setup>
const emit = defineEmits(["update:modelValue", "input"]);
defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
  min: {
    type: Number,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});
const updateContent = (event) => {
  emit("update:modelValue", event.target.value);
};
</script>
<template>
  <div class="block">
    <input
      class="block__input"
      :value="modelValue"
      :type="type"
      :min="min"
      :placeholder="placeholder"
      :disabled="disabled"
      @input="updateContent"
    />
  </div>
</template>
<style lang="scss" scoped>
.block {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  min-height: 30px;
  border-radius: $border-radius-default;
  background-color: $white-50;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.1);
  &__input {
    width: 100%;
    height: 100%;
    border: none;
    border-radius: $border-radius-default;
    outline: none;
    padding: 0 10px;
    font-size: 16px;
    font-weight: 500;
    color: $black;
    &::placeholder {
      color: $white-400;
    }
  }
}
</style>
