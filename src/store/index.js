import Vue from 'vue';
import Vuex from 'vuex';
import api from '@/api';
import router from '@/router';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    login: false,
    loginRequest: false,
    usuario: {
      id: '',
      nome: '',
      email: '',
      senha: '',
      cep: '',
      rua: '',
      numero: '',
      bairro: '',
      cidade: '',
      estado: '',
    },
  },
  mutations: {
    SET_STATE(state, { stateName, data }) {
      state[stateName] = data;
    },
  },
  actions: {
    getUsuario(context, payload) {
      context.commit('SET_STATE', { stateName: 'loginRequest', data: true });
      return api.get(`/usuario/${payload}`).then((response) => {
        context.commit('SET_STATE', { stateName: 'usuario', data: response.data });
        context.commit('SET_STATE', { stateName: 'login', data: true });
        context.commit('SET_STATE', { stateName: 'loginRequest', data: false });
        router.push({ name: 'usuario' });
      });
    },
    criarUsuario(context, payload) {
      context.commit('SET_STATE', { stateName: 'loginRequest', data: true });
      api.post('/usuario', payload).then(() => {
        context.commit('SET_STATE', { stateName: 'loginRequest', data: false });
        router.push({ name: 'usuario' });
      }).catch((erro) => {
        context.commit('SET_STATE', { stateName: 'loginRequest', data: false });
        console.log(erro);
      });
    },
  },
  modules: {
  },
});
