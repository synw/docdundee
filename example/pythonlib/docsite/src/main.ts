import { createApp } from 'vue'
import App from './App.vue'
import "vuepython/style.css";
import "@docdundee/vue/style.css";
import './assets/index.css';
import router from './router';

createApp(App).use(router).mount('#app')
