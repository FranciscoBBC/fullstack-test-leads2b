<template>
  <div class="employee-edit" v-if="employee">
    <div class="card border-0">
      <div class="card-header">
        <h6 class="mb-0 font-weight-bold">Editar Colaborador</h6>
      </div>

      <ul class="list-group list-group-flush">
        <li class="list-group-item">
          <div class="row">
            <div class="col-md-6 d-flex align-items-start">
              <Avatar class="avatar-7 flex-shrink-0" :item="employee"/>

              <div class="ml-4">
                <div class="form-group mb-3">
                  <label>Nome</label>
                  <input class="form-control" type="text" placeholder="Nome" v-model="employee.firstName">
                </div>

                <div class="form-group mb-3">
                  <label>Sobrenome</label>
                  <input class="form-control" type="text" placeholder="Sobrenome" v-model="employee.lastName">
                </div>

                <div class="form-group">
                  <label>Email</label>
                  <input class="form-control" type="email" placeholder="Email" v-model="employee.email">
                </div>
              </div>
            </div>
          </div>
        </li>

        <li class="list-group-item text-right">
          <router-link :to="{ name: 'EmployeeShowSkill' }" class="btn btn-outline-primary ml-3">
            Voltar
          </router-link>

          <button type="button" class="btn btn-primary ml-3" @click="save">Salvar</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Avatar from '@/components/Avatar.vue'

export default {
  components: {
    Avatar
  },

  created () {
    this.fetchData();
  },

  computed: {
    employee () {
      return this.$store.getters['employee/getById'](this.$route.params.id);
    }
  },

  methods: {
    fetchData () {
      this.$store.dispatch('employee/findOne', this.$route.params.id);
    },

    async save () {
      try {
        await this.$store.dispatch('employee/update', this.employee);
        this.$router.push(`/employee/show/${this.employee.id}`);
      } catch (e) {
        return this.$swal.fire({
          icon: 'error',
          title: 'Falha ao salvar colaborador'
        });
      }
    }
  },

  watch: {
    '$route': 'fetchData'
  }
}
</script>
