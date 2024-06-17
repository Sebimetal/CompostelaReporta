<script>
import Header from '../subcomponents/Header.vue';
import MapSantiago from '../subcomponents/MapaSantiago.vue';
import ModalShowIssue from '../subcomponents/modals/ModalShowIssue.vue';

export default {
  // Inxectamos a variable da ruta do backend
  inject: ['backendServerAddress'],
  components: {
    Header,
    MapSantiago,
    ModalShowIssue,
  },
  data() {
    return {
      description: '',
      issueType: '',
      responder: '',
      coordinates: [], // Array para almacenar las coordenadas seleccionadas;
      issueTypes: [
        'Alcantarillado',
        'Alumeado público',
        'Limpeza Viaria',
        'Medio Ambiente',
        'Medio Viario',
        'Semáforos e sinais',
        'Parques e Xardíns',
        'Outros',
      ], // Tipos de incidencias
      responders: [],
      userHash: '',
      modalClosed: true,
      issue: null,
      showAlert: false,
    };
  },
  // Recollemo-las props temporaryMarker e componentStatus
  props: {
    temporaryMarker: String,
    componentStatus: String,
  },
  mounted() {
    this.fetchResponders();
  },
  methods: {
    // Recollendo o listado dos responsables da BBDD
    async fetchResponders() {
      try {
        const response = await fetch(`${this.backendServerAddress}/responders`);
        const data = await response.json();
        this.responders = data;
      } catch (error) {
        console.error('Error al obtener la lista de responsables:', error);
      }
    },
    // Recollendo as coordenadas, método chamado cando facemos emit dende compoñente mapa Santiago
    retrieveCoordinates(coordinates) {
      this.coordinates = coordinates;
    },
    // Cerramos o alert
    closeAlert() {
      this.showAlert = false;
    },
    //Método para crear incidencia na base de datos
    async createIssue() {
       if (!this.coordinates || this.coordinates.length === 0) {
        console.error('Error: Las coordenadas no pueden estar vacías');
        this.showAlert = true;
        return;
      }
      try {
        const issueData = {
          description: this.description,
          location: {
            type: 'Point',
            coordinates: this.coordinates,
          },
          issueType: this.issueType,
        };
        const response = await fetch(
          `${this.backendServerAddress}/issues/new`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(issueData),
          }
        );

        if (response.ok) {
          const responseData = await response.json();
          this.userHash = responseData.reporterHash;
          this.issue = responseData;
          this.modalClosed = false;
        } else {
          console.error(
            'Error al crear la nueva incidencia:',
            response.statusText
          );
        }
      } catch (error) {
        console.error('Error al crear la nueva incidencia:', error);
      }
    },
  },
};
</script>

<template>
  <!-- Mandamos props :CreateIssueComponent para activar as funcionalidades para creación de incidencias no mapa 
    e :initialCoordinates por se temos coordenadas xa seleccionadas-->
  <!-- Mostrar mensaxe alerta se non hai coordenadas seleccionadas -->
  <div v-if="showAlert" class="alert alert-danger alert-dismissible fade show" role="alert">
    Por favor, seleccione unha ubicación no mapa.
    <button type="button" class="btn-close" @click="closeAlert" aria-label="Close"></button>
  </div>
  <MapSantiago
    @coordinates-selected="retrieveCoordinates"
    :CreateIssueComponent="true"
    :initialCoordinates="coordinates"
  />
  <div class="col col-sm-12 mt-5 bg-light p-5 m-auto">
    <form @submit.prevent="createIssue" class="form-floating">
      <div class="form-row mb-3">
        <label for="issueType" class="form-label">Tipo de incidencia:</label>

        <select id="issueType" v-model="issueType" required class="form-select">
          <option value="" disabled>Seleccionar tipo de incidencia</option>
          <option v-for="type in issueTypes" :key="type">
            {{ type }}
          </option>
        </select>
      </div>
      <div class="form-row mb-3">
        <label for="description" class="form-label">Descripción:</label>
        <textarea
          type="text"
          id="description"
          v-model="description"
          required
          class="form-control"
        ></textarea>
      </div>
      <div class="position-fixed bottom-0 end-0 m-5 button">
        <button type="submit" class="btn btn-primary add-issue">
          <font-awesome-icon :icon="['fas', 'circle-plus']" class="fa-2x" />
        </button>
      </div>
    </form>
  </div>
  <Teleport to="body">
    <!-- Modal para mostrar datos da incidencia unha vez creada a incidencia -->
    <ModalShowIssue
      :codigoUsuario="userHash"
      v-if="issue"
      :key="issue._id"
      :issue="issue"
      @modalClosed="issue = null"
    ></ModalShowIssue>
  </Teleport>
</template>

<style scoped>
.button {
  cursor: pointer;
  z-index: 1000000000;
}
.add-issue {
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}
textarea {
  resize: none;
}
</style>
