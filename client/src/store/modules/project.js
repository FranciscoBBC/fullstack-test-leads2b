import basic from './basic';
const { state, getters, mutations, actions } = basic;

import axios from 'axios';

export default {
  namespaced: true,

  state: {
    ...state,

    modelName: 'project',
    participants: [],
    suggestions: []
  },

  getters: {
    ...getters,

    getParticipants: (state) =>  {
      return state.participants;
    },

    getSuggestions: (state) =>  {
      return state.suggestions;
    }
  },

  mutations: {
    ...mutations,

    setParticipants (state, records) {
      state.participants = records;
    },

    setSuggestions (state, records) {
      state.suggestions = records;
    },

    removeParticipant (state, record) {
      state.participants = state.participants.filter((o)=> {
        return o.employee !== record.employee;
      });
    }
  },

  actions: {
    ...actions,

    async findParticipants ({ commit }, projectId) {
      let response = await axios.get(`/project/${projectId}/participants`);
      commit('setParticipants', response.data);
      return response;
    },

    async findSuggestions ({ commit }, projectId) {
      let response = await axios.get(`/project/${projectId}/suggestions`);
      commit('setSuggestions', response.data);
      return response;
    },

    addEmployee (context, data) {
      return axios.post(`/project/addEmployee`, data);
    },

    async removeEmployee ({ commit }, params) {
      await axios.delete(`/project/${params.project}/removeEmployee/${params.employee}`);
      commit('removeParticipant', params);
    },
  }
}
