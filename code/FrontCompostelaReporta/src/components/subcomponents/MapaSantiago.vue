<script>
import { LMap, LTileLayer } from 'leaflet';

export default {
  components: {
    LMap,
    LTileLayer,
  },
  data() {
    return {
      zoom: 14, // Nivel de zoom inicial
      center: [42.8805, -8.5457], // Coordenadas de Santiago de Compostela
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', // URL do servidor de tiles
      map: '',
      markerUp: false,
      iconCreateIssue: '',
    };
  },
  props: ['issues', 'CreateIssueComponent'],
  mounted() {
    this.map = L.map('mapContainer').setView(
      [this.center[0], this.center[1]],
      this.zoom
    );
    L.tileLayer(this.url).addTo(this.map);
    this.loadIssuesOnMap();
    this.createIssueCustomMarker();
  },
  methods: {
    async loadIssuesOnMap() {
      if (this.issues) {
        for (const issue of this.issues) {
          const latitude = issue.location.coordinates[0];
          const longitude = issue.location.coordinates[1];
          const direccion = await this.getAddressFromCoordinates(
            latitude,
            longitude
          );
          const issueType = issue.issueType;
          const issueDescription = issue.description;
          L.marker([latitude, longitude])
            .addTo(this.map)
            .bindPopup(
              `<b>${issueType}</b><br/>${issueDescription}<br/>
              ${direccion.road}, ${
                direccion.neighbourhood
                  ? direccion.neighbourhood
                  : direccion.amenity
              }`
            );
        }
      }
    },
    createIssueCustomMarker() {
      this.iconCreateIssue = L.icon({
        iconUrl: '../public/mapIcons/iconCreateIssue.png',
        iconSize: [38, 38], // tamaño del ícono
        iconAnchor: [19, 38], // punto de anclaje del icono
      });
    },
    getCoordinatesFromMap(event) {
      // Comprobamos se estamos accedendo a este compoñente dende o compoñente pai CreateIssue
      if (this.CreateIssueComponent) {
        //Comprobamos que estamos facendo click no mapa e non nun marcador
        if (event.type === 'click' && event.target.id === 'mapContainer') {
          // Revisamos se hai xa coordenadas rexistradas para non duplicar marcadores
          if (this.temporaryMarker) {
            this.removeTemporaryMarker();
          }
          // Rexistra as coordenadas ao facer clic no mapa
          if (!this.temporaryMarker) {
            const latlng = this.map.mouseEventToLatLng(event);
            if (latlng) {
              const { lat, lng } = latlng;
              this.$emit('coordinates-selected', [lat, lng]);
              this.addTemporaryMarker(lat, lng);
            } else {
              console.error('Non se puido obter latitude e lonxitude.');
            }
          }
        }
      }
    },
    async getAddressFromCoordinates(lat, lng) {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
        );
        const data = await response.json();
        const address = data.address;
        console.log(address);
        return address; // Devolver la dirección
      } catch (error) {
        console.error('Error al obtener la dirección:', error);
        throw error; // Lanzar el error para manejarlo fuera de la función si es necesario
      }
    },

    // Engadimos marcador temporal para mostrar onde escollemo-las coordenadas
    addTemporaryMarker(lat, lng) {
      this.temporaryMarker = L.marker([lat, lng], {
        icon: this.iconCreateIssue,
      })
        .addTo(this.map)
        .bindPopup(`Clicked at: ${lat}, ${lng}`)
        .openPopup();
    },
    // Eliminamos o marcador temporal
    removeTemporaryMarker() {
      this.map.removeLayer(this.temporaryMarker);
      this.temporaryMarker = null;
    },
  },
  watch: {
    issues: {
      //Función para actualizar o mapa cando se detecten cambios na propiedade issues
      handler() {
        this.loadIssuesOnMap();
      },
    },
  },
};
</script>

<template>
  <div class="container-fluid d-flex justify-content-center">
    <div
      class="text-center"
      id="mapContainer"
      @click="getCoordinatesFromMap"
    ></div>
  </div>
</template>

<style scoped>
.leaflet-container {
  width: 80%;
  height: 400px;
}
</style>
