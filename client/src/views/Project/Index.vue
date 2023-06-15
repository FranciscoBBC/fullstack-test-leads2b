<template>
  <div class="project">
    <div class="card shadow-sm">
      <div class="card-header d-flex align-items-center">
        <h6 class="font-weight-bold text-primary mb-0">Projetos</h6>

        <div class="d-flex align-items-center">
          <router-link to="/project/create" class="btn btn-primary btn-sm flex-shrink-0 ml-3">Adicionar Projeto</router-link>
        </div>
      </div>

      <div class="ui-crud card-body p-0">
        <div class="ui-crud__body row">
          <div class="ui-crud__list col-md-4">
            <ul class="list-group list-group-flush ui-crud__scroll">
              <li class="list-group-item py-3" v-for="item in projects" :key="item.id">
                <router-link :to="{ name: 'ProjectShowSkill', params: { id: item.id }}">
                  <h6 class="font-weight-bold">{{item.title}}</h6>
                  <h6 class="mb-0">{{item.description || "Descrição não informada"}}</h6>
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

export default {
  created () {
    this.$store.dispatch('project/find');
  },

  computed: {
    projects() {
      return this.$store.getters['project/getAll'];
    }
  }
}
</script>
