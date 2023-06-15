<template>
  <div class="skill-association-form">
    <li class="list-group-item py-3 border-0 border-bottom">
      <div class="form-group">
        <label class="font-weight-bold">Selecionar Habilidade</label>
        <v-select label="title" v-model="skill" :options="skills"></v-select>
      </div>

      <div class="form-group mt-3">
        <label class="font-weight-bold">Selecionar o nível da habilidade</label>

        <div class="d-flex mt-2">
          <div class="mx-1 text-center" v-for="star in stars" :key="star" @click="updateStars(star)">
            <font-awesome-icon class="skill-star" icon="star" size="lg" v-bind:class="star <= currentStars ? 'text-warning' : 'text-muted'" />
            <h6 class="small mt-1 mb-0 font-weight-bold">{{star}}</h6>
          </div>
        </div>
      </div>

      <div class="mt-4 text-right">
        <button type="button" class="btn btn-outline-primary mr-3" @click="toggleForm">
          <font-awesome-icon icon="times" /> Cancelar
        </button>

        <button type="button" class="btn btn-primary" @click="save">
          <font-awesome-icon icon="save" /> Salvar
        </button>
      </div>
    </li>
  </div>
</template>

<script>
export default {
  name: 'SkillAssociationForm',

  created () {
    this.$store.dispatch('skill/find');
  },

  data () {
    return {
      skill: null,
      currentStars: 1,
      stars: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      options: ['Nodejs', 'Java', 'Scrum']
    }
  },

  props: {
    toggleForm: Function,
    modelName: String,
    parentName: String
  },

  computed: {
    skills() {
      return this.$store.getters['skill/getAll'];
    }
  },

  methods: {
    updateStars(star) {
      this.currentStars = star;
    },

    async save() {
      try {
        let data = {
          stars: this.currentStars,
          skill: this.skill.id
        };

        data[this.parentName] = this.$route.params.id;

        await this.$store.dispatch(`${this.modelName}/create`, data);
        this.toggleForm();
      } catch (e) {
        return this.$swal.fire({
          icon: 'error',
          title: 'Falha ao cadastrar skill',
          text: 'Não é possível adicionar duas competências iguais'
        });
      }
    }
  }
}
</script>
