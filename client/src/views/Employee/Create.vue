<template>
<div>
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
                <label for="email">Nome</label>
                <input class="form-control" type="text" v-model="firstName">
              </div>

              <div class="input my-3">
                <label for="password">Sobrenome</label>
                <input class="form-control" type="text" v-model="lastName">
              </div>

              <div class="input my-3">
                <label for="password">Email</label>
                <input class="form-control" type="email" v-model="email">
              </div>

              <div class="input my-3">
                <label for="password">Nome da Empresa</label>
                <input class="form-control" type="text" v-model="companyName">
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
      firstName: null,
      lastName: null,
      companyName: null,
    }
  },

  methods: {
    async onSubmit() {
      if (
            !this.email || 
            !this.firstName ||
            !this.lastName ||
            !this.companyName
        ) {
        return this.$swal.fire({
          icon: 'warning',
          title: 'preencha dos dados corretamente'
        });
      }

      let user = {
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName,
        company: this.companyName
      };

      try {
        await this.$store.dispatch('employee/create', { user, company });
        this.$router.push('/');
      } catch (e) {
        // TODO: Exibir campos que estão faltando
        return this.$swal.fire({
          icon: 'error',
          title: 'Falha ao criar conta'
        });
      }
    }
  }
}
</script>
