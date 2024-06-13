<script>
import ModalShowIssue from '../subcomponents/modals/ModalShowIssue.vue';
import ModalEditIssue from '../subcomponents/modals/ModalEditIssue.vue';

export default {
  data() {
    return {
      selectedIssue: null,
      isEditModalOpen: false,
      editSelectedIssue: null,
      responders: [],
    };
  },
  inject: ['backendServerAddress'],
  props: ['issues'],
  components: {
    ModalShowIssue,
    ModalEditIssue,
  },
  computed: {
    isLogged() {
      return localStorage.getItem('token')
        ? (this.isLoggedIn = true)
        : (this.isLoggedIn = false);
    },
  },
  methods: {
    // Recollendo os responsables
    async fetchResponders() {
      try {
        const response = await fetch(`${this.backendServerAddress}/responders`);
        const data = await response.json();
        this.responders = data;
      } catch (error) {
        this.$emit('error', error.message);
      }
    },
    // Abrir / Cerrar modal para ver información de cada incidencia
    toggleModal(issue) {
      this.selectedIssue = issue;
    },
    // Abrir modal edit incidencia
    openEditModal(issue) {
      this.editSelectedIssue = issue;
      this.isEditModalOpen = true;
    },
    // Cerrar modal edit incidencia
    closeEditModal() {
      this.isEditModalOpen = false;
      this.editSelectedIssue = null;
    },
    // Recoller o nome do Responsable polo seu id
    getRespondersName(id) {
      return this.responders.find((responder) => responder._id === id) || {};
    },
    // Función para eliminar incidencia, comprobando que estamos logueados co token correctamente.
    async deleteIssue(issueId) {
      const confirmed = confirm(
        '¿Estás seguro de que deseas eliminar esta incidencia?'
      );
      if (confirmed) {
        try {
          const token = localStorage.getItem('token'); // Obter o token de localStorage
          const response = await fetch(
            `${this.backendServerAddress}/issues/${issueId}`,
            {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`, // Incluir o token no encabezado Authorization
              },
            }
          );
          if (response.ok) {
            this.$emit('issue-deleted', issueId);
          } else {
            const data = await response.json();
            this.$emit('error', data.message);
          }
        } catch (error) {
          this.$emit('error', error.message);
        }
      }
    },
    // Recollendo icono dependendo do tipo de incidencia para mostrar
    getIconoIncidencia(issueType) {
      switch (issueType) {
        case 'Alcantarillado':
          return '/iconos/i_hole.png';
        case 'Alumeado público':
          return '/iconos/i_light.png';
        case 'Limpeza Viaria':
          return '/iconos/i_dump.png';
        case 'Medio Ambiente':
          return '/iconos/i_env.png';
        case 'Medio Viario':
          return '/iconos/i_road.png';
        case 'Semáforos e sinais':
          return '/iconos/i_sign.png';
        case 'Parques e Xardíns':
          return '/iconos/i_park.png';
        case 'Outros':
          return '/iconos/i_unknown.png';
        default:
          return '/iconos/i_unknown.png';
      }
    },
    // Recollendo cor dependendo do estado da incidencia para mostrar
    getColorEstado(estado) {
      switch (estado) {
        case 'new':
          return '#ff6666';
        case 'accepted':
          return '#ff9933';
        case 'ongoing':
          return '#66cc66';
        case 'finished':
          return '#66a3ff';
        default:
          return '#3333ff';
      }
    },
    // Xestionamos cando fagamos unha actualización nunha incidencia
    handleIssueUpdated(updatedIssue) {
      this.$emit('issue-updated', updatedIssue);
    },
  },
  beforeMount() {
    this.fetchResponders();
  },
};
</script>

<template>
  <div class="container-fluid mt-0">
    <div class="row row-cols-1 row-cols-lg-2">
      <div
        v-for="issue in issues"
        :key="issue._id"
        class="col container-fluid d-flex flex-column"
      >
        <div class="row p-2 m-0 bg-light issueBox">
          <div class="col-9 clicker" @click="toggleModal(issue)">
            <div class="row">
              <div class="col icon">
                <h2 class="issueType">
                  <img
                    :src="getIconoIncidencia(issue.issueType)"
                    alt=""
                    width="50px"
                  />
                  {{ issue.issueType }}
                </h2>
              </div>
            </div>
            <div class="row mt-1">
              <p>{{ issue.address }}</p>
            </div>
            <div class="row mt-1">
              <p>{{ issue.description }}</p>
            </div>
          </div>
          <div
            class="col-3 status text-center container-fluid d-flex flex-column h-100 mt-0"
          >
            <div class="row">
              <span
                class="rounded-pill text-light"
                :style="{ backgroundColor: getColorEstado(issue.status) }"
                >{{ translatedStatus(issue.status) }}</span
              >
            </div>
            <div class="row">
              <p class="text-end mt-2 mb-0 fw-bold">
                {{ formatDate(issue.updateDate) }}
              </p>
            </div>
            <div class="row">
              <p class="text-end">{{ formatDate(issue.creationDate) }}</p>
            </div>
            <div class="row mt-auto">
              <div class="col">
                <button
                  v-if="isLogged"
                  class="btn btn-warning float-end ms-2 mt-2"
                  type="button"
                  @click="deleteIssue(issue._id)"
                >
                  <font-awesome-icon :icon="['fas', 'trash']" />
                </button>
                <button
                  v-if="issue.status !== 'finished' && isLogged"
                  class="btn btn-primary float-end mt-2"
                  type="button"
                  @click="openEditModal(issue)"
                >
                  <font-awesome-icon :icon="['fas', 'forward']" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Teleport to="body">
      <ModalEditIssue
        v-if="isEditModalOpen"
        :issue="editSelectedIssue"
        @issue-updated="handleIssueUpdated"
        @modalClosed="closeEditModal"
      ></ModalEditIssue>
      <ModalShowIssue
        v-if="selectedIssue"
        :key="selectedIssue._id"
        :responders="responders"
        :getRespondersName="getRespondersName"
        :issue="selectedIssue"
        @modalClosed="selectedIssue = null"
      ></ModalShowIssue>
    </Teleport>
  </div>
</template>
<style scoped>
.container-fluid {
  margin-top: 20px;
}

.modal {
  display: block;
}

.modal-dialog {
  max-width: 800px;
  margin: 30px auto;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.clicker {
  cursor: pointer;
}

.issueBox {
  border: solid rgb(0, 0, 0, 0);
  border-radius: 15px;
}
.issueBox:hover {
  border: solid rgba(34, 22, 100, 1);
}
</style>
