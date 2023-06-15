<template>
  <div class="employee-show-index">
    <div class="card border-0 border-top">
      <div class="card-header d-flex align-items-center border-0">
        <h6 class="mb-0 font-weight-bold">Competências</h6>
      </div>

      <ul class="list-group list-group-flush border-top">
        <SkillItem v-for="item in skills" :key="item.id" v-bind:item="item" modelName="employeeSkill" />
        <SkillAssociationForm v-if="isCreateNew" :toggleForm="toggleForm" modelName="employeeSkill" parentName="employee" />

        <button class="w-100 btn btn-link" @click="toggleForm" v-if="!isCreateNew">
          <font-awesome-icon icon="plus" class="text-muted" /> Adicionar Competência
        </button>
      </ul>
    </div>
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
      return this.$store.getters['employeeSkill/getAll'];
    }
  },

  methods: {
    toggleForm () {
      this.isCreateNew = !this.isCreateNew;
    },

    fetchData () {
      this.$store.dispatch('employeeSkill/find', { employee: this.$route.params.id });
    }
  },

  watch: {
    '$route': 'fetchData'
  }
}
</script>
