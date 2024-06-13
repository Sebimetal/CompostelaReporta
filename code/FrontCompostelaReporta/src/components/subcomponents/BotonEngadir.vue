<script>
export default {
  data() {
    return {
      isLoggedIn: false,
    };
  },
  // Declaramos os emits
  emits: ['componentChange'],
  methods: {
    // Cambiamos ao compoñente CreateIssue
    switchComponent(newComponent) {
      this.$emit('componentChange', newComponent);
      this.$router.push(newComponent);
    },
  },
};
</script>
<template>
  <!-- Botón que se mostrará en toda a aplicación menos cando estemos no propio compoñente CreateIssue -->
  <div class="position-fixed bottom-0 end-0 m-5 button">
    <button
      @click="switchComponent('/CreateIssue')"
      class="btn btn-primary add-issue"
    >
      <font-awesome-icon :icon="['fas', 'circle-plus']" class="fa-2x" />
    </button>
  </div>
</template>
<style scoped>
.button {
  cursor: pointer;
  z-index: 100000000;
}
.add-issue {
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
