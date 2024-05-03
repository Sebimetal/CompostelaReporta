<script>
export default {
  data() {
    return {
      isLoggedIn: false,
    };
  },
  methods: {
    toggleLogin() {
      this.isLoggedIn = !this.isLoggedIn;
    },
  },
  methods: {
    switchComponent(newComponent) {
      this.$emit('componentChange', newComponent);
    },
  },
};
</script>
<template>
  <header class="main-header navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <div class="navbar-nav mr-auto">
        <a class="nav-link">Incidencias</a>
      </div>
      <a @click="switchComponent('Mainpage')" class="navbar-brand pointer"
        >Compostela Reporta</a
      >
      <div class="navbar-nav ml-auto">
        <button @click="toggleLogin" class="btn btn-primary">
          {{ isLoggedIn ? 'Logout' : 'Login' }}
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.pointer {
  cursor: pointer;
}
</style>
