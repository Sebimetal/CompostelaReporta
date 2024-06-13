<!-- DEPRECATED COMPONENT / NOT USED -->
<script>
import Header from '../subcomponents/Header.vue';
import MapSantiago from '../subcomponents/MapaSantiago.vue';
import ShowIssues from '../subcomponents/ShowIssues.vue';
// export default {
// Inxección da variable da ruta do APIREST
//   inject: ['backendServerAddress'],
//   data() {
//     return {
//       issues: [],
//       responders: [],
//       isLoading: false,
//       error: null,
//     };
//   },
//   mounted() {
//     this.fetchIssues();
//   },
//   methods: {
//     async fetchIssues() {
//       this.isLoading = true;
//       try {
//         const response = await fetch(
//           `${this.backendServerAddress}/issues/getLastIssues`
//         );
//         this.issues = await response.json();
//       } catch (error) {
//         this.error = error.message;
//       } finally {
//         this.isLoading = false;
//       }
//     },
//     switchComponent(newComponent) {
//       this.$emit('componentChange', newComponent);
//     },
//     async handleIssueDeleted(issueId) {
//       // Filtrar a lista de incidencias para quitar a eliminada
//       this.issues = this.issues.filter((issue) => issue._id !== issueId);
//     },
//     loadIssuesOnMap() {},
//   },
//   watch: {
//     issues: {
//       handler(newValue, oldValue) {
//         this.$forceUpdate();
//       },
//     },
//   },
//   components: {
//     Header,
//     MapSantiago,
//     ShowIssues,
//   },
// };
</script>

<template>
  <div class="background-image opacity-75">
    <div class="row w-100">
      <div class="col-10 m-auto mb-4 justify-self-center mt-5">
        <div class="card">
          <div class="card-body">
            <h4
              class="card-body text-center w-sm-80 m-auto d-none d-sm-flex opacity"
            >
              Conecta co Concello. Reporta incidencias, manténte informado e
              faite parte do cambio. Axudemos a facer de Santiago de Compostela
              unha cidade mellor.
            </h4>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- <MapSantiago :issues="issues"></MapSantiago>-->
</template>

<style scoped>
.background-image {
  background-image: url('/santiago.jpg');
  background-size: cover;
  background-position: center;
  min-height: 80vh;
  border-radius: 15px;
}
.card {
  border: 0;
  background-color: rgb(242, 242, 243, 0.75);
}
</style>
