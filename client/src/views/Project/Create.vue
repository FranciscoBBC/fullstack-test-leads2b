<template>
  <div class="project-edit">
    <div class="card border-0">
      <div class="card-header">
        <h6 class="mb-0 font-weight-bold">Criar Colaborador</h6>
      </div>

      <ul class="list-group list-group-flush py-3">
        <li class="list-group-item">
          <div class="form-group">
            <label>Título</label>
            <input class="form-control" type="text" placeholder="Nome" v-model="title">
          </div>

          <div class="form-group mt-3">
            <label>Descrição</label>
            <textarea class="form-control" placeholder="Descrição" v-model="description"></textarea>
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
  data() {
    return {
      title: null,
      description: null
    }
  },

  methods: {
    async save () {
      try {
        let { data } = await this.$store.dispatch('project/create', this.$data);
        this.$router.push(`/project/show/${data.id}`);
      } catch (e) {
        return this.$swal.fire({
          icon: 'error',
          title: 'Falha ao criar projeto'
        });
      }
    }
  }
}
</script>
