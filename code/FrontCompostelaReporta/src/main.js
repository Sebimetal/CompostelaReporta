import { createApp } from 'vue';
import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.min.css';

const app = createApp(App);

// Para poder usar a variable de forma global facemos provide e despois inject no compoñente que necesitemos usalo
app.provide('backendServerAddress', 'http://localhost:3001');

app.mount('#app');
