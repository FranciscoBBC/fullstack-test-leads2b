import basic from './basic';
const { state, getters, mutations, actions } = basic;

export default {
  namespaced: true,

  state: {
    ...state,
    modelName: 'projectSkill'
  },

  getters: {
    ...getters
  },

  mutations: {
    ...mutations
  },

  actions: {
    ...actions
  }
}
