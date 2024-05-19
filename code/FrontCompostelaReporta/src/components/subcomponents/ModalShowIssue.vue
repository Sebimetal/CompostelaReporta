<script>
export default {
  data() {
    return {};
  },
  props: {
    codigoUsuario: String,
    issue: Object,
  },
  methods: {
    closeModal() {
      this.$emit('modalClosed', true);
    },
  },
};
</script>
<template>
  <div class="modalIncidencia">
    <div class="modal-contentIncidencia">
      <span class="close" @click="closeModal">&times;</span>
      <p v-if="codigoUsuario">Código do usuario: {{ codigoUsuario }}</p>
      <div v-if="issue">
        <p>Descripción: {{ issue.description }}</p>
        <p>Tipo de incidencia: {{ issue.issueType }}</p>
        <p v-if="issue.location">
          Coordenadas: {{ issue.location.coordinates }}
        </p>
        <p>Dirección: {{ issue.address }}</p>
        <p v-if="issue.estado">Estado: {{ issue.status }}</p>
        <p>Data de creación: {{ issue.creationDate }}</p>
        <p>Data de última actualización: {{ issue.updateDate }}</p>
        <p v-if="issue.priority">Prioridad: {{ issue.priority }}</p>
        <p v-if="issue.responder">Responsable: {{ issue.responder }}</p>
        <p v-if="issue.parentIssue">
          Incidencia relacionada: {{ issue.parentIssue }}
        </p>
        <div v-if="issue.updates.length">
          <p>Actualizaciones:</p>
          <ul>
            <li v-for="update in issue.updates" :key="update._id">
              {{ update.content }} - {{ update.date }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.display {
  display: none; /* Por defecto, a modal está oculta */
}
.modalIncidencia {
  position: fixed;
  z-index: 1000; /* Facer que a modal esté por encima de outros elementos */
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
}

/* Estilos para el contenido de la modal */
.modal-contentIncidencia {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

/* Estilos para el botón de cerrar la modal */
.close {
  color: #aaaaaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}
</style>
