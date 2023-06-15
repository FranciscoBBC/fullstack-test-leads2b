<template>
  <div class="project-show-employee border-top">
    <ul class="list-group list-group-flush">
      <li class="list-group-item d-flex align-items-center" v-for="item in participants" :key="item.id">
        <Avatar class="avatar-5 flex-shrink-0" :item="item.Employee"/>

        <div class="ml-3">
          <h6 class="font-weight-bold">{{item.Employee.firstName}} {{item.Employee.lastName}}</h6>
          <h6 class="mb-0">{{item.Employee.email || "Email não informado"}}</h6>
        </div>

        <button type="button" class="btn btn-link text-danger btn-sm ml-auto" @click="remove(item)">
          <font-awesome-icon icon="trash" />
        </button>
      </li>
    </ul>

    <router-link :to="{ name: 'ProjectShowAddEmployee'}" class="w-100 btn btn-link py-3">
      <font-awesome-icon icon="plus" class="text-muted" /> Adicionar Colaborador
    </router-link>
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
    participants () {
      return this.$store.getters['project/getParticipants'];
    }
  },

  methods: {
    fetchData () {
      this.$store.dispatch('project/findParticipants', this.$route.params.id);
    },

    async remove(item) {
      try {
        await this.$store.dispatch(`project/removeEmployee`, {
          project: item.project,
          employee: item.employee
        });

        return this.$swal.fire({
          icon: 'success',
          title: 'Removido com sucesso'
        });
      } catch (e) {
        return this.$swal.fire({
          icon: 'error',
          title: 'Falha ao remover'
        });
      }
    }
  },

  watch: {
    '$route': 'fetchData'
  }
}
</script>
