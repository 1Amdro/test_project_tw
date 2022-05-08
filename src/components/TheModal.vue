<template>
  <div
    class="flex flex-col justify-center items-center absolute p-5 bg-white rounded-lg shadow-xl"
  >
    <div v-if="message !== 'error'">
      <div class="text-xl" v-html="message"></div>
    </div>
    <p class="text-red-600 text-lg" v-else>Ошибка!</p>
    <base-button class="w-40" :btn-type="'C'" @click="closeModal"
      >Закрыть</base-button
    >
  </div>
</template>

<script>
export default {
  props: ['message', 'closeModal'],
};
</script>
