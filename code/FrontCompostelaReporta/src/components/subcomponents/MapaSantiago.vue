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
      map: '',
      markerUp: false,
      iconCreateIssue: '',
    };
  },
  props: ['issues', 'CreateIssueComponent'],
  mounted() {
    try {
      this.map = L.map('mapContainer', {
        zoomControl: true,
        zoom: 1,
        zoomAnimation: false,
        fadeAnimation: true,
        markerZoomAnimation: true,
      }).setView([this.center[0], this.center[1]], this.zoom);
      L.tileLayer(this.url).addTo(this.map);
      this.loadIssuesOnMap();
      this.createIssueCustomMarker();

      this.map.on('click', this.createIssueFromMapLocation);
    } catch (error) {
      console.error('Error mounting the map:', error);
    }
  },
  methods: {
    async loadIssuesOnMap() {
      try {
        if (this.issues) {
          for (const issue of this.issues) {
            const latitude = issue.location.coordinates[0];
            const longitude = issue.location.coordinates[1];
            const direccion = issue.address;
            const issueType = issue.issueType;
            const issueDescription = issue.description;
            L.marker([latitude, longitude])
              .addTo(this.map)
              .bindPopup(
                `<b>${issueType}</b><br/>${issueDescription}<br/>
                ${direccion}`
              );
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
        console.log(event);
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
        })
          .addTo(this.map)
          .bindPopup(`Clicked at: ${lat}, ${lng}`)
          .openPopup();
      } catch (error) {
        console.error('Error adding temporary marker:', error);
      }
    },
    removeTemporaryMarker() {
      try {
        this.map.removeLayer(this.temporaryMarker);
        this.temporaryMarker = null;
      } catch (error) {
        console.error('Error removing temporary marker:', error);
      }
    },
  },
  watch: {
    issues: {
      handler() {
        try {
          this.loadIssuesOnMap();
        } catch (error) {
          console.error('Error watching issues:', error);
        }
      },
    },
  },
};
</script>

<template>
  <div class="container-fluid d-flex justify-content-center">
    <div class="text-center" id="mapContainer"></div>
  </div>
</template>

<style scoped>
.leaflet-container {
  width: 80%;
  height: 400px;
}
</style>
