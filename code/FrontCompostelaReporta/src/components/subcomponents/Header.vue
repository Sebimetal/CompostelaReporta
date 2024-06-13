<script>
import ModalLogin from '../subcomponents/modals/ModalLogin.vue';
import { Tooltip } from 'bootstrap'; //

export default {
  data() {
    return {
      isLoggedIn: false,
      isModalOn: false,
      successMessage: '',
    };
  },
  components: {
    ModalLogin,
  },
  // Declaramos as emisións dende este compoñente a compoñente pai App
  emits: ['logoutSuccess', 'componentChange', 'loginSuccess'],
  methods: {
    // Abrir modal
    openModal() {
      this.isModalOn = true;
    },
    // Cerrar modal
    closeModal() {
      this.isModalOn = false;
    },
    // Cambiar compoñente
    switchComponent(newComponent) {
      this.$emit('componentChange', newComponent);
      this.$router.push(newComponent);
    },
    // Abrir modal
    logInButton() {
      this.isLoggedIn = true;
      this.$emit('loginSuccess');
    },
    // Eliminamo-los localStorage ao facer logout, cambiamos os booleano isLoggedIn para cambiar o botón
    // E emitimos o logoutSuccess co mensaxe para comunicar ao usuario que se fixo o logout correctamente.
    logOutButton() {
      localStorage.removeItem('token'); // Eliminamo-lo token
      localStorage.removeItem('user'); // Eliminamo-lo user
      this.isLoggedIn = false;
      this.$emit('logoutSuccess', `O usuario saiu da sesión correctamente`);
    },
    // Checkeamos se hai un token de localStorage para xestionar cando abrimos a aplicación
    checkIfLogged() {
      this.isLoggedIn = localStorage.getItem('token') != null;
      return this.isLogged;
    },
    // Tooltips para os botóns de login e logout
    updateTooltips() {
      const tooltipTriggerList = [].slice.call(
        document.querySelectorAll('[data-bs-toggle="tooltip"]')
      );
      tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new Tooltip(tooltipTriggerEl, { trigger: 'hover' });
      });
    },
  },
  // Checkeamos de primeiro se estamos xa logueados
  beforeMount() {
    this.checkIfLogged();
  },
  // Cargamos os tooltips
  mounted() {
    this.updateTooltips();
  },
};
</script>
<template>
  <header
    class="main-header navbar navbar-expand-lg navbar-light bg-light pt-3 pb-3 pe-sm-3"
  >
    <div class="container-fluid p-0 m-0">
      <div class="navbar-nav mr-auto">
        <div class="text-light ms-sm-4" style="width: 44px; height: 38px"></div>
      </div>
      <a
        @click="switchComponent('/')"
        class="navbar-brand pointer col-6 col-sm-4 col-lg-3"
      >
        <img class="img-fluid" src="/logoTextDarkBlue.png"
      /></a>
      <div class="navbar-nav ml-auto">
        <button
          v-if="!isLoggedIn"
          @click="openModal"
          class="btn btn-success"
          data-bs-toggle="tooltip"
          title="Iniciar sesión"
          data-bs-placement="left"
        >
          <font-awesome-icon
            :icon="['fas', 'right-to-bracket']"
            class="text-light"
          />
        </button>
        <button
          v-if="isLoggedIn"
          @click="logOutButton"
          class="btn btn-danger"
          data-bs-toggle="tooltip"
          title="Pechar sesión"
          data-bs-placement="left"
        >
          <font-awesome-icon
            :icon="['fas', 'right-from-bracket']"
            class="text-light"
          />
        </button>
      </div>
    </div>
  </header>
  <ModalLogin
    v-if="isModalOn"
    @close="closeModal"
    @logged="logInButton"
  ></ModalLogin>
</template>

<style scoped>
.pointer {
  cursor: pointer;
}
.navbar-brand {
  border: solid rgb(0, 0, 0, 0);
}
.navbar-brand:hover {
  border-radius: 15px;
  border: solid rgb(0, 0, 255, 0.1);
}
</style>
