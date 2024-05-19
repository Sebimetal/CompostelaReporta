import { createApp } from 'vue';
import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';

// Importar iconos de Leaflet
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const app = createApp(App);

// Configuración de iconos de Leaflet para que se mostren ao despregarse a aplicación.
delete Icon.Default.prototype._getIconUrl;

Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Para poder usar a variable de forma global facemos provide e despois inject no compoñente que necesitemos usalo
// Local
// app.provide('backendServerAddress', 'http://localhost:3001');

// Deployed in Render.com
app.provide('backendServerAddress', 'https://compostelareporta.onrender.com');

app.mount('#app');
