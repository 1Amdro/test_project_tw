import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
  state() {
    return {
      cities: [
        {
          id: 1,
          name: 'Москва',
        },
        {
          id: 2,
          name: 'Санкт-Петербург',
        },
        {
          id: 3,
          name: 'Казань',
        },
      ],
      message: '',
    };
  },
  mutations: {
    changeMessage(state, overload) {
      const data = overload.data || overload;
      state.message = data;
    },
  },
  actions: {
    sendData(context, overload) {
      const name = overload.name;
      const phone = overload.number;
      const email = overload.email;
      const city_id = overload.city;
      axios
        .post('http://hh.autodrive-agency.ru/test-tasks/front/task-7/', {
          name,
          phone,
          email,
          city_id,
        })
        .then(response => {
          context.dispatch('changeMessage', response);
        })
        .catch(err => {
          context.dispatch('changeMessage', 'error');
          console.log(err);
        });
    },
    changeMessage(context, overload) {
      context.commit('changeMessage', overload);
    },
  },
});

export default store;
