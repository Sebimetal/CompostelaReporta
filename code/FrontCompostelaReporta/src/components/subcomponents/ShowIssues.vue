<script>
import ModalShowIssue from '../subcomponents/ModalShowIssue.vue';
export default {
  data() {
    return {
      isLoading: false,
      error: null,
      responders: {},
      modalClosed: true,
    };
  },
  // Inxección da variable da ruta do APIREST
  inject: ['backendServerAddress'],
  props: ['issues'],
  components: {
    ModalShowIssue,
  },
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
    switchComponent(newComponent) {
      this.$emit('componentChange', newComponent);
    },
    // Mostrar y cerrar ventana modal
    toggleModal(issue) {
      issue.modalClosed = !issue.modalClosed;
    },
    getRespondersName(id) {
      const responder = this.responders.find(
        (responder) => responder.id === id
      );
      return responder;
    },
    async deleteIssue(issueId) {
      const confirmed = confirm(
        '¿Estás seguro de que desexas eliminar esta incidencia?'
      );
      if (confirmed) {
        try {
          const response = await fetch(
            `${this.backendServerAddress}/issues/${issueId}`,
            {
              method: 'DELETE',
            }
          );
          if (response.ok) {
            this.$emit('issue-deleted', issueId);
          } else {
            const data = await response.json();
            this.error = data.message;
          }
        } catch (error) {
          this.error = error.message;
        }
      }
    },
  },
  beforeMount() {
    try {
      this.fetchResponders();
      this.issues.forEach((issue) => {
        this.$set(issue, 'modalClosed', true);
      });
    } catch (error) {
      this.error = error.message;
    }
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
            <p class="card-text">
              Fecha de creación: {{ issue.creationDate.substring(10, -1) }}
            </p>
            <p class="card-text">Dirección: {{ issue.address }}</p>
            <p class="card-text" v-if="issue.responder">
              Responsable: {{ getRespondersName(issue.responder).name }}
            </p>
          </div>
          <div class="col">
            <button
              class="btn btn-primary"
              type="button"
              @click="toggleModal(issue)"
            >
              Ver
            </button>
            <button
              class="btn btn-warning"
              type="button"
              @click="deleteIssue(issue._id)"
            >
              Eliminar
            </button>
            <button
              class="btn btn-secondary"
              type="button"
              componentStatus="edit"
              @click="switchComponent('CreateIssue')"
            >
              Editar
            </button>
          </div>
          <ModalShowIssue
            :class="{ display: !issue.modalClosed }"
            :issue="issue"
            @modalClosed="toggleModal(issue)"
          ></ModalShowIssue>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
