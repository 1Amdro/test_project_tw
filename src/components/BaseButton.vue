<template>
  <button
    class="text-white shadow-sm rounded-md py-2 font-medium text-center w-80 mx-2.5 mt-2.5 sm:mt-5"
    :class="styledBtn"
    :mask="Number"
    radix="."
    @accept:masked="onAccept"
    @accept:unmasked="onAcceptUnmasked"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    btnType: {
      required: true,
      type: String,
    },
  },
  computed: {
    styledBtn() {
      return {
        'bg-teal-600': this.btnType === 'A',
        'bg-blue-500': this.btnType === 'B',
        'bg-green-600': this.btnType === 'C',
      };
    },
  },
};
</script>
