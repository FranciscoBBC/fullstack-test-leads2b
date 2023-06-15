import axios from 'axios';
import router from '../../router/index';

const session = JSON.parse(localStorage.getItem('auth-session') || '{}');

const state = { session };

const getters = {
  company: state => state.session.company,
  isAuthenticated: state => !!state.session.token,
  token: state => state.session.token,
  user: state => state.session.user
};

const mutations = {
  updateSession (state, session) {
    state.session = session;
    axios.defaults.headers.common['Authorization'] = `Bearer ${session.token}`;

    localStorage.setItem('auth-session', JSON.stringify(session));
  }
};

const actions = {
  async signup ({ commit }, data) {
    let response = await axios.post(`/signup`, data);

    commit('updateSession', response.data);

    return response;
  },

  async login ({ commit }, credentials) {
    let response = await axios.post(`/login`, credentials);

    commit('updateSession', response.data);

    return response;
  },

  logout ({ commit }) {
    commit('updateSession', {});
    router.push('/signin');
  },

  restoreSession ({ commit }) {
    commit('updateSession', session);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
}
