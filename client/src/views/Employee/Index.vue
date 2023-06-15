<template>
  <div class="employee">
    <div class="card shadow-sm">
      <div class="card-header d-flex align-items-center">
        <h6 class="font-weight-bold text-primary mb-0">Colaboradores</h6>

        <div class="ml-auto d-flex align-items-center">
          <router-link to="/employee/create" class="btn btn-primary btn-sm flex-shrink-0 ml-3">Adicionar Colaborador</router-link>
        </div>
      </div>

      <div class="ui-crud card-body p-0">
        <div class="ui-crud__body row">
          <div class="ui-crud__list col-md-4">
            <ul class="list-group list-group-flush ui-crud__scroll">
              <li class="list-group-item" v-for="item in employees" :key="item.id">
                <router-link :to="{ name: 'EmployeeShowSkill', params: { id: item.id }}" class="d-flex align-items-center">
                  <Avatar class="avatar-5 flex-shrink-0" :item="item"/>

                  <div class="ml-3">
                    <h6 class="font-weight-bold">{{item.firstName}} {{item.lastName}}</h6>
                    <h6 class="mb-0 text-truncate">{{item.email || "Email não informado"}}</h6>
                  </div>
                </router-link>
              </li>
            </ul>
          </div>

          <div class="ui-crud__view col-md-8">
            <div class="ui-crud__scroll">
              <router-view />
            </div>
          </div>
        </div>
      </div>
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
    this.$store.dispatch('employee/find');
  },

  computed: {
    employees() {
      return this.$store.getters['employee/getAll'];
    }
  }
}
</script>
