<script>
import Header from '../subcomponents/Header.vue';
import MapSantiago from '../subcomponents/MapaSantiago.vue';

export default {
  //Injection de la variable global con la ruta del servidor del API REST backend
  inject: ['backendServerAddress'],
  components: {
    Header,
    MapSantiago,
  },
  data() {
    return {
      description: '',
      issueType: '',
      responder: '',
      coordinates: [], // Array para almacena-las coordenadas seleccionadas
      issueTypes: ['Bache', 'Accidente', 'Obstrucción', 'Otro'], // Lista de tipos de incidencias
      responders: [], // Array para almacena-los responsables obtidos dende o servidor
    };
  },
  props: {
    temporaryMarker: String,
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
          responder: this.responder,
        };
        console.log(typeof this.responder);
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
          console.log('Nova incidencia creada exitosamente.');
          // Aquí puedes manejar cualquier lógica adicional después de crear el issue
        } else {
          console.error(
            'Error ao crear a nova incidencia:',
            response.statusText
          );
          // Aquí puedes manejar el caso en el que la solicitud no sea exitosa
        }
      } catch (error) {
        console.error('Error ao crear a nova incidencia:', error);
      }
    },
  },
};
</script>

<template>
  <div>
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
      <div>
        <label for="responder">Responder:</label>
        <select id="responder" v-model="responder" required>
          <option value="" disabled>Seleccionar responder</option>
          <option
            v-for="responder in responders"
            :key="responder._id"
            :value="responder._id"
          >
            {{ responder.name }}
          </option>
        </select>
      </div>
      <button type="submit">Crear Incidencia</button>
    </form>
  </div>
</template>

<style></style>
