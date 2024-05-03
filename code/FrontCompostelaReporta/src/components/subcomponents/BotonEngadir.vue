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
  <div class="d-flex flex-column fixed-bottom align-items-end m-2">
    <button
      @click="switchComponent('CreateIssue')"
      class="btn btn-primary add-incidence"
    >
      Engadir Incidencia
    </button>
  </div>
</template>
<style scoped>
.pointer {
  cursor: pointer;
}
</style>
