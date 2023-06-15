<template>
  <div class="project-edit" v-if="project">
    <div class="card border-0">
      <div class="card-header">
        <h6 class="mb-0 font-weight-bold">Editar Projeto</h6>
      </div>

      <ul class="list-group list-group-flush py-3">
        <li class="list-group-item">
          <div class="form-group">
            <label>Título</label>
            <input class="form-control" type="text" placeholder="Nome" v-model="project.title">
          </div>

          <div class="form-group mt-3">
            <label>Título</label>
            <textarea class="form-control" placeholder="Descrição" v-model="project.description"></textarea>
          </div>
        </li>

        <li class="list-group-item text-right">
          <router-link :to="{ name: 'ProjectShowSkill' }" class="btn btn-outline-primary ml-3">
            Voltar
          </router-link>

          <button type="button" class="btn btn-primary ml-3" @click="save">Salvar</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  created () {
    this.fetchData();
  },

  computed: {
    project () {
      return this.$store.getters['project/getById'](this.$route.params.id);
    }
  },

  methods: {
    fetchData () {
      this.$store.dispatch('project/findOne', this.$route.params.id);
    },

    async save () {
      try {
        await this.$store.dispatch('project/update', this.project);
        this.$router.push(`/project/show/${this.project.id}`);
      } catch (e) {
        return this.$swal.fire({
          icon: 'error',
          title: 'Falha ao salvar projeto'
        });
      }
    }
  },

  watch: {
    '$route': 'fetchData'
  }
}
</script>
