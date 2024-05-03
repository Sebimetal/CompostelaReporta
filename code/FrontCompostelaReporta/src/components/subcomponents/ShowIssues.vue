<script>
export default {
  data() {
    return {
      isLoading: false,
      error: null,
      responders: {},
    };
  },
  // Inxección da variable da ruta do APIREST
  inject: ['backendServerAddress'],
  props: ['issues'],
  methods: {
    async fetchResponders() {
      try {
        const response = await fetch(`${this.backendServerAddress}/responders`);
        const data = await response.json();
        this.responders = data;
      } catch (error) {
        this.error = error.message;
      }
    },
    getRespondersName(id) {
      const responder = this.responders.find(
        (responder) => responder.id === id
      );
      return responder;
    },
  },
  beforeMount() {
    this.fetchResponders();
  },
};
</script>

<template>
  <div class="container-fluid">
    <div v-if="isLoading" class="text-center mt-5">Cargando incidencias...</div>
    <div v-else>
      <div v-if="error" class="alert alert-danger mt-5">{{ error }}</div>
      <div v-else>
        <div v-for="issue in issues" :key="issue._id" class="card mt-3">
          <div class="card-body">
            <h5 class="card-title">{{ issue.issueType }}</h5>
            <p class="card-text">Estado: {{ issue.status }}</p>
            <p class="card-text">Fecha de creación: {{ issue.creationDate }}</p>
            <p class="card-text">
              Coordenadas:
              {{
                issue.location.coordinates[0] +
                ', ' +
                issue.location.coordinates[1]
              }}
            </p>
            <p class="card-text" v-if="issue.responder">
              Responsable: {{ getRespondersName().name }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
