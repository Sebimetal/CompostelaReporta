<template>
  <div>
    <p v-if="error" class="error-message">{{ error }}</p>
    <!-- Mostramos botón mapa ou lista dependendo de se temos o mapa visible ou non -->
    <button
      @click="toggleComponent"
      class="btn btn-primary position-absolute top-0 mt-3 ms-sm-4"
    >
      <template v-if="isMapSantiagoVisible">
        <font-awesome-icon :icon="['fas', 'list']" />
      </template>
      <template v-else>
        <font-awesome-icon :icon="['far', 'map']" />
      </template>
    </button>

    <div class="container-fluid">
      <!-- Filtros, botón para desplegar e compoñente co formulario e as funcións -->
      <button class="btn btn-secondary mt-2" @click="toggleFilters">
        <font-awesome-icon :icon="['fas', 'filter']" /> Filtros
        <template v-if="!showFilters">
          <font-awesome-icon :icon="['fas', 'caret-down']" />
        </template>
        <template v-else>
          <font-awesome-icon :icon="['fas', 'caret-up']" />
        </template>
      </button>
      <div class="row">
        <div
          v-if="showFilters"
          class="filters m-auto mt-2 p-3 border border-primary rounded row justify-content-around"
        >
          <div class="col-12">
            <!-- Reemplazar los tres componentes de filtro con el componente unificado -->
            <UnifiedFilter
              :backendServerAddress="backendServerAddress"
              :issueTypes="issueTypes"
              @issuesFetched="updateIssues"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- Compoñente para mostrar as incidencias, mandamos como props as 
      incidencias e booleano de se estamos logueados para activar/desactivar botóns para o administrador -->
    <ShowIssues
      v-show="!isMapSantiagoVisible"
      :issues="issues"
      :isLoggedIn="isLoggedIn"
      @componentChange="switchComponent"
      @issue-deleted="handleIssueDeleted"
      @issue-updated="handleIssueUpdated"
    ></ShowIssues>
    <MapSantiago
      class="mt-2"
      v-if="isMapSantiagoVisible"
      :issues="issues"
      :isLoggedIn="isLoggedIn"
    ></MapSantiago>
    <!-- <div class="container-fluid">
     <div v-if="isMapSantiagoVisible" class="col text-center">
        <img src="/logo.png" alt="logoCompostelaReporta" class="img-fluid" />
      </div>
    </div> -->
  </div>
</template>

<script>
import MapSantiago from '../subcomponents/MapaSantiago.vue';
import ShowIssues from '../subcomponents/ShowIssues.vue';
// Importa el componente unificado
import UnifiedFilter from '../subcomponents/issuesFilters/UnifiedFilter.vue';

export default {
  inject: ['backendServerAddress'],
  props: {
    isLoggedIn: Boolean,
  },
  data() {
    return {
      issues: [],
      isLoading: false,
      error: null,
      isMapSantiagoVisible: true,
      issueTypes: [
        'Alcantarillado',
        'Alumeado público',
        'Limpeza Viaria',
        'Medio Ambiente',
        'Medio Viario',
        'Semáforos e sinais',
        'Parques e Xardíns',
        'Outros',
      ],
      showFilters: false,
    };
  },
  components: {
    MapSantiago,
    ShowIssues,
    UnifiedFilter,
  },
  mounted() {
    // Recollemos as incidencias tan pronto como montamos o compoñente
    this.fetchIssues();
  },
  methods: {
    // Método para recoller tódalas incidencias
    async fetchIssues() {
      this.isLoading = true;
      try {
        const response = await fetch(`${this.backendServerAddress}/issues`);
        this.issues = await response.json();
      } catch (error) {
        this.error = error.message;
      } finally {
        this.isLoading = false;
      }
    },
    // Botón mostrar/ocultar os filtros
    toggleFilters() {
      this.showFilters = !this.showFilters;
    },
    // Emitindo ao compoñente pai o cambio do compoñente
    switchComponent(newComponent) {
      if (newComponent === 'ShowIssues') {
        this.$emit('componentChange', newComponent);
      }
    },
    // Recargando as incidencias cando unha sexa eliminada
    handleIssueDeleted() {
      this.fetchIssues();
    },
    // Recargando as incidencias cando unha sexa editada
    handleIssueUpdated() {
      this.fetchIssues();
    },
    // Cambiando o compoñente visible mapa/lista
    toggleComponent() {
      this.isMapSantiagoVisible = !this.isMapSantiagoVisible;
      // Almacenando en sessionStorage o último estado para que ao actualizar manteñanos no mesmo compoñente
      sessionStorage.setItem(
        'previousView',
        JSON.stringify(this.isMapSantiagoVisible)
      );
    },
    updateIssues(newIssues) {
      this.issues = newIssues;
    },
  },
  mounted() {
    // Restaurar o estado anterior dende sessionStorage
    const previousView = sessionStorage.getItem('previousView');
    if (previousView !== null) {
      this.isMapSantiagoVisible = JSON.parse(previousView);
    }

    this.fetchIssues();
  },
};
</script>

<style>
.error-message {
  color: red;
  margin-top: 5px;
}
body {
  min-height: 100vh;
}
</style>
