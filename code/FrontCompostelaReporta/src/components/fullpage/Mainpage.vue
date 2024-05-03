<script>
import Header from '../subcomponents/Header.vue';
import MapSantiago from '../subcomponents/MapaSantiago.vue';
import ShowIssues from '../subcomponents/ShowIssues.vue';
export default {
  // Inxección da variable da ruta do APIREST
  inject: ['backendServerAddress'],
  data() {
    return {
      issues: [],
      responders: [],
      isLoading: false,
      error: null,
    };
  },
  mounted() {
    this.fetchIssues();
  },
  methods: {
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
    loadIssuesOnMap() {},
  },

  components: {
    Header,
    MapSantiago,
    ShowIssues,
  },
};
</script>

<template>
  <div class="row">
    <div class="col-10 m-auto mb-4">
      <div class="card">
        <div class="card-body">
          <h2 class="card-title text-center">Benvidos a Compostela Reporta</h2>
          <h4 class="card-body text-center w-50 m-auto">
            Conecta co Concello. Reporta incidencias, manténte informado e fai
            parte do cambio. Axudemos a facer de Santiago de Compostela unha
            cidade mellor.
          </h4>
        </div>
      </div>
    </div>
  </div>
  <MapSantiago :issues="issues"></MapSantiago>
  <ShowIssues :issues="issues"></ShowIssues>
</template>

<style></style>
