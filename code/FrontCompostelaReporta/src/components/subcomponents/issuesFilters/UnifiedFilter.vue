<template>
  <!-- Formulario para filtrado das incidencias -->
  <form @submit.prevent="fetchIssues" class="align-items-center">
    <div class="row">
      <div class="col-lg-2 mb-3 mb-lg-0">
        <input
          class="form-control border-secondary me-2"
          type="text"
          id="reporterHash"
          v-model="reporterHash"
          placeholder="Código de usuario"
        />
      </div>
      <div class="col-lg-3 mb-3 mb-lg-0">
        <select
          id="issueType"
          class="form-select border-secondary me-2"
          v-model="selectedIssueType"
        >
          <option value="" enabled>Todas as incidencias</option>
          <option v-for="type in issueTypes" :key="type" :value="type">
            {{ type }}
          </option>
        </select>
      </div>
      <div class="col-lg-5 d-flex mb-3 mb-lg-0">
        <input
          type="date"
          id="startDate"
          v-model="startDate"
          class="form-control border-secondary me-2"
        />
        <input
          type="date"
          id="endDate"
          v-model="endDate"
          class="form-control border-secondary me-2"
        />
      </div>
      <div class="col-lg-2 d-flex justify-content-end">
        <button type="submit" class="btn btn-secondary border me-2">
          <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
        </button>
        <!-- Botón para vacia-los filtros  -->
        <button
          type="button"
          class="btn btn-danger text-light"
          @click="resetFilters"
        >
          <font-awesome-icon :icon="['fas', 'eraser']" />
        </button>
      </div>
    </div>
  </form>

  <!-- Para a mostra de mesaxes de erros no filtro -->
  <div
    v-if="filterError"
    class="alert alert-danger alert-dismissible fade show fixed-top m-2"
    role="alert"
  >
    {{ filterError }}
    <button
      type="button"
      class="btn-close"
      @click="filterError = ''"
      aria-label="Close"
    ></button>
  </div>
  <!-- Para a mostra de mensaxe cando non se atopen incidencias cos filtros introducidos -->
  <div
    v-if="noIssuesDetected"
    class="alert alert-danger alert-dismissible fade show fixed-top m-2"
    role="alert"
  >
    {{ noIssuesDetected }}
    <button
      type="button"
      class="btn-close"
      aria-label="Close"
      @click="noIssuesDetected = ''"
    ></button>
  </div>
</template>

<script>
export default {
  // Recollemo-los props de backendServerAddress e issueTypes
  props: ['backendServerAddress', 'issueTypes'],
  data() {
    return {
      reporterHash: '',
      selectedIssueType: '',
      startDate: '',
      endDate: '',
      filterError: '',
      noIssuesDetected: '',
    };
  },
  // Emisións que facemos dende o compoñente
  emits: ['issuesFetched'],
  methods: {
    // Método para chamada ao backend e recoller as incidencias cos filtros pasados
    async fetchIssues() {
      try {
        if (
          this.startDate &&
          this.endDate &&
          new Date(this.startDate) > new Date(this.endDate)
        ) {
          this.filterError =
            'A data de inicio debe ser anterior ou igual á data final';
          return;
        }

        const response = await fetch(
          `${this.backendServerAddress}/issues/find`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              reporterHash: this.reporterHash,
              issueType: this.selectedIssueType,
              startDate: this.startDate,
              endDate: this.endDate,
            }),
          }
        );

        const data = await response.json();
        if (data.length === 0) {
          this.noIssuesDetected =
            'Non se atoparon incidencias cos filtros introducidos';
        }
        this.$emit('issuesFetched', data);
        this.filterError = '';
      } catch (error) {
        this.filterError = error.message;
        console.error('Error:', error);
      }
    },
    resetFilters() {
      // Método para resetea-los filtros
      this.reporterHash = '';
      this.selectedIssueType = '';
      this.startDate = '';
      this.endDate = '';
      this.filterError = '';
      this.fetchIssues();
    },
  },
};
</script>

<style scoped>
.error-message {
  color: red;
  margin-top: 5px;
}
</style>
