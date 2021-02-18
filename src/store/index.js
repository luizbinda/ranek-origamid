import Vue from 'vue';
import Vuex from 'vuex';
import api from '@/api';
import router from '@/router';
import { setState } from '@/helpers';

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
        setState(context, 'loginRequest', true);
        const response = await api.get(`/usuario/${payload}`);
        if (!(response.data instanceof Array)) {
          setState(context, 'usuario', response.data);
          setState(context, 'login', true);
          setState(context, 'loginRequest', false);
          return response.data;
        }
        console.log('error');
        setState(context, 'loginRequest', false);
        return context.state.usuario;
      } catch (erro) {
        console.log(erro);
        setState(context, 'loginRequest', false);
        return context.state.usuario;
      }
    },
    async criarUsuario(context, payload) {
      try {
        setState(context, 'loginRequest', true);
        const response = await api.post('/usuario', payload);
        await context.dispatch('getUsuario', response.data.id);
      } catch (erro) {
        console.log(erro);
      }
    },
    deslogarUsuario(context) {
      setState(context, 'login', false);
      setState(
        context,
        'usuario',
        {
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
      );
      router.push({ name: 'login' });
    },
    getUsuarioProdutos(context) {
      setState(context, 'loginRequest', true);
      setState(context, 'usuario_produtos', null);
      api.get(`/produto?usuario_id=${context.state.usuario.id}`).then((response) => {
        setState(context, 'usuario_produtos', response.data);
        setState(context, 'loginRequest', false);
      });
    },
  },
  modules: {
  },
});
