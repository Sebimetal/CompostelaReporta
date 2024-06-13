<script>
/**
 *  Compoñente inicial da nosa aplicación. Compoñentes Header e BotonEngadir serán comúns a tódolos compoñentes
 */
import Header from './components/subcomponents/Header.vue';
import BotonEngadir from './components/subcomponents/BotonEngadir.vue';

export default {
  data() {
    return {
      selectedComponent: 'Issues',
      successMessage: '',
      isLoggedIn: false,
    };
  },
  components: {
    Header,
    BotonEngadir,
  },
  provide() {
    return {
      selectedComponent: this.selectedComponent,
    };
  },
  methods: {
    changeComponent(component) {
      this.selectedComponent = component;
    },
    handleSuccessMessage(message) {
      this.successMessage = message;
      this.isLoggedIn = false;
      this.updateKey();
    },
    dismissAlert() {
      this.successMessage = '';
    },
    loggedIn() {
      this.isLoggedIn = true;
    },
  },
};
</script>

<template>
  <Header
    @logoutSuccess="handleSuccessMessage"
    @loginSuccess="loggedIn"
    @componentChange="changeComponent"
  ></Header>
  <RouterView></RouterView>
  <BotonEngadir
    v-if="this.selectedComponent != '/CreateIssue'"
    @componentChange="changeComponent"
  ></BotonEngadir>
  <div
    v-if="successMessage"
    class="alert alert-success alert-dismissible fixed-top mt-3 w-80"
    role="alert"
  >
    {{ successMessage }}
    <button
      type="button"
      class="btn-close"
      aria-label="Close"
      @click="dismissAlert"
    ></button>
  </div>
</template>

<style></style>
