<template>
  <form
    class="form absolute px-5 pb-5 bg-white flex flex-col items-center rounded-lg shadow-xl"
    @click.prevent=""
  >
    <h1 class="text-2xl font-medium m-6 pl-4 mb-3 w-full sm:pl-1 sm:mb-0">
      Заказать звонок
    </h1>
    <div
      class="flex flex-col items-center sm:grid sm:grid-cols-3 sm:gap-1 sm:gap-x-6 xl:grid-cols-4"
    >
      <div class="flex flex-col mt-5 relative">
        <label class="w-48 font-medium text-base mb-1">Телефон</label>
        <base-input v-model="number" :input-special="'phone'"></base-input>
        <p
          v-show="v$.number.$error"
          class="text-red-600 text-xs absolute top-16"
        >
          Обязательно поле!
        </p>
      </div>
      <div class="flex flex-col mt-5 xl:order-first relative">
        <label class="w-48 font-medium text-base mb-1">Имя*</label>
        <base-input v-model.trim="name"></base-input>
        <p v-show="v$.name.$error" class="text-red-600 text-xs absolute top-16">
          Обязательно поле!
        </p>
      </div>
      <div class="flex flex-col mt-5 relative">
        <label class="w-48 font-medium text-base mb-1">Email*</label>
        <base-input v-model.trim="email" :input-special="'email'"></base-input>
        <p
          v-show="v$.email.$error"
          class="text-red-600 text-xs absolute top-16"
        >
          Обязательно поле!
        </p>
      </div>
      <div class="flex flex-col mt-5 sm:col-span-2 xl:col-span-1">
        <label class="w-48 font-medium text-base mb-1">Город*</label>
        <select
          v-model="selected"
          class="w-80 border-2 border-gray-300 shadow-sm rounded-md px-3 py-1 text-gray-900 pr-4 h-10 sm:w-full xl:w-44 xl:pr-0 bg-white"
        >
          <option disabled value="">Выберите город</option>
          <option
            v-for="option in options"
            :key="option.id"
            :value="option.value"
          >
            {{ option.text }}
          </option>
        </select>
      </div>
      <base-button
        class="mt-5 p-0 sm:w-48 xl:w-44 sm:m-0 sm:self-end grid-last-elm"
        @click="sendInfo"
        btn-type="C"
        >Отправить</base-button
      >
    </div>
  </form>
</template>

<script>
import useValidate from '@vuelidate/core';
import { email, required, minLength } from '@vuelidate/validators';

export default {
  setup() {
    return {
      v$: useValidate(),
    };
  },
  props: {
    cities: {
      required: true,
      type: Array,
    },
    currentSelected: {
      required: false,
    },
    closeForm: {
      required: true,
      type: Function,
    },
  },
  emits: ['send-info'],
  data() {
    return {
      number: '',
      name: '',
      email: '',
      selected: '' || this.currentSelected,
      options: [
        { text: this.cities[0].name, value: this.cities[0].id },
        { text: this.cities[1].name, value: this.cities[1].id },
        { text: this.cities[2].name, value: this.cities[2].id },
      ],
    };
  },
  validations() {
    return {
      name: { required, $autoDirty: true },
      number: { required, $autoDirty: true, minLength: minLength(12) },
      email: { email, required, $autoDirty: true },
    };
  },
  methods: {
    sendInfo() {
      if (this.checkForm()) {
        this.$emit('send-info', {
          number: this.number,
          name: this.name,
          email: this.email,
          city: this.selected,
        });
        this.number = this.email = this.name = '';
        this.v$.$reset();

        this.closeForm();
      } else {
        this.v$.name.$touch();
        this.v$.number.$touch();
        this.v$.email.$touch();
      }
    },
    checkForm() {
      if (
        this.name.trim() &&
        this.number.length === 12 &&
        !this.v$.email.$error
      ) {
        return true;
      } else {
        false;
      }
    },
  },
};
</script>

<style scoped>
@media screen and (min-width: 650px) {
  .form {
    width: 669px;
  }
}
@media screen and (min-width: 1280px) {
  .form {
    width: 793px;
  }
  .grid-last-elm {
    grid-column: 4;
    grid-row: 2;
  }
}
</style>
