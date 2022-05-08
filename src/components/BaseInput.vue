<template>
  <input
    v-if="inputSpecial === 'phone'"
    :value="modelValue"
    v-imask="{ mask: '{+7} (000) 000-00-00', lazy: false }"
    @input="formatNumber"
    class="w-80 border-2 border-gray-300 shadow-sm rounded-md px-3 py-1 text-gray-500 sm:w-48 xl:w-44"
  />
  <input
    v-else-if="inputSpecial === 'email'"
    type="text"
    placeholder="you@example.com"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    class="w-80 border-2 border-gray-300 shadow-sm rounded-md px-3 py-1 text-gray-500 sm:w-48 xl:w-44"
  />
  <input
    v-else
    :value="modelValue"
    placeholder="Иван Иванов"
    @input="$emit('update:modelValue', $event.target.value)"
    class="w-80 border-2 border-gray-300 shadow-sm rounded-md px-3 py-1 text-gray-500 sm:w-48 xl:w-44"
  />
</template>

<script>
import { IMaskDirective } from 'vue-imask';

export default {
  props: ['inputSpecial', 'modelValue'],
  emits: ['update:modelValue'],
  directives: {
    imask: IMaskDirective,
  },
  methods: {
    formatNumber(event) {
      let onlyNumbers = `+${event.target.value.replace(/\D/g, '')}`;

      if (onlyNumbers.length > 12) {
        onlyNumbers = onlyNumbers.slice(0, -1);
      }

      this.$emit('update:modelValue', onlyNumbers);
    },
  },
};
</script>
