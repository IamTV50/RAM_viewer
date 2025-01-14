import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import Lara from '@primevue/themes/lara';

const app = createApp(App);

app.use(router);
app.use(PrimeVue, {
    ripple: true,
    theme: { preset: Lara }
});

app.mount('#app');
