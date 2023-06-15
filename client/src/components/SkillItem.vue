<template>
  <li class="skill-item list-group-item d-flex align-items-center">
    <div class="">
      <h6 class="font-weight-bold">{{item.Skill.title}}</h6>

      <div class="d-flex">
        <div class="mx-1 text-center" v-for="star in stars" :key="star" @click="updateStars(star)">
          <font-awesome-icon class="skill-star" icon="star" v-bind:class="star <= item.stars ? 'text-warning' : 'text-muted'" />
        </div>
      </div>
    </div>
    <div class="ml-auto">
      <button type="button" class="btn btn-link py-0 text-danger" @click="remove">
        <font-awesome-icon icon="trash" />
      </button>
    </div>
  </li>
</template>

<script>
export default {
  name: 'SkillItem',
  props: {
    item: Object,
    modelName: String
  },

  data () {
    return {
      stars: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    }
  },

  methods: {
    async updateStars(star) {
      this.item.stars = star;

      try {
        await this.$store.dispatch(`${this.modelName}/update`, this.item);
      } catch (e) {
        return this.$swal.fire({
          icon: 'error',
          title: 'Falha ao atualizar skill'
        });
      }
    },

    async remove() {
      try {
        await this.$store.dispatch(`${this.modelName}/destroy`, this.item.id);
        return this.$swal.fire({
          icon: 'success',
          title: 'Removido com sucesso'
        });
      } catch (e) {
        return this.$swal.fire({
          icon: 'error',
          title: 'Falha ao remover skill'
        });
      }
    }
  }
}
</script>
