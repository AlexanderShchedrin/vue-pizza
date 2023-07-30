<template>
  <div class="text-field">
    <textarea
      class="text-filed__input"
      :class="{'text-filed__input-error': showError}"
      :value="modelValue"
      :name="name"
      :placeholder="placeholder"
      :required="required"
      @input="$emit('update:modelValue', $event.target.value)"
    ></textarea>
    <span
      v-if="showError"
      class="text-filed__text"
    >{{ errorText }}</span>
  </div>
</template>
<script setup>
import { computed } from 'vue';

const props = defineProps({
  modelValue: {
    type: [String, Number],
    required: true,
  },
  name: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  required: {
    type: Boolean,
    default: false,
  },
  errorText: {
    type: String,
    default: 'Ошибка'
  },
});

defineEmits(['update:modelValue']);

const showError = computed(() => {
  return !props.modelValue && !!props.modelValue.errorText;
})

</script>
<style lang="scss" scoped>
@import "@/assets/scss/app.scss";
.text-field {
  position: relative;

  &__input {
    display: block;

    box-sizing: border-box;
    width: 100%;
    height: 90px;
    margin-top: 16px;
    padding: 16px;

    resize: none;
    transition: border-color $animationSpeed;

    color: $blue-gray-600;
    border: 1px solid $gray-100;
    border-radius: 6px;
    outline: none;

    @include r-s14-h21;

    &:focus {
      border-color: $blue-600;
    }

    &--error {
      border-color: $red-600;
    }
  }

  &__text {
    position: absolute;
    bottom: -12px;
    left: 0;

    color: $red-600;

    @include r-s10-h12;
  }
}
</style>
