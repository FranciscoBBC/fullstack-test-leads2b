<template>
  <li class="employee-item list-group-item d-flex align-items-center">
    <Avatar class="avatar-5" :item="item"/>

    <div class="ml-3">
      <h6 class="font-weight-bold mb-0">{{item.firstName}} {{item.lastName}}</h6>
      <small>{{item.stars}} estrelas em comum</small>
      <div class="d-flex">
        <div class="mx-1 text-center" v-for="star in stars" :key="star">
          <font-awesome-icon class="skill-star" size="xs" icon="star" v-bind:class="star <= item.stars ? 'text-warning' : 'text-muted'" />
        </div>
      </div>
    </div>

    <button type="button" class="btn btn-outline-primary btn-sm" @click="addEmployee">
      <font-awesome-icon icon="plus" /> Adicionar
    </button>
  </li>
</template>
<script>

import Avatar from '@/components/Avatar.vue'

export default {
  name: 'EmployeeItem',
  components: {
    Avatar
  },

  props: {
    item: Object
  },

  data () {
    return {
      stars: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    }
  },

  methods: {
    async addEmployee() {
      let paramsId = this.$route.params.id;

      try {
        await this.$store.dispatch(`project/addEmployee`, {
          project: paramsId,
          employee: this.item.id
        });

        await this.$store.dispatch(`project/findSuggestions`, paramsId);

        return this.$swal.fire({
          icon: 'success',
          title: 'Adicionado com sucesso'
        });
      } catch (e) {
        return this.$swal.fire({
          icon: 'error',
          title: 'Falha ao adicionar colaborador ao projeto'
        });
      }
    }
  }
}
</script>
