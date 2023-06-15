<template>
  <div class="project-show-add-employee border-top">
    <ul class="list-group list-group-flush border-top" v-if="bests.length">
      <h6 class="mb-0 bg-white text-success py-3 border-bottom px-3">
        <strong>Indicados</strong>
        (<small>Colaboradores que atendem uma ou mais competências no nível requerido</small>)
      </h6>

      <EmployeeItem v-for="item in bests" :key="item.id" v-bind:item="item" />
    </ul>

    <ul class="list-group list-group-flush border-top" v-if="others.length">
      <h6 class="mb-0 bg-white text-info py-3 border-bottom px-3">
        <strong>Competêcia mínima</strong>
        (<small>Colaboradores que atendem uma ou mais competências, porém em um nível inferior</small>)
      </h6>

      <EmployeeItem v-for="item in others" :key="item.id" v-bind:item="item" />
    </ul>

    <ul class="list-group list-group-flush border-top" v-if="all.length">
      <h6 class="mb-0 bg-white text-muted py-3 border-bottom px-3">
        <strong>Outros</strong>
        (<small>Colaboradores que não atendem as competências necessárias</small>)
      </h6>

      <EmployeeItem v-for="item in all" :key="item.id" v-bind:item="item" />
    </ul>
  </div>
</template>

<script>
import EmployeeItem from '@/components/EmployeeItem.vue'

export default {
  components: {
    EmployeeItem
  },

  created () {
    this.fetchData();
  },

  computed: {
    bests () {
      return this.$store.getters['project/getSuggestions'].bests || [];
    },

    others () {
      return this.$store.getters['project/getSuggestions'].others || [];
    },

    all () {
      return this.$store.getters['project/getSuggestions'].all || [];
    }
  },

  methods: {
    fetchData () {
      this.$store.dispatch('project/findSuggestions', this.$route.params.id);
    }
  },

  watch: {
    '$route': 'fetchData'
  }
}
</script>
