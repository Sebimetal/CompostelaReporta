<script>
import { LMap, LTileLayer } from 'leaflet';

export default {
  components: {
    LMap,
    LTileLayer,
  },
  data() {
    return {
      zoom: 14,
      center: [42.8805, -8.5457],
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      map: null,
      temporaryMarker: null,
      iconCreateIssue: '',
      markers: [],
    };
  },
  props: {
    issues: Array,
    CreateIssueComponent: Boolean,
    initialCoordinates: Array, // Coordenadas iniciais pasadas dende o compoñente pai
    isLoggedIn: Boolean,
  },
  mounted() {
    try {
      // Creamo-lo mapa
      this.map = L.map('mapContainer', {
        zoomControl: true,
        zoom: 1,
        zoomAnimation: false,
        fadeAnimation: true,
        markerZoomAnimation: true,
      }).setView([this.center[0], this.center[1]], this.zoom);

      L.tileLayer(this.url).addTo(this.map);

      // Solicitamos ao usuario permiso para recoller as coordenadas automáticamente dende o seu dispositivo
      if (this.CreateIssueComponent) {
        this.requestLocation();
      }
      // Cargamos as incidencias no mapa
      this.loadIssuesOnMap();
      // Método para crear o marcador custom para seleccionar coordenadas
      this.createIssueCustomMarker();

      // Se temos coordenadas iniciais (permiso concedido polo usuario no navegador) e estamos no compoñente pai CreateIssue
      // Engadimos o marcador custom nas coordenadas do mapa
      if (this.initialCoordinates && this.CreateIssueComponent) {
        this.addTemporaryMarker(
          this.initialCoordinates[1],
          this.initialCoordinates[0]
        );
      }
      // Evento facer click no mapa no que chamamos á función para crear o marcador
      this.map.on('click', this.createIssueFromMapLocation);
    } catch (error) {
      console.error('Error mounting the map:', error);
    }
  },
  methods: {
    clearMarkers() {
      if (this.markers.length) {
        for (const marker of this.markers) {
          this.map.removeLayer(marker);
        }
        this.markers = [];
      }
    },
    async loadIssuesOnMap() {
      try {
        this.clearMarkers();
        if (this.issues) {
          for (const issue of this.issues) {
            const latitude = issue.location.coordinates[0];
            const longitude = issue.location.coordinates[1];
            const direccion = issue.address;
            const issueType = issue.issueType;
            const issueDescription = issue.description;
            const marker = L.marker([latitude, longitude])
              .addTo(this.map)
              .bindPopup(
                `<b>${issueType}</b><br/>${issueDescription}<br/>
                ${direccion}`
              );
            this.markers.push(marker);
          }
        }
      } catch (error) {
        console.error('Error loading issues on the map:', error);
      }
    },
    createIssueCustomMarker() {
      try {
        this.iconCreateIssue = L.icon({
          iconUrl: '../mapIcons/iconCreateIssue.png',
          iconSize: [38, 38],
          iconAnchor: [19, 38],
        });
      } catch (error) {
        console.error('Error creating custom marker:', error);
      }
    },
    createIssueFromMapLocation(event) {
      try {
        if (this.CreateIssueComponent) {
          if (this.temporaryMarker) {
            this.removeTemporaryMarker();
          }
          if (!this.temporaryMarker) {
            const latlng = event.latlng;
            if (latlng) {
              const { lat, lng } = latlng;
              this.$emit('coordinates-selected', [lat, lng]);
              this.addTemporaryMarker(lat, lng);
            } else {
              console.error('Could not obtain latitude and longitude.');
            }
          }
        }
      } catch (error) {
        console.error('Error handling mouse event:', error);
      }
    },
    addTemporaryMarker(lat, lng) {
      try {
        this.temporaryMarker = L.marker([lat, lng], {
          icon: this.iconCreateIssue,
          pane: 'overlayPane',
        }).addTo(this.map);
        this.map.setView([lat, lng], this.map.getZoom());
      } catch (error) {
        //console.log('Error adding temporary marker:', error);
      }
    },
    removeTemporaryMarker() {
      try {
        if (this.temporaryMarker) {
          this.map.removeLayer(this.temporaryMarker);
          this.temporaryMarker = null;
        }
      } catch (error) {
        console.error('Error removing temporary marker:', error);
      }
    },
    // Recollendo as coordenadas
    retrieveCoordinates(coordinates) {
      this.coordinates = coordinates;
    },
    // Solicitando ao usuario recoller a localización dende o navegador
    requestLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            this.$emit('coordinates-selected', [latitude, longitude]);
            this.addTemporaryMarker(latitude, longitude);
          },
          (error) => {
            console.error('Erro ao obten a localización:', error);
          }
        );
      } else {
        console.error('Xeolocalización non soportada por este navegador.');
      }
    },
  },
  watch: {
    // Temos un watcher para cando se modifique issues cargue as novas incidencias no mapa
    issues: {
      handler() {
        try {
          this.loadIssuesOnMap();
        } catch (error) {
          console.error('Error watching issues:', error);
        }
      },
      deep: true,
    },
  },
};
</script>

<template>
  <div
    class="container-fluid d-flex justify-content-center p-0 pe-sm-3 ps-sm-3"
  >
    <div class="text-center" id="mapContainer"></div>
  </div>
</template>

<style scoped>
.leaflet-container {
  width: 100%;
  height: 400px;
  cursor: auto;
  border-radius: 20px;
}
</style>
