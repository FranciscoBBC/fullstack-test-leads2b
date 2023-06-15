<template>
<div class="sign-in vh-100">
  <div class="position-absolute w-100 bg-primary h-25"></div>

  <div class="container-fluid">
    <div class="row justify-content-center t-5 position-relative">
      <div class="col-md-3">
        <div class="card shadow">
          <div class="card-body">
            <div class="text-center mb-4 border-bottom py-4">
              <img alt="Logo" src="../assets/images/logo.svg">
            </div>

            <form @submit.prevent="onSubmit">
              <div class="input">
                <label for="email">Email</label>
                <input class="form-control" type="email" id="email" v-model="email">
              </div>

              <div class="input my-3">
                <label for="password">Senha</label>
                <input class="form-control" type="password" id="password" v-model="password">
              </div>

              <div class="text-center mt-4">
                <button class="btn btn-primary px-4" type="submit">Entrar</button>
              </div>

              <h4 class="text-center mb-0 mt-3">ou</h4>

              <div class="text-center py-3">
                <router-link to="/signup" class="text-primary">Criar um conta</router-link>
              </div>
            </form>
          </div>
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
      email: null,
      password: null
    }
  },

  methods: {
    async onSubmit() {
      let credentials = {
        identification: this.email,
        password: this.password
      };

      try {
        await this.$store.dispatch('login', credentials);
        this.$router.push('/');
      } catch (e) {
        return this.$swal.fire({
          icon: 'error',
          title: 'Falha ao fazer login'
        });
      }
    }
  }
}
</script>
