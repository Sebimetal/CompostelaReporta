<script>
export default {
  data() {
    return {};
  },
  // Declaramos as props que recollemos dende o compoñente pai
  props: {
    codigoUsuario: String,
    issue: Object,
    getRespondersName: Function,
    responders: Object,
  },
  computed: {
    // Computed para recupera-las incidencias en orde contrario para mostrar primeiro as de fecha máis actual
    reversedUpdates() {
      return this.issue ? [...this.issue.updates].reverse() : [];
    },
  },
  methods: {
    // Xestionamos cerre do modal enviando un emit ao compoñente pai
    closeModal() {
      this.$emit('modalClosed', true);
    },
    // Asignamos icono á ventana dependendo do tipo de incidencia
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
    // Asignamos color ao estado dependendo do estado
    getColorEstado(estado) {
      switch (estado) {
        case 'new':
          return '#ff3333';
        case 'accepted':
          return '#ff9933';
        case 'ongoing':
          return '#33bb33';
        case 'finished':
          return '#3399ff';
        default:
          return '#3333ff';
      }
    },
  },
};
</script>

<template>
  <div
    class="modal fade show"
    tabindex="-1"
    style="display: block"
    aria-modal="true"
    role="dialog"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <div class="col d-flex justify-content-between align-items-center">
            <!-- Na cabeceira incluimos o icono mais o tipo de estado cos seus estilos -->
            <div class="modal-title fs-5">
              <img
                :src="getIconoIncidencia(issue.issueType)"
                alt=""
                width="50px"
              />
              {{ issue.issueType }}
            </div>
            <div class="modal-title fs-5">
              <span
                class="rounded-pill text-light p-2"
                :style="{ backgroundColor: getColorEstado(issue.status) }"
                >{{ translatedStatus(issue.status) }}</span
              >
            </div>
          </div>
          <!-- Botón para cerra-la modal -->
          <button
            type="button"
            class="btn-close ms-2"
            @click="closeModal"
            aria-label="Close"
          ></button>
        </div>
        <!-- Body do modal onde listamos a información da incidencia -->
        <div class="modal-body">
          <div class="row mb-3">
            <div v-if="codigoUsuario" class="col-3">Usuario:</div>
            <div class="col-9">{{ codigoUsuario }}</div>
          </div>
          <div v-if="issue">
            <div class="row mb-2" v-if="issue.location">
              <div class="col-3">Dirección:</div>
              <div class="col-9">
                <div class="row">
                  <div class="col">
                    {{ issue.address }}
                  </div>
                  <div class="row">
                    <div class="col">
                      {{ issue.location.coordinates[0] }},
                      {{ issue.location.coordinates[1] }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row mb-2">
              <div class="col-3">Descripción:</div>
              <div class="col-9">{{ issue.description }}</div>
            </div>
            <div class="row mb-2">
              <div class="col-3">Actualización:</div>
              <div class="col-9">{{ formatDate(issue.updateDate) }}</div>
            </div>
            <div class="row mb-2">
              <div class="col-3">Creación:</div>
              <div class="col-9">{{ formatDate(issue.creationDate) }}</div>
            </div>
            <div class="row mb-2" v-if="issue.priority">
              <div class="col-3">Prioridade:</div>
              <div class="col-9">{{ translatedPriority(issue.priority) }}</div>
            </div>
            <div class="row mb-2" v-if="issue.responder">
              <div class="col-3">Responsable:</div>
              <div class="col-9">
                {{ getRespondersName(issue.responder).name }}
              </div>
            </div>
            <div class="row mb-2" v-if="issue.parentIssue">
              <div class="col-3">Prioridade:</div>
              <div class="col-9">{{ issue.parentIssue }}</div>
            </div>
            <div v-if="issue.updates.length" class="mt-3">
              <p class="actualizaciones-title">Actualizacions:</p>
              <ul class="list-group actualizaciones-list">
                <li
                  class="list-group-item actualizacion-item"
                  v-for="update in reversedUpdates"
                  :key="update._id"
                >
                  <span class="actualizacion-desc">{{
                    formatDate(update.date)
                  }}</span>
                  <span class="actualizacion-date">{{
                    update.description
                  }}</span>
                  <span
                    class="rounded-pill text-light p-1"
                    :style="{
                      backgroundColor: getColorEstado(update.newStatus),
                    }"
                    >{{ translatedStatus(update.newStatus) }}</span
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.actualizaciones-title {
  font-weight: bold;
  font-size: 1.2em;
  margin-bottom: 10px;
}

.actualizaciones-list {
  list-style-type: none;
  padding-left: 0;
}

.actualizacion-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin-bottom: 5px;
  border-radius: 5px;
  background-color: #f8f9fa; /* Color de fondo para cada elemento */
}

.actualizacion-desc {
  font-weight: normal;
  flex: 1;
}

.actualizacion-date {
  font-size: 0.9em;
  color: #6c757d; /* Color del texto de la fecha */
  flex: 2;
}
</style>
