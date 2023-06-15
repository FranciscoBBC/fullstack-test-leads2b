<template>
  <div class="employee-show" v-if="employee">
    <div class="card border-0">
      <div class="card-header d-flex align-items-center">
        <h6 class="mb-0 font-weight-bold">Dados Gerais</h6>

        <div class="ml-auto">
          <router-link :to="{ name: 'EmployeeEdit', params: { id: employee.id }}" class="btn btn-link py-0">
            <font-awesome-icon icon="edit" />
          </router-link>

          <button type="button" class="btn btn-link py-0 text-danger" @click="removeEmployee">
            <font-awesome-icon icon="trash" />
          </button>
        </div>
      </div>

      <ul class="list-group list-group-flush py-3">
        <li class="list-group-item">
          <div class="row">
            <div class="col-md-6 d-flex align-items-center">
              <Avatar class="avatar-7 flex-shrink-0" :item="employee"/>

              <div class="ml-4">
                <h6 class="font-weight-bold">{{employee.firstName}} {{employee.lastName}}</h6>
                <h6 class="mb-0">{{employee.email}}</h6>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <router-view/>
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
    employee() {
      return this.$store.getters['employee/getById'](this.$route.params.id);
    }
  },

  methods: {
    fetchData() {
      this.$store.dispatch('employee/findOne', this.$route.params.id);
    },

    async removeEmployee() {
      try {
        let { value } = await this.$swal.fire({
          icon: 'info',
          title: 'Deseja remover este colaborador?',
          text: 'Todos os registros associados a ele serão removidos',
          showCancelButton: true,
          focusConfirm: false,
          confirmButtonText: 'Sim',
          cancelButtonText: 'Não'
        });

        if (!value) { return; }

        await this.$store.dispatch('employee/destroy', this.$route.params.id);
        this.$router.push(`/employee`);

        return this.$swal.fire('O colaborador foi removido');
      } catch (e) {
        return this.$swal.fire({
          icon: 'error',
          title: 'Falha ao remover colaborador'
        });
      }
    }
  },

  watch: {
    '$route': 'fetchData'
  }
}
</script>
