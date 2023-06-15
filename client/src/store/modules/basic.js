import axios from 'axios';

export default {
  state: {
    all: []
  },

  getters: {
    getById: (state) => (id) => {
      return state.all.find(o => o.id === Number(id));
    },
    getAll: (state) =>  {
      return state.all;
    }
  },

  mutations: {
    unshiftRecord (state, record) {
      let found = state.all.find(o => o.id === record.id);
      if (!found) {
        state.all.unshift(record);
      }
    },

    removeRecord (state, record) {
      state.all = state.all.filter(o => o.id !== Number(record.id));
    },

    setRecords (state, records) {
      state.all = records;
    }
  },

  actions: {
    async find ({ commit, state }, params = {}) {
      let response = await axios.get(`/${state.modelName}`, { params });
      commit('setRecords', response.data);
      return response;
    },

    async findOne ({ commit, state }, id) {
      let response = await axios.get(`/${state.modelName}/${id}`);
      commit('unshiftRecord', response.data);
      return response;
    },

    async create ({ commit, state }, record) {
      let response = await axios.post(`/${state.modelName}`, record);
      commit('unshiftRecord', response.data);
      return response;
    },

    async update ({ state }, record) {
      return await axios.put(`/${state.modelName}/${record.id}`, record);
    },

    async destroy ({ commit, state }, id) {
      let response = await axios.delete(`/${state.modelName}/${id}`);
      commit('removeRecord', { id });
      return response;
    }
  }
}
