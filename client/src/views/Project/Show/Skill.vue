<template>
  <div class="employee-show-index border-top">
    <ul class="list-group list-group-flush">
      <SkillItem v-for="item in skills" :key="item.id" v-bind:item="item" modelName="projectSkill" />
      <SkillAssociationForm v-if="isCreateNew" :toggleForm="toggleForm" modelName="projectSkill" parentName="project" />

      <button class="w-100 btn btn-link py-3" @click="toggleForm" v-if="!isCreateNew">
        <font-awesome-icon icon="plus" class="text-muted" /> Adicionar Competência
      </button>
    </ul>
  </div>
</template>


<script>
import SkillItem from '@/components/SkillItem.vue'
import SkillAssociationForm from '@/components/SkillAssociationForm.vue'

export default {
  components: {
    SkillItem,
    SkillAssociationForm
  },

  created () {
    this.fetchData();
  },

  data() {
    return {
      isCreateNew: null
    };
  },

  computed: {
    skills () {
      return this.$store.getters['projectSkill/getAll'];
    }
  },

  methods: {
    toggleForm () {
      this.isCreateNew = !this.isCreateNew;
    },

    fetchData () {
      this.$store.dispatch('projectSkill/find', { project: this.$route.params.id });
    }
  },

  watch: {
    '$route': 'fetchData'
  }
}
</script>
