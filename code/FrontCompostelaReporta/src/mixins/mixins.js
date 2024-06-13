// Mixins con funcións globais comúns para usar en tódolos compoñentes
export const globalMixin = {
  methods: {
    // Formateo de datas
    formatDate(date) {
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
      return new Date(date).toLocaleDateString(undefined, options);
    },
    // Tradución do estado da incidencia
    translatedStatus(status) {
      switch (status) {
        case 'new':
          return 'Novo';
        case 'accepted':
          return 'Aceptado';
        case 'ongoing':
          return 'En proceso';
        case 'finished':
          return 'Rematado';
        default:
          return status;
      }
    },
    // Tradución do estado da incidencia
    translatedNextStatus(status) {
      switch (status) {
        case 'new':
          return 'aceptado';
        case 'accepted':
          return 'en proceso';
        case 'ongoing':
          return 'rematado';
        default:
          return '';
      }
    },

    // Recoller nome do icono por tipo de incidencia

    translatedPriority(priority) {
      switch (priority) {
        case 1:
          return 'Baixa';
        case 2:
          return 'Media';
        case 3:
          return 'Alta';
        default:
          return priority;
      }
    },
  },
};
