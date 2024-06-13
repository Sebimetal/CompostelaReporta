<template>
  <div class="modalEditIssue">
    <div class="modal-contentEditIssue">
      <span class="close" @click="closeModal">&times;</span>
      <h2>
        Actualizando estado da incidencia a
        <span
          class="rounded-pill text-light ps-2 pe-2"
          :style="{
            backgroundColor: getColorEstado(translatedNextStatus(issue.status)),
          }"
        >
          {{ translatedNextStatus(issue.status) }}
        </span>
      </h2>

      <form @submit.prevent="saveChanges">
        <div class="form-group row mt-4 mb-3">
          <div class="col-3 me-2 me-sm-0">
            <label for="priority" class="form-label">Prioridad:</label>
          </div>
          <div class="col-8 ms-2 ms-sm-0">
            <select id="priority" v-model="priority" class="form-select">
              <option value="1">Baixa</option>
              <option value="2">Media</option>
              <option value="3">Alta</option>
            </select>
          </div>
        </div>

        <div class="form-group row mb-3">
          <div class="col-3 me-2 me-sm-0">
            <label for="description" class="form-label">Descrición:</label>
          </div>
          <div class="col-8 ms-2 ms-sm-0">
            <textarea
              type="text"
              id="description"
              v-model="updatesDescription"
              class="form-control"
            ></textarea>
          </div>
        </div>
        <div class="form-group row mb-3">
          <div class="col-3 me-2 me-sm-0">
            <label for="parentIssue" class="form-label"
              >Incidencia relacionada:</label
            >
          </div>
          <div class="col-8 ms-2 ms-sm-0">
            <input
              type="text"
              id="parentIssue"
              v-model="parentIssue"
              class="form-control"
            />
          </div>
        </div>
        <div class="col d-flex justify-content-end">
          <button type="submit" class="btn btn-secondary">
            <font-awesome-icon :icon="['fas', 'square-check']" class="fa-2x" />
          </button>
        </div>
      </form>
      <div v-if="error" class="alert alert-danger">{{ error }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      priority: '1', // Valor inicial da prioridade (Baixa)
      parentIssue: '', // Variable para asignar incidencia que coa que esté a incidencia que estamos a editar
      updatesDescription: '', // Descrición da actualización
      error: null, // Manexo de erros
    };
  },

  // Declaración dos props que vamos a recoller
  props: {
    issue: Object,
  },
  // Inxectamos a variable coa ruta do backend
  inject: ['backendServerAddress'],
  methods: {
    // Emisión ao elemento pai Issues para que reciba confirmación cando cerramos a modal
    closeModal() {
      this.$emit('modalClosed');
    },
    // Método para gardar as actualizacións da nosa incidencia
    async saveChanges() {
      try {
        const token = localStorage.getItem('token'); // Obter o token de localStorage
        const editedIssue = {
          issueId: this.issue._id,
          priority: parseInt(this.priority),
          parentIssue: this.parentIssue,
          description: this.updatesDescription,
          issueType: this.issue.issueType,
        };

        const response = await fetch(
          `${this.backendServerAddress}/issues/assignUpdate`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`, // Incluir o token no encabezado Authorization
            },
            body: JSON.stringify(editedIssue),
          }
        );

        if (response.ok) {
          const updatedIssue = await response.json();
          this.$emit('issue-updated', updatedIssue);
          this.closeModal();
        } else {
          const data = await response.json();
          this.error = data.message;
        }
      } catch (error) {
        this.error = error.message;
      }
    },
    // Para asignar o estilo de background dependendo do estado da incidencia
    getColorEstado(estado) {
      switch (estado) {
        case 'aceptado':
          return '#ff9933';
        case 'en proceso':
          return '#33bb33';
        case 'rematado':
          return '#3399ff';
        default:
          return '#3333ff';
      }
    },
  },
};
</script>

<style scoped>
/* Estilos para a ventana modal */
.modalEditIssue {
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
}

/* Estilos para o contido da ventana modal */
.modal-contentEditIssue {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  border-radius: 15px;
}

/* Estilos para el botón de cerrar la ventana modal */
.close {
  color: #aaaaaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

/** Estilos Hover para a X de cerrar */
.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}
/** Quitamos a pestaña para redimensionar o textarea */
textarea {
  resize: none;
}
</style>
