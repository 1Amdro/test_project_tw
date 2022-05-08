import { createApp } from 'vue';
import App from './App.vue';
import './index.css';
import BaseButton from './components/BaseButton.vue';
import BaseInput from './components/BaseInput.vue';

import store from './store/index';

const app = createApp(App);
app.component('base-button', BaseButton);
app.component('base-input', BaseInput);
app.use(store);
app.mount('#app');
