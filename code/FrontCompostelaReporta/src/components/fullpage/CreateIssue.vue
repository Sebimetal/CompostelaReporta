<script>
import Header from '../subcomponents/Header.vue';
import MapSantiago from '../subcomponents/MapaSantiago.vue';
import ModalShowIssue from '../subcomponents/ModalShowIssue.vue';

export default {
  //Injection de la variable global con la ruta del servidor del API REST backend
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
      coordinates: [], // Array para almacena-las coordenadas seleccionadimport ModalShowIssue from '../subcomponents/ModalShowIssue.vue';
      issueTypes: [
        'Alcantarillado',
        'Alumeado público',
        'Limpeza Viaria',
        'Medio Ambiente',
        'Medio Viario',
        'Semáforos e sinais',
        'Parques e Xardíns',
        'Outros',
      ], // Lista de tipos de incidencias
      responders: [], // Array para almacena-los responsables obtidos dende o servidor
      userHash: '',
      modalClosed: true,
      issue: null,
    };
  },
  props: {
    temporaryMarker: String,
    componentStatus: String,
  },
  mounted() {
    // Obter a lista de responsables ao montar o compoñente
    this.fetchResponders();
  },
  methods: {
    // Método para obter a lista de responsables dende o servidor
    async fetchResponders() {
      try {
        const response = await fetch(`${this.backendServerAddress}/responders`);
        const data = await response.json();
        this.responders = data;
      } catch (error) {
        console.error('Error ao obter a lista de responsables:', error);
      }
    },
    retrieveCoordinates(coordinates) {
      /**  Función para recoller as coordenadas cando clickamos no compoñente mapa.
      No compoñente mapa executase a función getCoordinatesFromMap e emite as coordenadas ao elemento pai*/
      console.log('Coordenadas seleccionadas:', coordinates);
      this.coordinates = coordinates;
    },
    // Método para crear un nuevo issue
    async createIssue() {
      try {
        const issueData = {
          description: this.description,
          location: {
            type: 'Point',
            coordinates: this.coordinates,
          },
          issueType: this.issueType,
        };
        console.log(issueData);
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
            'Error ao crear a nova incidencia:',
            response.statusText
          );
        }
      } catch (error) {
        console.error('Error ao crear a nova incidencia:', error);
      }
    },
  },
};
</script>

<template>
  <div id="formCreateAndEdit">
    <!-- Manadamos unha prop boolean CreateIssueComponent para validar as funcions do mapa que queremos que sexan accesibles desde este compoñente pai -->
    <MapSantiago
      @coordinates-selected="retrieveCoordinates"
      :CreateIssueComponent="true"
    />
    <form @submit.prevent="createIssue">
      <div>
        <label for="description">Descripción:</label>
        <input type="text" id="description" v-model="description" required />
      </div>
      <div>
        <label for="issueType">Tipo de incidencia:</label>
        <select id="issueType" v-model="issueType" required>
          <option value="" disabled>Seleccionar tipo de incidencia</option>
          <option v-for="type in issueTypes" :key="type">{{ type }}</option>
        </select>
      </div>
      <!-- No caso de que dende o compoñente pai digamos que o estado é edit, visualizaranse os seguintes elementos-->
      <div v-if="componentStatus === 'edit'">
        <!-- Mostrar campos adicionales solo si el estado es "Edit" -->
        <!-- Campo para el estado -->
        <div>
          <label for="status">Estado:</label>
          <select id="status" v-model="issue.status" required>
            <option value="new">Nuevo</option>
            <option value="in_progress">En progreso</option>
            <option value="resolved">Resuelto</option>
            <option value="closed">Cerrado</option>
          </select>
        </div>
        <!-- Campo para la prioridad -->
        <div>
          <label for="priority">Prioridad:</label>
          <select id="priority" v-model="issue.priority" required>
            <option value="1">Poca prioridad</option>
            <option value="2">Prioridad media</option>
            <option value="3">Alta prioridad</option>
          </select>
        </div>
        <!-- Campo para el responsable -->
        <div>
          <label for="responder">Responsable:</label>
          <select id="responder" v-model="issue.responder" required>
            <option value="" disabled>Seleccionar responsable</option>
            <option
              v-for="responder in responders"
              :key="responder._id"
              :value="responder._id"
            >
              {{ responder.name }}
            </option>
          </select>
        </div>
        <!-- Campo para la incidencia padre -->
        <div>
          <label for="parentIssue">Incidencia Padre:</label>
          <select id="parentIssue" v-model="issue.parentIssue" required>
            <option value="" disabled>Seleccionar incidencia padre</option>
            <option
              v-for="parentIssue in parentIssues"
              :key="parentIssue._id"
              :value="parentIssue._id"
            >
              {{ parentIssue.description }}
            </option>
          </select>
        </div>
      </div>
      <button type="submit">Engadir Incidencia</button>
    </form>
  </div>
  <Teleport to="body">
    <ModalShowIssue
      :class="{ display: modalClosed }"
      :codigoUsuario="userHash"
      :issue="issue"
      @modalClosed="modalClosed = $emit"
    ></ModalShowIssue>
  </Teleport>
</template>

<style></style>
