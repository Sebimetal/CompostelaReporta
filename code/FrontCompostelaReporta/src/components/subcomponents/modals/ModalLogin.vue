<template>
  <div
    class="modal fade show"
    id="loginModal"
    tabindex="-1"
    style="display: block"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="loginModalLabel">Login</h5>
          <!-- Evento click sobre o close para cerra-la modal -->
          <button
            type="button"
            class="btn-close"
            @click="closeModal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <!-- Formulario de login -->
          <form @submit.prevent="handleLogin">
            <div class="form-group">
              <label for="username">Username</label>
              <input
                type="text"
                v-model="username"
                id="username"
                class="form-control"
                required
              />
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input
                type="password"
                v-model="password"
                id="password"
                class="form-control"
                required
              />
            </div>
            <button type="submit" class="btn btn-primary">Login</button>
          </form>
          <!-- Mostrando mensaxe de erro cando non conseguimos facer login -->
          <div v-if="errorMessage" class="alert alert-danger mt-3" role="alert">
            {{ errorMessage }}
          </div>
          <!-- Mostrando mensaxe de success cando facemos login correctamente -->
          <div
            v-if="successMessage"
            class="alert alert-success mt-3"
            role="alert"
          >
            {{ successMessage }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      errorMessage: '',
      successMessage: '',
    };
  },
  // Declaramos os emits que vamos facer dende este compoñente
  emits: ['close', 'logged'],
  // Inxectamos a variable da ruta do backend
  inject: ['backendServerAddress'],
  methods: {
    // Función para facer o login do administrador
    async handleLogin() {
      try {
        this.errorMessage = '';
        this.successMessage = '';

        const response = await fetch(
          `${this.backendServerAddress}/users/login`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: this.username,
              password: this.password,
            }),
          }
        );

        if (!response.ok) {
          // Se non é correcto mandamos erro
          throw new Error('Error en la autenticación');
        }

        const data = await response.json();

        // Gardamos o token nun localStorage
        localStorage.setItem('token', data.token);

        // Gardamos o usuario tamén para ter os datos do mesmo
        localStorage.setItem('user', JSON.stringify(data.user));

        this.successMessage = 'Inicio de sesión exitoso';

        // Emitir un evento para cerrar o modal despois do login
        this.successMessage = `O usuario ${data.user.username} identificouse correctamente`;
        // Mantemos un segundo a ventana para mostrar a mesaxe de identificación
        setTimeout(() => {
          // Emitimos ao compoñente pai Header o close e o logged para cambio de tipo de botón
          this.$emit('close');
          this.$emit('logged');
        }, 1000);
      } catch (error) {
        console.error('Error:', error);
        this.errorMessage =
          'Credenciales incorrectas. Por favor, inténtelo de nuevo.';
      }
    },
    // Xestionamos o cerre da modal no propio compoñente
    closeModal() {
      this.errorMessage = '';
      this.successMessage = '';
      this.$emit('close');
    },
  },
};
</script>

<style scoped></style>
