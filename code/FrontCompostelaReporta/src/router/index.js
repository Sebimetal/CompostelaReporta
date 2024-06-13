// Punto de inicio da nosa aplicación

import { createRouter, createWebHistory } from 'vue-router';
import Mainpage from '../components/fullpage/Mainpage.vue';
import CreateIssue from '../components/fullpage/CreateIssue.vue';
import Issues from '../components/fullpage/Issues.vue';

// Creamo-las rutas para os compoñentes coa dependencia vue-router
const routes = [
  { path: '/Mainpage', component: Mainpage },
  { path: '/CreateIssue', component: CreateIssue },
  { path: '/', component: Issues },
  { path: '/:catchAll(.*)', redirect: '/' }, // Redirecciona a la página de inicio
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
