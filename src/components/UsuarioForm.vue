<template>
  <form v-if="loadUserInfo">
    <div class="usuario" v-if="mostrarDadosLogin">
      <label for="nome">Nome</label>
      <input id="nome" name="nome" type="text" v-model="nome">
      <label for="email">Email</label>
      <input id="email" name="email" type="email" v-model="email">
      <label for="senha">Senha</label>
      <input id="senha" name="senha" type="password" v-model="senha">
    </div>
    <label for="cep">Cep</label>
    <input id="cep" name="cep" type="text" v-model="cep" @keyup="preencherCep">
    <label for="rua">Rua</label>
    <input id="rua" name="rua" type="text" v-model="rua">
    <label for="numero">Numero</label>
    <input id="numero" name="numero" type="text" v-model="numero">
    <label for="bairro">Bairro</label>
    <input id="bairro" name="bairro" type="text" v-model="bairro">
    <label for="cidade">Cidade</label>
    <input id="cidade" name="cidade" type="text" v-model="cidade">
    <label for="estado">Estado</label>
    <input id="estado" name="estado" type="text" v-model="estado">
    <div class="button">
      <slot></slot>
    </div>
  </form>
  <PaginaCarregando v-else/>
</template>

<script>
import { getCep } from '@/api';
import { mapState } from 'vuex';

export default {
  name: 'UsuarioForm',
  data() {
    return {
      nome: '',
      email: '',
      senha: '',
      rua: '',
      cep: '',
      numero: '',
      bairro: '',
      cidade: '',
      estado: '',
    };
  },
  methods: {
    async preencherCep() {
      const cep = this.cep.replace(/\D/g, '');
      if (cep.length === 8) {
        const response = await getCep(cep);
        this.rua = response.data.logradouro;
        this.bairro = response.data.bairro;
        this.estado = response.data.uf;
        this.cidade = response.data.localidade;
      }
    },
    enviar() {
      this.$store.commit('SET_STATE', {
        stateName: 'usuario',
        data: {
          nome: this.nome,
          email: this.email,
          id: this.email,
          senha: this.senha,
          rua: this.rua,
          cep: this.cep,
          numero: this.numero,
          bairro: this.bairro,
          cidade: this.cidade,
          estado: this.estado,
        },
      });
    },
  },
  computed: {
    ...mapState(['loginRequest', 'login']),
    mostrarDadosLogin() {
      return !this.login || this.$route.name === 'usuario-editar';
    },
    loadUserInfo() {
      return !this.loginRequest;
    },
  },
  created() {
    if (this.$store.state.usuario.id) {
      this.$store.dispatch('getUsuario', this.$store.state.usuario.id).then((response) => {
        this.nome = response.nome ? response.nome : '';
        this.email = response.email ? response.email : '';
        this.senha = response.senha ? response.senha : '';
        this.rua = response.rua ? response.rua : '';
        this.cep = response.cep ? response.cep : '';
        this.numero = response.numero ? response.numero : '';
        this.bairro = response.bairro ? response.bairro : '';
        this.cidade = response.cidade ? response.cidade : '';
        this.estado = response.estado ? response.estado : '';
      });
    }
  },
};
</script>

<style scoped>
form,
.usuario {
  display: grid;
  grid-template-columns: 80px 1fr;
  align-items: center;
}

.usuario {
  grid-column: 1 / 3;
}

.button {
  grid-column: 2;
  margin-top: 10px;
}
</style>
