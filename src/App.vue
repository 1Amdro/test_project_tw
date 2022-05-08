<template>
  <section font-inter>
    <div class="flex flex-col items-center sm:flex-row">
      <base-button
        class="sm:ml-10 xl:ml-20"
        @click="selectCity('Moscow')"
        :btn-type="'B'"
        >Заказать в Москву</base-button
      >
      <base-button @click="selectCity('St-Petersburg')" :btn-type="'A'"
        >Заказать в Санкт-Петербург</base-button
      >
    </div>
    <Teleport to="#app">
      <div
        class="flex justify-center items-center absolute inset-0"
        v-if="showForm"
      >
        <div @click="toggleForm" class="bg-gray-500/75 w-full h-full"></div>
        <the-form
          :currentSelected="currentSelected"
          :closeForm="toggleForm"
          :cities="citiesData"
          @send-info="postData"
        ></the-form>
      </div>
      <div
        class="flex justify-center items-center absolute inset-0"
        v-if="responseElement"
      >
        <div @click="closeModal" class="bg-gray-500/75 w-full h-full"></div>
        <the-modal
          :message="responseElement"
          :closeModal="closeModal"
        ></the-modal>
      </div>
    </Teleport>
  </section>
</template>

<script>
import TheForm from './components/TheForm.vue';
import TheModal from './components/TheModal.vue';

export default {
  name: 'App',
  components: { TheForm, TheModal },
  data() {
    return {
      showForm: false,
      currentSelected: null,
    };
  },
  computed: {
    citiesData() {
      return this.$store.state.cities;
    },
    responseElement() {
      return this.$store.state.message;
    },
  },
  methods: {
    toggleForm() {
      this.showForm = !this.showForm;
    },
    selectCity(city) {
      if (city === 'Moscow') this.currentSelected = this.citiesData[0].id;
      if (city === 'St-Petersburg')
        this.currentSelected = this.citiesData[1].id;
      this.toggleForm();
    },
    postData(data) {
      this.$store.dispatch('sendData', data);
    },
    closeModal() {
      this.$store.dispatch('changeMessage', '');
    },
  },
};
</script>
