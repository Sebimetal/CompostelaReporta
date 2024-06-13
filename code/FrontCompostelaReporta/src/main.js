/**
 * Punto de inicio da nosa aplicación
 * Aquí facemo-los imports ás principales dependencias e funcionalidades que van ser
 * utilizadas en tódo o noso proxecto
 */
import { createApp } from 'vue';
import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import router from './router';
import { globalMixin } from './mixins/mixins';
import './assets/styles/custom.scss';

// Importa FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faCirclePlus,
  faMagnifyingGlass,
  faList,
  faTrash,
  faCaretDown,
  faCaretUp,
  faFilter,
  faRightFromBracket,
  faRightToBracket,
  faForward,
  faEraser,
  faSquareCheck,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons';
import {
  faSmile,
  faMap,
  faFloppyDisk,
} from '@fortawesome/free-regular-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Importar iconos de Leaflet
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const app = createApp(App);
app.use(router);

// Engadindo os iconos de font awesome á librería
library.add(
  faCirclePlus,
  faSmile,
  faTwitter,
  faMagnifyingGlass,
  faMap,
  faList,
  faTrash,
  faCaretDown,
  faCaretUp,
  faFilter,
  faRightFromBracket,
  faRightToBracket,
  faForward,
  faEraser,
  faFloppyDisk,
  faSquareCheck,
  faLocationDot
);

app.component('font-awesome-icon', FontAwesomeIcon);

// Funcións para que esté accesible en tódolos compoñentes
app.mixin(globalMixin);

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
