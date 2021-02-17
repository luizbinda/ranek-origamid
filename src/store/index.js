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
    usuario_produtos: null,
  },
  mutations: {
    SET_STATE(state, { stateName, data }) {
      state[stateName] = data;
    },
  },
  actions: {
    async getUsuario(context, payload) {
      try {
        context.commit('SET_STATE', { stateName: 'loginRequest', data: true });
        const response = await api.get(`/usuario/${payload}`);
        if (!(response.data instanceof Array)) {
          context.commit('SET_STATE', { stateName: 'usuario', data: response.data });
          context.commit('SET_STATE', { stateName: 'login', data: true });
          context.commit('SET_STATE', { stateName: 'loginRequest', data: false });
          return response.data;
        }
        console.log('error');
        context.commit('SET_STATE', { stateName: 'loginRequest', data: false });
        return context.state.usuario;
      } catch (erro) {
        console.log(erro);
        context.commit('SET_STATE', { stateName: 'loginRequest', data: false });
        return context.state.usuario;
      }
    },
    async criarUsuario(context, payload) {
      try {
        context.commit('SET_STATE', { stateName: 'loginRequest', data: true });
        const response = await api.post('/usuario', payload);
        await context.dispatch('getUsuario', response.data.id);
      } catch (erro) {
        console.log(erro);
      }
    },
    deslogarUsuario(context) {
      context.commit('SET_STATE', { stateName: 'login', data: false });
      context.commit('SET_STATE', {
        stateName: 'usuario',
        data: {
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
      });
      router.push({ name: 'login' });
    },
    getUsuarioProdutos(context) {
      context.commit('SET_STATE', { stateName: 'loginRequest', data: true });
      api.get(`/produto?usuario_id=${context.state.usuario.id}`).then((response) => {
        context.commit('SET_STATE', {
          stateName: 'usuario_produtos',
          data: response.data,
        });
      });
      context.commit('SET_STATE', { stateName: 'loginRequest', data: false });
    },
  },
  modules: {
  },
});
